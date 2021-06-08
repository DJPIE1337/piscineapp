mkdir dump
docker exec piscineapp_mongo_1 sh -c 'mongoexport --jsonFormat=canonical --db=piscineapp --collection=users -u "admin" -p "passwd" --authenticationDatabase admin --out=dump/users.json'
docker exec piscineapp_mongo_1 sh -c 'mongoexport --jsonFormat=canonical --db=piscineapp --collection=piscinesessions -u "admin" -p "passwd" --authenticationDatabase admin --out=dump/piscinesessions.json'