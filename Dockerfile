FROM node:16-alpine as production

WORKDIR /server
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
RUN npm install
RUN npm install -D
COPY . .
RUN npm run build
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG JWT_SECRET=@flyhighTokenSecret2022=PASSWORD
ENV JWT_SECRET=${JWT_SECRET}

EXPOSE 3000

CMD ["node", "build/index.js"]