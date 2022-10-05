FROM node:14.17.5 as build
ENV NODE_ENV=production
WORKDIR /my-app
COPY . /my-app
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /build
RUN apk add --no-cache ca-certificates bash
COPY --from=build /my-app/build /build
COPY --from=build /my-app/nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]
