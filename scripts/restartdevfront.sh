docker-compose stop node-frontend
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --no-deps -d --build node-frontend
docker image prune -a -f