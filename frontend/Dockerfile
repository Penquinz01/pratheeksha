FROM node:22-alpine AS build
WORKDIR /build
COPY package.json package-lock.json* ./
RUN npm ci || npm install
COPY . .
# Same-origin default: nginx proxies /api to the backend (see nginx.conf.template).
# Override at build time (--build-arg VITE_API_URL=https://your-api.example.com) when
# the frontend and backend are deployed as separate hosts, e.g. on Railway.
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:alpine
COPY nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /build/dist /usr/share/nginx/html
ENV PORT=80
EXPOSE 80
