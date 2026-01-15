FROM oven/bun:1-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
ARG VITE_API_URL=http://localhost:3001
ENV VITE_API_URL=$VITE_API_URL
RUN bun run build

FROM oven/bun:1-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 3000
HEALTHCHECK CMD wget -qO- http://localhost:3000/ || exit 1
CMD ["bunx", "vite", "preview", "--host", "0.0.0.0", "--port", "3000"]
