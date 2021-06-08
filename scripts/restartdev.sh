docker-compose down -v --remove-orphans
docker system prune -a -f
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build
docker exec piscineapp_mongo_1 mongoimport --legacy --db=piscineapp --collection=users -u "admin" -p "passwd" --authenticationDatabase admin --file /initdb/users.json
docker exec piscineapp_mongo_1 mongoimport --legacy --db=piscineapp --collection=piscinesessions -u "admin" -p "passwd" --authenticationDatabase admin --file /initdb/piscinesessions.json