param(
  [string]$DatasetPath = ".local\sample-dataset"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $DatasetPath)) {
  throw "Dataset path not found: $DatasetPath"
}

$jsonFiles = Get-ChildItem -LiteralPath $DatasetPath -Recurse -Filter *.json
$jpgFiles = Get-ChildItem -LiteralPath $DatasetPath -Recurse -Filter *.jpg

$rows = foreach ($file in $jsonFiles) {
  $json = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8 | ConvertFrom-Json
  [pscustomobject]@{
    File = $file.Name
    Hospital = $json.image_info.hospital
    Resolution = $json.image_info.resolution
    AnnotationCount = @($json.annotation_info).Count
    Labels = (@($json.annotation_info) | ForEach-Object label | Sort-Object -Unique) -join ";"
    Medical = (@($json.pet_medical_record_info) | ForEach-Object { "$($_.foot_position):$($_.value)" }) -join ";"
  }
}

"JPG files: $($jpgFiles.Count)"
"JSON files: $($jsonFiles.Count)"
$rows | Measure-Object AnnotationCount -Minimum -Maximum -Average
""
"Hospitals"
$rows | Group-Object Hospital | Sort-Object Count -Descending | Select-Object Count,Name
""
"Labels"
$rows.Labels -split ";" | Where-Object { $_ } | Group-Object | Sort-Object Count -Descending | Select-Object Count,Name
