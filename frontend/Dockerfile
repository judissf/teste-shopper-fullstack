# frontend/Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm cache clean --force
RUN npm install

COPY . .

EXPOSE 80

CMD ["npm", "run", "dev"]
