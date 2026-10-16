# Sigflow GTM – Setup Script
# Run this once in PowerShell (as Administrator if needed)

Write-Host "Sigflow GTM Setup" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Check for Node.js
try {
    $nodeVersion = node --version
    Write-Host "Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js NOT found. Installing via winget..." -ForegroundColor Yellow
    winget install OpenJS.NodeJS.LTS
    Write-Host "Node.js installed. Please RESTART this PowerShell window and run setup.ps1 again." -ForegroundColor Yellow
    exit
}

# Install dependencies
Write-Host "Installing npm packages..." -ForegroundColor Cyan
npm install

Write-Host ""
Write-Host "Done! Run: npm run dev" -ForegroundColor Green
Write-Host "Then open: http://localhost:3000" -ForegroundColor Green
