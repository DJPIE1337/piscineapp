Start-Sleep -s 5
docker exec piscineapp_mongo_1 mongoimport --legacy --db=piscineapp --collection=users -u "admin" -p "passwd" --authenticationDatabase admin --file /initdb/users.json
docker exec piscineapp_mongo_1 mongoimport --legacy --db=piscineapp --collection=piscinesessions -u "admin" -p "passwd" --authenticationDatabase admin --file /initdb/piscinesessions.json