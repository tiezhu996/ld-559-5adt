FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache openssl
COPY backend/package*.json ./
RUN npm install

FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache openssl
COPY --from=deps /app/node_modules ./node_modules
COPY backend .
COPY database ../database
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
RUN apk add --no-cache openssl
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma
COPY --from=build /database ./database
COPY --from=build /app/package.json ./package.json
EXPOSE 38506
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && node dist/main.js"]
