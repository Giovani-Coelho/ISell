FROM node

WORKDIR /usr/app

COPY package*.json /
COPY .env ./
COPY . .

EXPOSE 3333

RUN npm install
RUN npx prisma generate

CMD [ "npm", "run", "start:dev" ]