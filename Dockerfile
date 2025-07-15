# Stage 1: Build the frontend
FROM node:18-alpine AS build

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# Stage 2: Serve using a static file server
FROM node:18-alpine

# Install 'serve' globally
RUN npm install -g serve

# Copy built files from previous stage
COPY --from=build /app/dist /app/dist

WORKDIR /app
EXPOSE 5000

# Serve the frontend
CMD ["serve", "-s", "dist", "-l", "5000"]
