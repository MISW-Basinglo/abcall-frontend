# Etapa 1: Construcción
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el archivo de configuración de Angular y de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build --configuration=production

# Etapa 2: Servidor NGINX
FROM nginx:alpine

# Copia los archivos construidos de Angular a la carpeta predeterminada de NGINX
COPY --from=build /app/dist/abcall-frontend /usr/share/nginx/html

# Expone el puerto que usará NGINX
EXPOSE 80

# Inicia NGINX
CMD ["nginx", "-g", "daemon off;"]
