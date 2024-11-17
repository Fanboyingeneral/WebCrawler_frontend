FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

COPY . .


ENV FRONTEND_PORT=7200
ENV BACKEND_PORT=7100

EXPOSE ${FRONTEND_PORT}

CMD ["npm", "start"]

