FROM oven/bun:1.3.4-alpine
WORKDIR /app
COPY package*.json ./
COPY bun.lockb* ./
RUN bun install
COPY . .
RUN bun run build
EXPOSE 3001
ENV NODE_ENV=production PORT=3001 TZ=America/Sao_Paulo
CMD ["sh","-lc","bun dist/database/index.js run && bun dist/index.js"]

