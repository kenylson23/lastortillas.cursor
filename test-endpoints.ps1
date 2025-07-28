# Script para testar endpoints de autenticação
$baseUrl = "https://lastortillas-cursor-a7lfmgpoh-kenylson23s-projects.vercel.app"

Write-Host "🧪 Testando endpoints de autenticação..." -ForegroundColor Yellow
Write-Host ""

# Teste 1: Endpoint de teste simples
Write-Host "1️⃣ Testando /api/test-auth..." -ForegroundColor Cyan
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/test-auth" -Method GET
    Write-Host "✅ /api/test-auth funcionando!" -ForegroundColor Green
    Write-Host "   Resposta: $($response.message)" -ForegroundColor Gray
} catch {
    Write-Host "❌ /api/test-auth falhou: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Teste 2: Login Admin
Write-Host "2️⃣ Testando /api/auth/login (Admin)..." -ForegroundColor Cyan
try {
    $body = @{
        username = "administrador"
        password = "lasTortillas2025!"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method POST -ContentType "application/json" -Body $body
    Write-Host "✅ Login Admin funcionando!" -ForegroundColor Green
    Write-Host "   Token: $($response.token.Substring(0,20))..." -ForegroundColor Gray
} catch {
    Write-Host "❌ Login Admin falhou: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Teste 3: Login Cozinha
Write-Host "3️⃣ Testando /api/auth/login (Cozinha)..." -ForegroundColor Cyan
try {
    $body = @{
        username = "cozinha"
        password = "lasTortillas2025Cozinha!"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method POST -ContentType "application/json" -Body $body
    Write-Host "✅ Login Cozinha funcionando!" -ForegroundColor Green
    Write-Host "   Token: $($response.token.Substring(0,20))..." -ForegroundColor Gray
} catch {
    Write-Host "❌ Login Cozinha falhou: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "🎯 Testes concluídos!" -ForegroundColor Yellow 