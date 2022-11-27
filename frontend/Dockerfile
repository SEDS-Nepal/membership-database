# stage 1 - build react app first
FROM node:16.17-alpine as react
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/
COPY package-lock.json /app/
RUN npm install --silent
COPY . /app
RUN npm run build

# stage 2 - build the final image and copy the react build files
FROM nginx:alpine as nginx
COPY --from=react /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
