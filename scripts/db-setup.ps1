Write-Host "Checking Docker Daemon..." -ForegroundColor Cyan
$dockerStatus = docker info 2>&1
if ($dockerStatus -like "*error*") {
    Write-Error "Docker Desktop is not running. Please start Docker Desktop and retry."
    Exit 1
}

Write-Host "1. Starting Docker containers..." -ForegroundColor Green
docker compose up -d

Write-Host "Waiting for PostgreSQL and Redis to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "Loading environment variables from root .env..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Get-Content .env | Where-Object { $_ -match '=' -and $_ -notmatch '^#' } | ForEach-Object {
        $key, $value = $_.Split('=', 2)
        # Loại bỏ dấu nháy kép nếu có
        $value = $value.Trim('"').Trim("'")
        [System.Environment]::SetEnvironmentVariable($key, $value, "Process")
    }
} else {
    Write-Error "File .env not found at root workspace. Setup cannot proceed."
    Exit 1
}

Write-Host "2. Running Prisma Migrate (using local v5)..." -ForegroundColor Green
pnpm --filter @repo/database exec prisma migrate dev --name init --schema=prisma/schema.prisma

Write-Host "3. Generating Prisma Client (using local v5)..." -ForegroundColor Green
pnpm --filter @repo/database exec prisma generate --schema=prisma/schema.prisma

Write-Host "4. Running Database Seed..." -ForegroundColor Green
pnpm --filter @repo/database db:seed

Write-Host "=== DATABASE SETUP COMPLETED SUCCESSFULLY! ===" -ForegroundColor Green
