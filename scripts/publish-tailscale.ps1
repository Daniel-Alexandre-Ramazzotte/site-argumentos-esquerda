param([switch]$Public, [int]$Port = 3000)
$ErrorActionPreference = 'Stop'
$client = Get-Command tailscale -ErrorAction SilentlyContinue
$tailscaleExe = if ($client) { $client.Source } else { Join-Path $env:ProgramFiles 'Tailscale/tailscale.exe' }
if (-not (Test-Path -LiteralPath $tailscaleExe)) { throw 'Instale o Tailscale e faça login na sua conta antes de publicar.' }
$state = (& $tailscaleExe status --json | ConvertFrom-Json)
if ($state.BackendState -ne 'Running') { throw 'O Tailscale precisa estar conectado à sua rede.' }
$health = Invoke-WebRequest -Uri "http://127.0.0.1:$Port/api/health" -UseBasicParsing
if ($health.StatusCode -ne 200) { throw 'Inicie a versão de produção e verifique o PostgreSQL antes de publicar.' }
# Preserva publicações existentes. Não redefine a configuração de Serve/Funnel.
$existing = & $tailscaleExe serve status --json | ConvertFrom-Json
if ($existing.Web) { throw 'Já existe uma publicação Tailscale neste dispositivo. Confira os caminhos antes de alterá-la.' }
if ($Public) { & $tailscaleExe funnel --bg $Port } else { & $tailscaleExe serve --bg $Port }
if ($LASTEXITCODE -ne 0) { throw 'O Tailscale não confirmou a publicação. Verifique login e permissões de Serve/Funnel.' }
& $tailscaleExe serve status
