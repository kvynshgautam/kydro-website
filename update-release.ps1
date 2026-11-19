# ==============================================================================
# KYDRO Website Release Updater Script
# Copies latest APK from KYDRO project and updates release metadata
# ==============================================================================

$apkSource = "C:\Users\Kavyansh\Documents\KYDRO\KYDRO.apk"
$apkDest = "$PSScriptRoot\public\downloads\KYDRO.apk"
$apkLatestDest = "$PSScriptRoot\public\downloads\KYDRO-latest.apk"

if (Test-Path $apkSource) {
    Copy-Item -Path $apkSource -Destination $apkDest -Force
    Copy-Item -Path $apkSource -Destination $apkLatestDest -Force
    
    $fileInfo = Get-Item $apkDest
    $fileSizeMb = [math]::Round($fileInfo.Length / 1MB, 1)
    
    Write-Host "✅ Copied latest KYDRO.apk ($fileSizeMb MB) to public/downloads/" -ForegroundColor Green
    
    # Update update.json file size
    $jsonPath = "$PSScriptRoot\public\update.json"
    if (Test-Path $jsonPath) {
        $json = Get-Content $jsonPath -Raw | ConvertFrom-Json
        $json.file_size = "$fileSizeMb MB"
        $json.release_date = (Get-Date).ToString("yyyy-MM-dd")
        $json | ConvertTo-Json -Depth 5 | Set-Content $jsonPath
        Write-Host "✅ Updated update.json with latest timestamp and size." -ForegroundColor Cyan
    }
} else {
    Write-Host "⚠️ Source APK not found at: $apkSource" -ForegroundColor Red
}
