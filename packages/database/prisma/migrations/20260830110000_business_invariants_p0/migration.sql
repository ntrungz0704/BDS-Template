-- Immutable commerce classifications. Defaults preserve every existing row
-- while letting new checkout code distinguish SaaS, source and full-platform.
CREATE TYPE "ProductType" AS ENUM ('WEBSITE_TEMPLATE', 'LANDING_PAGE');
CREATE TYPE "PurchaseType" AS ENUM ('SAAS', 'SOURCE_TEMPLATE', 'FULL_PLATFORM');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING_PAYMENT', 'WAITING_CONFIRMATION', 'PAID', 'REJECTED', 'FAILED');
CREATE TYPE "FulfillmentStatus" AS ENUM ('NOT_REQUIRED', 'PENDING', 'PROVISIONING', 'ACTIVE', 'FAILED');

ALTER TABLE "templates"
  ADD COLUMN "product_type" "ProductType" NOT NULL DEFAULT 'WEBSITE_TEMPLATE',
  ADD COLUMN "sale_price" INTEGER,
  ADD COLUMN "supported_cms_modules" JSONB DEFAULT '[]';

ALTER TABLE "orders"
  ADD COLUMN "product_type" "ProductType" NOT NULL DEFAULT 'WEBSITE_TEMPLATE',
  ADD COLUMN "purchase_type" "PurchaseType" NOT NULL DEFAULT 'SAAS',
  ADD COLUMN "payment_status" "PaymentStatus" NOT NULL DEFAULT 'PENDING_PAYMENT',
  ADD COLUMN "fulfillment_status" "FulfillmentStatus" NOT NULL DEFAULT 'PENDING',
  ADD COLUMN "product_snapshot" JSONB,
  ADD COLUMN "idempotency_key" TEXT;

CREATE UNIQUE INDEX "orders_idempotency_key_key" ON "orders"("idempotency_key");

-- Preserve historical semantics consistently for reporting and authorization.
UPDATE "orders"
SET
  "purchase_type" = CASE
    WHEN "type" = 'BUY_SOURCE' THEN 'SOURCE_TEMPLATE'::"PurchaseType"
    ELSE 'SAAS'::"PurchaseType"
  END,
  "payment_status" = CASE
    WHEN "status" = 'COMPLETED' THEN 'PAID'::"PaymentStatus"
    WHEN "status" IN ('WAITING_CONFIRM', 'AWAITING_MANUAL_REVIEW') THEN 'WAITING_CONFIRMATION'::"PaymentStatus"
    WHEN "status" = 'REJECTED' THEN 'REJECTED'::"PaymentStatus"
    ELSE 'PENDING_PAYMENT'::"PaymentStatus"
  END,
  "fulfillment_status" = CASE
    WHEN "type" = 'BUY_SOURCE' AND "status" = 'COMPLETED' THEN 'NOT_REQUIRED'::"FulfillmentStatus"
    WHEN "status" = 'COMPLETED' AND "tenant_id" IS NOT NULL THEN 'ACTIVE'::"FulfillmentStatus"
    WHEN "status" = 'COMPLETED' THEN 'FAILED'::"FulfillmentStatus"
    ELSE 'PENDING'::"FulfillmentStatus"
  END;
