.\scripts\dumpdb.ps1
docker-compose down -v --remove-orphans
docker system prune -a -f
.\scripts\startprod.ps1