# Piscine App #

## Setup Requirements: ##
	* VS Code 
	* NodeJS 
	* NPM
	* Powershell
	* Docker Desktop (Créer un compte pour avoir accès aux images Dockerhub)

## Setup: ##
	* Git cloner le projet
	* Lancer Docker Desktop
	* npm i dans les dossiers frontend et backend pour setup les environnements de dev
	* Depuis Powershell de VSCode depuis la racine lancer ./scripts/startdev.ps1 (~20 minutes)
	* Données d'initialisation provisoires (Dossier initdb), utiliser ./scripts/dumpdb.ps1 et ./scripts/restoredb.ps1 si jeu de test à conserver
	* Front et API dispos sur localhost:3000, Temps de session d'1h
	* Backend: En mode dev actif toute modif du code backend ou frontend relance le service correspondant sans rebuilder l'image
	* Backend: Si ajout d'un module node dans le backend, rebuild nécéssaire via ./scripts/restartdev.ps1 depuis la racine
	* Frontend: Lancer "npm run devlocal" depuis le dossier frontend et accessible via localhost:4000 (plus rapide)
	* Frontend devlocal: Désactiver les erreurs CORS avec ce plugin Chrome https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf
	* Frontend: pour vérifier une fois restart auto sur l'image, accéder via localhost:3000

## Stopper: ##
	* ./scripts/cleanup.ps1
	* Quitter Docker Desktop

## Déploiement: ##
	* Lancer une instance (Specs: AWS T3A.Medium conseillée pour le build) et lancer ./scripts/startprod.sh
