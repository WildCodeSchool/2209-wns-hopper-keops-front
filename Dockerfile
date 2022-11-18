# Environnement
FROM node:alpine

# Fichiers nécéssaires pour mon application

# WORKDIR définit le répertoir de travail
WORKDIR /app

# COPY copie le fichier indiqué dans l'image
COPY package*.json ./
RUN npm i

COPY public public
COPY src src
COPY tsconfig.json tsconfig.json

# Commande démarrant le fichier
CMD npm start