import { prisma } from '@repo/database';
import { z } from 'zod';

// ─── Zod Validation Schemas ───────────────────────────────────────────────

export const CreateLeadSchema = z.object({
  fullName: z.string().min(1).max(200),
  email: z.string().email().optional().nullable(),
  phone: z.string().min(6).max(20),
  source: z.enum(['FORM', 'MANUAL', 'API', 'WEBHOOK', 'IMPORT']).default('MANUAL'),
  projectId: z.string().optional().nullable(),
  projectTitle: z.string().optional().nullable(),
  budget: z.number().optional().nullable(),
  note: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  assignedTo: z.string().optional().nullable(),
});

export const UpdateLeadSchema = z.object({
  fullName: z.string().min(1).max(200).optional(),
  email: z.string().email().optional().nullable(),
  phone: z.string().min(6).max(20).optional(),
  assignedTo: z.string().optional().nullable(),
  projectId: z.string().optional().nullable(),
  projectTitle: z.string().optional().nullable(),
  budget: z.number().optional().nullable(),
  tags: z.array(z.string()).optional(),
  lostReason: z.string().optional().nullable(),
});

export const ChangeLeadStatusSchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'LOST', 'SPAM']),
  lostReason: z.string().optional().nullable(),
});

export const AddLeadNoteSchema = z.object({
  content: z.string().min(1).max(5000),
});

export const AddLeadActivitySchema = z.object({
  type: z.enum(['NOTE', 'CALL', 'EMAIL', 'MEETING', 'TASK']),
  description: z.string().min(1).max(2000),
  scheduledAt: z.string().datetime().optional().nullable(),
  metadata: z.record(z.unknown()).optional().nullable(),
});

