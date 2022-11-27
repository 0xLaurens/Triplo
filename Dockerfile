# Define image.
FROM node:16.15.1-alpine
# Set environment variables.
ENV DEBIAN_FRONTEND=noninteractive
# Define app directory.
WORKDIR /app
# Copy dist.
COPY package.json .
# Install dependencies and create a user.
RUN npm i -g npm ; \
  npm i --production --ignore-scripts --legacy-peer-deps ; \
  npm cache clean --force; \
  addgroup -S appgroup && \
  adduser -S appuser -G appgroup

# Define image.
FROM node:16.15.1-alpine
# Set environment variables.
ENV DEBIAN_FRONTEND=noninteractive
# Define app directory.
WORKDIR /app
# Copy sources.
COPY /dist/apps/api ./dist
# Set user.
USER appuser
# Configure exposed port.
# Define startup command.
CMD [ "node", "./dist/main.js" ]
