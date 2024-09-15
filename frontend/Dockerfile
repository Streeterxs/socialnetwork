# socialnetwork:frontDev
FROM node:16-alpine as development

RUN --mount=type=bind,source=/package.json,target=/package.json \
  --mount=type=bind,source=/package-lock.json,target=/package-lock.json \
  npm ci

CMD npm run start

FROM node:16-alpine as setup

WORKDIR /socialnetwork

COPY . .

ENV REACT_APP_GRAPHQL_URL=http://localhost:3332/graphql

# update first from experimental versions to remove --force
RUN npm ci --force
RUN npm run build

# socialnetwork:frontProd
FROM node:16-alpine as production

WORKDIR /socialnetwork

RUN --mount=type=bind,from=setup \
  npm version

RUN --mount=type=bind,from=setup \
  cd socialnetwork && ls

RUN --mount=type=bind,from=setup \
  ls -a

COPY --from=setup ./socialnetwork/build ./

RUN npm install --global http-server

EXPOSE 3100
CMD http-server . -o -p 3100