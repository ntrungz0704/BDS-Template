#!/bin/bash
# Backup script for PlatformBDS PostgreSQL Database
# Run this via crontab, e.g., daily at 2AM:
# 0 2 * * * /path/to/platformbds/scripts/backup-db.sh >> /var/log/pg_backup.log 2>&1

set -e

# Configuration
COMPOSE_FILE="../docker-compose.prod.yml"
CONTAINER_NAME="app-postgres"
DB_USER="postgres_prod_user"
DB_NAME="platformbds_prod_db"
BACKUP_DIR="../backups/postgres"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="$BACKUP_DIR/db_backup_$DATE.sql.gz"
RETENTION_DAYS=7

echo "Starting database backup at $(date)"

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

# Execute pg_dump inside the running container and gzip the output
docker exec -t "$CONTAINER_NAME" pg_dump -U "$DB_USER" -d "$DB_NAME" -F p | gzip > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
  echo "Backup successfully created: $BACKUP_FILE"
else
  echo "Error creating backup!"
  exit 1
fi

# Cleanup old backups
echo "Cleaning up backups older than $RETENTION_DAYS days..."
find "$BACKUP_DIR" -type f -name "db_backup_*.sql.gz" -mtime +$RETENTION_DAYS -exec rm {} \;

echo "Backup process completed at $(date)"
