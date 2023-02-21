# Basis-Image
FROM node:16-alpine AS build

# Arbeitsverzeichnis festlegen
WORKDIR /app

# Paketabhängigkeiten installieren
COPY package*.json ./
RUN npm install

# App-Code kopieren
COPY . .

# App bauen
RUN npm run build -- --aot --output-hashing=all --configuration=production --output-path=dist

# Basis-Image
FROM nginx:stable-alpine

# Nginx-Konfigurationsdatei ersetzen
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# App-Code kopieren
COPY --from=build /app/dist /usr/share/nginx/html

# Port freigeben
EXPOSE 80

# Startbefehl
CMD ["nginx", "-g", "daemon off;"]
