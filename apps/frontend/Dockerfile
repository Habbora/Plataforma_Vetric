FROM oven/bun
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build
EXPOSE 3000
CMD ["bunx", "vite", "preview", "--host", "0.0.0.0"]
