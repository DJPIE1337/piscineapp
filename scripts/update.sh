docker exec piscineapp_mongo_1 sh -c 'mongoexport --jsonFormat=canonical --db=piscineapp --collection=users -u "admin" -p "passwd" --authenticationDatabase admin --out=dump/users.json'
docker exec piscineapp_mongo_1 sh -c 'mongoexport --jsonFormat=canonical --db=piscineapp --collection=piscinesessions -u "admin" -p "passwd" --authenticationDatabase admin --out=dump/piscinesessions.json'
docker-compose down -v --remove-orphans
docker system prune -a -f
git pull
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
docker exec piscineapp_mongo_1 mongoimport --legacy --db=piscineapp --collection=users -u "admin" -p "passwd" --authenticationDatabase admin --file /dump/users.json
docker exec piscineapp_mongo_1 mongoimport --legacy --db=piscineapp --collection=piscinesessions -u "admin" -p "passwd" --authenticationDatabase admin --file /dump/piscinesessions.json