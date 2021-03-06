# Piscine App #

For a demo go to http://piscineapp.zbeb.eu and ask me for a login or use Login:Demo/Password:login

MyFirstApp.jpg

Please be kind and tell me what should be fixed

1 amelioration to go:

-Use a datepicker

## Setup Requirements: ##
	* VS Code / Your fav IDE
	* NodeJS 
	* NPM
	* Powershell if on Windows
	* Docker/Docker Desktop (Create an account for DockerHub images access)

## Setup: ##
	* Git clone the project
	* Start Docker Desktop
	* Start "npm i" in frontend/backend folders for local dev environment setup
	* Start ./scripts/startdev.[ps1/sh]
	* InitDB/Reinit DB with scripts ./scripts/dumpdb.[ps1/sh] ./scripts/restoredb.[ps1/sh] for test data, copy in initdb to save it if needed and reinit with ./scripts/initdb.[ps1/sh] instead
	* Frontend+Backend/API available on localhost:3000, 1h session time by default
	* Backend: Test with node ./backend/index.js
	* Backend: Test with Postman at http://localhost:3000/api/v1/(api)
	* Backend/Frontend: In dev mode, Backend & Frontend restart via nodemon without rebuilding docker image
	* Backend/Frontend: If a module is added via "npm i", rebuild images via ./scripts/restartdev.[ps1/sh]
	* Frontend Dev: Start "npm run devlocal" from frontend folder, access via localhost:4000 (faster than from image)
	* Frontend with devlocal: Deactivate CORS errors with this Chrome plugin https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf

## Stop: ##
	* If data needs to be kept ./scripts/dumpdb.[ps1/sh]
	* ./scripts/cleanup.[ps1/sh]
	* Quit Docker Desktop

## Deploy: ##
	* Start an instance with Docker/Docker-Compose/Git installed (Specs in AWS: T3A.Medium recommended for build)
	* Tips for Docker/Docker-Compose install on AWS Linux found here https://gist.github.com/npearce/6f3c7826c7499587f00957fee62f8ee9 
	* Git clone the project
	* Change passwords/API adresses etc to your liking in config/env/"prod" files
	* In root of cloned folder start ./scripts/startprod.[ps1/sh]
	* Change Default admin/passwd account or create one for you and delete the original one
	* Update: ./scripts/update.sh dumps the current db, clones this repo then restarts image building, then reinputs dumped DB 
