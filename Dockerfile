# Environnement
FROM node:16-alpine3.15

# Fichiers nécéssaires pour mon application

# WORKDIR définit le répertoir de travail
WORKDIR /app

# COPY copie le fichier indiqué dans l'image
COPY package*.json ./
RUN npm i --legacy-peer-deps

COPY public public
COPY src src
COPY craco.config.ts craco.config.ts
COPY tsconfig.json tsconfig.json

# Commande démarrant le fichier
CMD npm start
