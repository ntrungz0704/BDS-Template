Write-Host "Đang kiểm tra Docker Daemon..." -ForegroundColor Cyan
$dockerStatus = docker info 2>&1
if ($dockerStatus -like "*error*") {
    Write-Error "Docker Desktop chưa được khởi chạy. Vui lòng bật Docker Desktop và thử lại."
    Exit 1
}

Write-Host "1. Khởi động Docker containers..." -ForegroundColor Green
docker compose up -d

Write-Host "Đợi PostgreSQL và Redis khởi động..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "2. Chạy Prisma Migrate..." -ForegroundColor Green
npx prisma migrate dev --name init --schema=packages/database/prisma/schema.prisma

Write-Host "3. Chạy Prisma Generate..." -ForegroundColor Green
npx prisma generate --schema=packages/database/prisma/schema.prisma

Write-Host "4. Nạp dữ liệu Seed Data..." -ForegroundColor Green
npx ts-node packages/database/src/seed.ts

Write-Host ">>> KHỞI DỰNG DATABASE THÀNH CÔNG! <<<" -ForegroundColor Green
