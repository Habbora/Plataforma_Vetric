FROM oven/bun AS builder
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build

FROM oven/bun AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["bunx", "vite", "preview"]