export const ListLeadsQuerySchema = z.object({
  status: z.enum(['NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'LOST', 'SPAM']).optional(),
  assignedTo: z.string().optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['createdAt', 'lastActivityAt', 'status', 'fullName']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// ─── Lead Service ─────────────────────────────────────────────────────────

export class LeadService {
  /**
   * List leads for a tenant with filtering, searching, and pagination.
   */
  async listLeads(tenantId: string, query: z.infer<typeof ListLeadsQuerySchema>) {
    const { status, assignedTo, search, page, limit, sortBy, sortOrder } = query;
    const skip = (page - 1) * limit;

    const where: any = {
      tenantId,
      deletedAt: null,
      ...(status && { status }),
      ...(assignedTo && { assignedTo }),
      ...(search && {
        OR: [
          { fullName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [leads, total] = await Promise.all([
      prisma.lead.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
        include: {
          _count: { select: { notes: true, activities: true } },
        },
      }),
      prisma.lead.count({ where }),
    ]);

    return {
      leads,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    };
  }

  /**
   * Get Kanban board summary — leads grouped by status.
   */
  async getKanbanSummary(tenantId: string) {
    const leads = await prisma.lead.groupBy({
      by: ['status'],
      where: { tenantId, deletedAt: null },
      _count: { status: true },
    });

    const statuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'LOST', 'SPAM'];
    return statuses.map((s) => ({
      status: s,
      count: leads.find((l: { status: string; _count: { status: number } }) => l.status === s)?._count.status ?? 0,
    }));
  }

  /**
   * Get a single lead with full detail + timeline.
   */
  async getLeadById(tenantId: string, leadId: string) {
    const lead = await prisma.lead.findFirst({
      where: { id: leadId, tenantId, deletedAt: null },
      include: {
        notes: { orderBy: { createdAt: 'desc' } },
        activities: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!lead) throw new Error('LEAD_NOT_FOUND');
    return lead;
  }

  /**
   * Create a new lead.
   */
  async createLead(tenantId: string, data: z.infer<typeof CreateLeadSchema>, createdBy: string) {
    const lead = await prisma.lead.create({
      data: {
        tenantId,
        fullName: data.fullName,
        email: data.email ?? null,
        phone: data.phone,
        source: data.source,
        assignedTo: data.assignedTo ?? null,
        projectId: data.projectId ?? null,
        projectTitle: data.projectTitle ?? null,
        budget: data.budget ?? null,
        note: data.note ?? null,
        tags: data.tags ?? [],
      },
    });

    // Log creation activity
    if (data.note) {
      await prisma.leadActivity.create({
        data: {
          leadId: lead.id,
          tenantId,
          type: 'NOTE',
          description: data.note,
          createdBy,
        },
      });
    }

    return lead;
  }

  /**
   * Update lead metadata.
   */
  async updateLead(tenantId: string, leadId: string, data: z.infer<typeof UpdateLeadSchema>) {
    const existing = await prisma.lead.findFirst({
      where: { id: leadId, tenantId, deletedAt: null },
    });
    if (!existing) throw new Error('LEAD_NOT_FOUND');

    return prisma.lead.update({
      where: { id: leadId },
      data: {
        ...data,
        budget: data.budget ?? undefined,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Change lead Kanban status. Automatically logs a STATUS_CHANGE activity.
   */
  async changeStatus(
    tenantId: string,
    leadId: string,
    data: z.infer<typeof ChangeLeadStatusSchema>,
    changedBy: string
  ) {
    const existing = await prisma.lead.findFirst({
      where: { id: leadId, tenantId, deletedAt: null },
    });
    if (!existing) throw new Error('LEAD_NOT_FOUND');

    const previousStatus = existing.status;
    const now = new Date();

    const [updatedLead] = await prisma.$transaction([
      prisma.lead.update({
        where: { id: leadId },
        data: {
          status: data.status,
          lostReason: data.status === 'LOST' ? data.lostReason : null,
          wonAt: data.status === 'WON' ? now : existing.wonAt,
          lostAt: data.status === 'LOST' ? now : existing.lostAt,
          lastActivityAt: now,
        },
      }),
      prisma.leadActivity.create({
        data: {
          leadId,
          tenantId,
          type: 'STATUS_CHANGE',
          description: `Moved from ${previousStatus} to ${data.status}`,
          metadata: { from: previousStatus, to: data.status },
          createdBy: changedBy,
        },
      }),
    ]);

    return updatedLead;
  }

  /**
   * Add a note to a lead.
   */
  async addNote(tenantId: string, leadId: string, data: z.infer<typeof AddLeadNoteSchema>, createdBy: string) {
    const existing = await prisma.lead.findFirst({
      where: { id: leadId, tenantId, deletedAt: null },
    });
    if (!existing) throw new Error('LEAD_NOT_FOUND');

    const [note] = await prisma.$transaction([
      prisma.leadNote.create({
        data: { leadId, tenantId, content: data.content, createdBy },
      }),
      prisma.lead.update({
        where: { id: leadId },
        data: { lastActivityAt: new Date() },
      }),
    ]);

    return note;
  }

  /**
   * Log an activity (call, email, meeting, task).
   */
  async addActivity(
    tenantId: string,
    leadId: string,
    data: z.infer<typeof AddLeadActivitySchema>,
    createdBy: string
  ) {
    const existing = await prisma.lead.findFirst({
      where: { id: leadId, tenantId, deletedAt: null },
    });
    if (!existing) throw new Error('LEAD_NOT_FOUND');

    const [activity] = await prisma.$transaction([
      prisma.leadActivity.create({
        data: {
          leadId,
          tenantId,
          type: data.type,
          description: data.description,
          metadata: data.metadata ?? null,
          scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
          createdBy,
        },
      }),
      prisma.lead.update({
        where: { id: leadId },
        data: { lastActivityAt: new Date() },
      }),
    ]);

    return activity;
  }

  /**
   * Soft delete a lead.
   */
  async deleteLead(tenantId: string, leadId: string) {
    const existing = await prisma.lead.findFirst({
      where: { id: leadId, tenantId, deletedAt: null },
    });
    if (!existing) throw new Error('LEAD_NOT_FOUND');

    return prisma.lead.update({
      where: { id: leadId },
      data: { deletedAt: new Date() },
    });
  }
}

export const leadService = new LeadService();

