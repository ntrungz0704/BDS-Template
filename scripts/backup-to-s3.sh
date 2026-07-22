#!/bin/bash
# Backup script to upload DB dump to AWS S3 / Cloudflare R2
# Schedule via cron: 0 3 * * * /path/to/platformbds/scripts/backup-to-s3.sh >> /var/log/pg_s3_backup.log 2>&1

set -e

# Configuration
CONTAINER_NAME="app-postgres"
DB_USER="postgres_prod_user"
DB_NAME="platformbds_prod_db"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
LOCAL_BACKUP_DIR="/tmp/backups"
BACKUP_FILE="$LOCAL_BACKUP_DIR/db_backup_$DATE.sql.gz"

# S3 Configuration (Cloudflare R2 example)
S3_BUCKET="platformbds-backups"
S3_ENDPOINT_URL="https://your-account-id.r2.cloudflarestorage.com"
AWS_ACCESS_KEY_ID="your-r2-access-key-id"
AWS_SECRET_ACCESS_KEY="your-r2-secret-access-key"
AWS_DEFAULT_REGION="auto"

echo "=== Starting DB Offsite Backup: $DATE ==="

# Ensure local temp folder exists
mkdir -p "$LOCAL_BACKUP_DIR"

# Step 1: Dump Postgres DB
docker exec -t "$CONTAINER_NAME" pg_dump -U "$DB_USER" -d "$DB_NAME" -F p | gzip > "$BACKUP_FILE"
echo "Backup file created locally: $BACKUP_FILE"

# Step 2: Upload to S3/R2 using AWS CLI (requires aws-cli installed on host)
export AWS_ACCESS_KEY_ID
export AWS_SECRET_ACCESS_KEY
export AWS_DEFAULT_REGION

aws s3 cp "$BACKUP_FILE" "s3://$S3_BUCKET/db/db_backup_$DATE.sql.gz" --endpoint-url "$S3_ENDPOINT_URL"

echo "Upload to Cloud Storage completed successfully!"

# Step 3: Cleanup local temp file
rm -f "$BACKUP_FILE"
echo "Cleanup temporary local file completed."
echo "=== Backup Process Finished successfully at $(date) ==="
