FROM node:20-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/next.config.mjs ./next.config.mjs
COPY --from=builder /usr/src/app/next-env.d.ts ./next-env.d.ts
COPY --from=builder /usr/src/app/tsconfig.json ./tsconfig.json

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "start"]
