$global:last_time = Get-Date -Year 1

$restart_tidepool = {
    if ((New-TimeSpan -Start $global:last_time -End (Get-Date)).TotalSeconds -lt 5) {
        return
    }
    Stop-Process -processname "Tidepool Uploader"
    Start-Process -FilePath "C:\Program Files\Tidepool Uploader\Tidepool Uploader.exe"
    $global:last_time = Get-Date
}

Register-WmiEvent `
    -Action $restart_tidepool `
    -Query "SELECT * FROM Win32_DeviceChangeEvent WHERE EventType = 2" `
    -SourceIdentifier tidepool
Wait-Event tidepool
