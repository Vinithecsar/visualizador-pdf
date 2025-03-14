FROM node:lts-alpine AS build

WORKDIR /app
COPY . .

RUN npm i && npm run build

EXPOSE 3000

CMD ["npm", "start"]