FROM node:20-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run prisma:generate

FROM node:20-alpine AS runtime
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --production
RUN npm install pm2 tsx -g

COPY --from=builder /usr/src/app .

ENV NODE_ENV=production
EXPOSE 8080
CMD ["pm2-runtime", "ecosystem.config.js", "--only", "vyapari-server"]
