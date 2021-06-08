.\scripts\cleanup.ps1
docker-compose -f .\docker-compose.yml -f .\docker-compose.dev.yml up -d --build
.\scripts\initdb.ps1