param(
  [string]$Owner = "lovelyjhk",
  [string]$Repo = "iknow-dog-web-poc",
  [switch]$Private
)

$ErrorActionPreference = "Stop"

function Resolve-Gh {
  $cmd = Get-Command gh -ErrorAction SilentlyContinue
  if ($cmd) {
    return $cmd.Source
  }

  $defaultPath = "C:\Program Files\GitHub CLI\gh.exe"
  if (Test-Path $defaultPath) {
    return $defaultPath
  }

  throw "GitHub CLI is not installed. Install it with: winget install --id GitHub.cli -e --source winget"
}

$Gh = Resolve-Gh
$RepoFullName = "$Owner/$Repo"

Write-Host "Using GitHub CLI: $Gh"

try {
  & $Gh auth status | Out-Host
} catch {
  Write-Host ""
  Write-Host "GitHub login is required before deployment." -ForegroundColor Yellow
  Write-Host "Run this command, finish browser login, then run this script again:"
  Write-Host "`"$Gh`" auth login --hostname github.com --git-protocol https --web"
  exit 1
}

if (-not (Test-Path ".git")) {
  git init -b main
}

git branch -M main

if (-not (git config user.name)) {
  git config user.name "Codex"
}

if (-not (git config user.email)) {
  git config user.email "codex@local"
}

$dirty = git status --porcelain
if ($dirty) {
  git add .github .gitignore README.md mvp.md poc-architecture.md prompt1.md web scripts
  git commit -m "feat: add web poc for dog health analysis"
}

$repoExists = $true
try {
  & $Gh repo view $RepoFullName --json nameWithOwner | Out-Null
} catch {
  $repoExists = $false
}

if (-not $repoExists) {
  $visibility = if ($Private) { "--private" } else { "--public" }
  & $Gh repo create $RepoFullName $visibility --source . --remote origin --push
} else {
  $origin = git remote get-url origin 2>$null
  if ($LASTEXITCODE -ne 0 -or -not $origin) {
    git remote add origin "https://github.com/$RepoFullName.git"
  } else {
    git remote set-url origin "https://github.com/$RepoFullName.git"
  }
  git push -u origin main
}

try {
  & $Gh api -X POST "repos/$RepoFullName/pages" `
    -H "Accept: application/vnd.github+json" `
    -f "source[branch]=main" `
    -f "source[path]=/web" | Out-Null
} catch {
  & $Gh api -X PUT "repos/$RepoFullName/pages" `
    -H "Accept: application/vnd.github+json" `
    -f "source[branch]=main" `
    -f "source[path]=/web" | Out-Null
}

Write-Host ""
Write-Host "Deployment requested." -ForegroundColor Green
Write-Host "Repository: https://github.com/$RepoFullName"
Write-Host "Pages URL:  https://$Owner.github.io/$Repo/"
Write-Host "Pages may take 1-3 minutes to become available."
