FROM node:14-alpine

ARG E_JWT_SECRET_KEY
ARG E_HASURA_ADMIN_KEY
ARG E_HASURA_GQL_ENDPOINT

ENV JWT_SECRET_KEY=$E_JWT_SECRET_KEY
ENV HASURA_ADMIN_KEY=$E_HASURA_ADMIN_KEY
ENV PORT=80
ENV HASURA_GQL_ENDPOINT=$E_HASURA_GQL_ENDPOINT

WORKDIR app

COPY package.json ./

RUN npm install

COPY . .

CMD ["node", "index.js"]
