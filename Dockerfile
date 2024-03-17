
FROM node:18 as build-stage


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


RUN npm run dev


FROM nginx:stable-alpine as serve-stage


COPY --from=build-stage /app/dist /usr/share/nginx/html


EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
