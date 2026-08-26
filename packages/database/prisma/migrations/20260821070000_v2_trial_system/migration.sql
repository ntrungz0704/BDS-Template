-- V2 Trial System Migration
-- Adds trial fields to tenants, pricing fields to templates, billing fields to subscriptions

-- 1. Add trial fields to tenants table
ALTER TABLE "tenants" ADD COLUMN "trial_start_at" TIMESTAMP(3);
ALTER TABLE "tenants" ADD COLUMN "trial_end_at" TIMESTAMP(3);
ALTER TABLE "tenants" ADD COLUMN "trial_save_limit" INTEGER NOT NULL DEFAULT 3;
ALTER TABLE "tenants" ADD COLUMN "trial_save_count" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "tenants" ADD COLUMN "trial_status" TEXT;

-- 2. Add pricing fields to templates table
ALTER TABLE "templates" ADD COLUMN "price_rent_yearly" INTEGER;
ALTER TABLE "templates" ADD COLUMN "price_buy_source" INTEGER;

-- 3. Add billing fields to subscriptions table
ALTER TABLE "subscriptions" ADD COLUMN "billing_period" TEXT NOT NULL DEFAULT 'YEARLY';
ALTER TABLE "subscriptions" ADD COLUMN "auto_renew" BOOLEAN NOT NULL DEFAULT false;
