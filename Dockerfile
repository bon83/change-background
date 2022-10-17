FROM node:14.17.5
COPY ./ /my-app
WORKDIR /my-app
RUN npm ci
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]