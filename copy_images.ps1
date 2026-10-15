$candleImg = "C:\Users\INDIA\.gemini\antigravity\brain\c440e263-4a0d-49dd-b9a7-ddb52abc5774\candlelight_dinner_1792050420966.jpg"
$boatImg   = "C:\Users\INDIA\.gemini\antigravity\brain\c440e263-4a0d-49dd-b9a7-ddb52abc5774\couple_boat_night_1792050457352.jpg"

Copy-Item -Path $candleImg -Destination "public\honeymoon-candlelight-dinner.jpg" -Force
Copy-Item -Path $boatImg   -Destination "public\honeymoon-couple-boat-night.jpg"   -Force

Get-ChildItem public\honeymoon*.jpg
