FROM oven/bun
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build
EXPOSE 8080
CMD ["sh","-lc","echo \"window.__ENV__ = { VITE_API_URL: '${VITE_API_URL}' };\" > dist/env.js && bunx vite preview --host 0.0.0.0 --port 8080"]
