FROM node:18-alpine

COPY package.json .

WORKDIR /app

COPY . .

RUN npm install

ENV VITE_AUTH_URL=http://172.20.0.2:3001

ENV VITE_API_URL=http://172.20.0.4:3001

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "preview"]