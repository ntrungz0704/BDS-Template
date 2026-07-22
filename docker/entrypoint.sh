#!/bin/sh
# entrypoint.sh for API container
# Wait for PostgreSQL database to be ready, then run Prisma migrations and start server.

set -e

DB_HOST="app-postgres"
DB_PORT=5432

echo "Checking if database is ready at $DB_HOST:$DB_PORT..."

# Loop until PostgreSQL is ready
while ! nc -z "$DB_HOST" "$DB_PORT"; do
  echo "Database is not ready yet. Retrying in 2 seconds..."
  sleep 2
done

echo "Database is ready! Running Prisma migrations..."
# Run migrations using Prisma CLI
npx prisma migrate deploy --schema=packages/database/prisma/schema.prisma

echo "Migrations completed. Starting API Server..."
exec "$@"
