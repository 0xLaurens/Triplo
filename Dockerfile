# Define image.
FROM docker.io/node:lts-alpine as deps
# Define app directory.
WORKDIR /app
# Copy dist.
COPY package.json .
# Install dependencies and create a user.
RUN npm install --only=production \
  addgroup -S appgroup && \
  adduser -S appuser -G appgroup

# Define image.
FROM docker.io/node:lts-alpine as deps
WORKDIR /app
ENV NODE_ENV production
# Copy sources.
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY /dist/apps/api ./dist
USER appuser
CMD [ "node", "./dist/main.js" ]
