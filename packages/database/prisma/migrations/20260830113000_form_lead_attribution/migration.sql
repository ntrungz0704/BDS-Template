ALTER TABLE "contact_form_submissions"
  ADD COLUMN "form_id" TEXT,
  ADD COLUMN "source_page" TEXT,
  ADD COLUMN "source_url" TEXT,
  ADD COLUMN "project_id" TEXT,
  ADD COLUMN "utm_source" TEXT,
  ADD COLUMN "utm_medium" TEXT,
  ADD COLUMN "utm_campaign" TEXT,
  ADD COLUMN "ip_address" TEXT,
  ADD COLUMN "user_agent" TEXT;

CREATE INDEX "contact_form_submissions_tenant_id_phone_created_at_idx"
  ON "contact_form_submissions"("tenant_id", "phone", "created_at");
