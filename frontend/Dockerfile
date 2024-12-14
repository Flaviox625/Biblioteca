# Use a imagem oficial do Node.js como base
FROM node:18 AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de pacotes e instala as dependências
COPY package.json package-lock.json ./
RUN npm install

# Copia o código fonte do frontend para o container
COPY . .

# Cria a versão de produção da aplicação
RUN npm run build

# Usamos uma imagem Nginx para servir o frontend
FROM nginx:alpine

# Copia o build do React para o diretório de arquivos estáticos do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exponha a porta 3001
EXPOSE 3001

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
