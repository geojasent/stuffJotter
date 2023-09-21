# Builder container to compile typescript
FROM node:latest as BASE
WORKDIR /server
EXPOSE 5000

# Install dependencies
# COPY tsconfig.json .
# COPY package.json .
# COPY package-lock.json .

FROM base as dev
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     --mount=type=bind,source=tsconfig.json,target=tsconfig.json \
#     --mount=type=cache,target=/root/.npm \
#     npm ci --include=dev
# USER node
COPY tsconfig.json .
COPY package.json .
COPY package-lock.json .
COPY . .

# RUN npm install
CMD ["npm", "run", "dev"]