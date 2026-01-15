FROM oven/bun
WORKDIR /app
COPY package*.json ./
RUN bun install
COPY . .
RUN bun run build
EXPOSE 8080
CMD ["sh","-lc","if [ -z \"${VITE_API_URL}\" ]; then echo \"ERRO: VITE_API_URL não definida\" && exit 1; fi; echo \"window.__ENV__ = { VITE_API_URL: '${VITE_API_URL}' };\" > dist/env.js && echo \"[FRONT] VITE_API_URL = ${VITE_API_URL}\" && bunx vite preview --host 0.0.0.0 --port 8080"]
