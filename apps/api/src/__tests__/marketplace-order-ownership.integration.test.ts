import bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import request from 'supertest';

import { app } from '../index';
import { prisma } from '@repo/database';

const OWNER_EMAIL = 'order-owner-regression@platformbds.vn';
const OTHER_EMAIL = 'order-other-regression@platformbds.vn';

describe('Marketplace order ownership regression', () => {
  let owner: any;
  let otherUser: any;
  let template: any;
  let ownerToken: string;
  let otherToken: string;

  beforeAll(async () => {
    await prisma.order.deleteMany({ where: { email: { in: [OWNER_EMAIL, OTHER_EMAIL] } } });
    await prisma.user.deleteMany({ where: { email: { in: [OWNER_EMAIL, OTHER_EMAIL] } } });

    template = await prisma.template.findFirst({ where: { isActive: true } });
    if (!template) throw new Error('The order ownership test requires one active template.');

    [owner, otherUser] = await Promise.all([
      prisma.user.create({
        data: {
          email: OWNER_EMAIL,
          fullName: 'Order Owner Regression',
          phone: '0912345678',
          passwordHash: await bcrypt.hash('OwnerPass123!', 10),
          role: 'CUSTOMER',
          isActive: true,
          status: 'ACTIVE',
        },
      }),
      prisma.user.create({
        data: {
          email: OTHER_EMAIL,
          fullName: 'Other Order User',
          phone: '0987654321',
          passwordHash: await bcrypt.hash('OtherPass123!', 10),
          role: 'CUSTOMER',
          isActive: true,
          status: 'ACTIVE',
        },
      }),
    ]);

    ownerToken = jwt.sign(
      { userId: owner.id, email: owner.email, role: owner.role, tenantId: null },
      process.env.JWT_ACCESS_SECRET!,
    );
    otherToken = jwt.sign(
      { userId: otherUser.id, email: otherUser.email, role: otherUser.role, tenantId: null },
      process.env.JWT_ACCESS_SECRET!,
    );
  });

  afterAll(async () => {
    await prisma.order.deleteMany({ where: { email: { in: [OWNER_EMAIL, OTHER_EMAIL] } } });
    const createdUserIds = [owner?.id, otherUser?.id].filter(Boolean);
    if (createdUserIds.length > 0) {
      await prisma.auditLog.deleteMany({ where: { userId: { in: createdUserIds } } });
      await prisma.user.deleteMany({ where: { id: { in: createdUserIds } } });
    }
  });

  it('binds authenticated checkout to the session account and returns its status', async () => {
    const created = await request(app)
      .post('/api/marketplace/orders')
      .set('Authorization', `Bearer ${ownerToken}`)
      .send({
        templateId: template.slug,
        type: 'BUY',
        fullName: 'Order Owner Regression',
        email: OTHER_EMAIL,
        phone: '0912345678',
      });

    expect(created.status).toBe(201);
    expect(created.body.data.userId).toBe(owner.id);
    expect(created.body.data.email).toBe(OWNER_EMAIL);

    const status = await request(app)
      .get(`/api/marketplace/orders/${created.body.data.orderNumber}/status`)
      .set('Authorization', `Bearer ${ownerToken}`);

    expect(status.status).toBe(200);
    expect(status.body.data.orderNumber).toBe(created.body.data.orderNumber);
  });

  it('repairs only a matching legacy order and still hides it from another account', async () => {
    const legacyOrder = await prisma.order.create({
      data: {
        orderNumber: `ORD-LEGACY-${Date.now()}`,
        fullName: 'Order Owner Regression',
        email: OWNER_EMAIL,
        phone: '0912345678',
        type: 'BUY',
        status: 'PENDING',
        amount: template.priceBuy,
        templateId: template.id,
        userId: null,
      },
    });

    const forbidden = await request(app)
      .get(`/api/marketplace/orders/${legacyOrder.orderNumber}/status`)
      .set('Authorization', `Bearer ${otherToken}`);
    expect(forbidden.status).toBe(404);

    const repaired = await request(app)
      .get(`/api/marketplace/orders/${legacyOrder.orderNumber}/status`)
      .set('Authorization', `Bearer ${ownerToken}`);
    expect(repaired.status).toBe(200);

    const stored = await prisma.order.findUnique({ where: { id: legacyOrder.id } });
    expect(stored?.userId).toBe(owner.id);
  });
});
