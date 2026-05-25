# Deploy script - aplica fix dos hooks PB no Fly.io
# Uso:
#   powershell -ExecutionPolicy Bypass -File .\deploy-hooks.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host "==> Adicionando flyctl ao PATH (sessao atual)..." -ForegroundColor Cyan
$env:Path = "$HOME\.fly\bin;$env:Path"

Write-Host "==> Verificando flyctl..." -ForegroundColor Cyan
flyctl version
if ($LASTEXITCODE -ne 0) {
    Write-Host "flyctl nao encontrado. Instale: https://fly.io/docs/flyctl/install/" -ForegroundColor Red
    exit 1
}

Write-Host "==> git status..." -ForegroundColor Cyan
git status --short

Write-Host "==> Removendo debug_env.pb.js (cleanup pos-launch)..." -ForegroundColor Cyan
$debugFile = "apps/pocketbase/pb_hooks/debug_env.pb.js"
if (Test-Path $debugFile) {
    Remove-Item $debugFile -Force
    Write-Host "    arquivo deletado localmente"
}
git rm --cached --ignore-unmatch $debugFile 2>$null

Write-Host "==> git add arquivos modificados..." -ForegroundColor Cyan
git add -A apps/pocketbase/pb_hooks/
git add -A apps/pocketbase/pb_migrations/
git add -A apps/web/src/
git add README.md

Write-Host "==> git commit..." -ForegroundColor Cyan
git commit -m "fix: inline SQL increment em cada handler (closure issue JSVM v0.38)"

Write-Host "==> git push..." -ForegroundColor Cyan
git push

Write-Host "==> flyctl deploy (2-4 min)..." -ForegroundColor Cyan
flyctl deploy --app imigrar-espanha-pb --remote-only

Write-Host "==> Setando MODERATION_ENABLED=false (kill-switch OpenAI)..." -ForegroundColor Cyan
flyctl secrets set MODERATION_ENABLED=false -a imigrar-espanha-pb

Write-Host "==> Aguardando health-check..." -ForegroundColor Cyan
Start-Sleep -Seconds 5
try {
    $health = Invoke-RestMethod -Uri "https://imigrar-espanha-pb.fly.dev/api/health"
    Write-Host ($health | ConvertTo-Json)
} catch {
    Write-Host "Health check falhou - verifique manualmente" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Deploy concluido." -ForegroundColor Green
Write-Host "Teste o chat: https://imigrar-espanha-site-web.vercel.app/comunidade/chat" -ForegroundColor Yellow
