ALTER TABLE "templates" ADD COLUMN "category" TEXT;
CREATE INDEX "templates_product_type_category_idx" ON "templates"("product_type", "category");
