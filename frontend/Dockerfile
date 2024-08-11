# Build stage
FROM node:20 AS build

WORKDIR /app

# Copy package.json, package-lock.json (if available) and vite.config.ts to the container
COPY package*.json vite.config.ts ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app using Vite
ENV REACT_APP_API_URL=http://localhost:8080
RUN npm run build

# Serve stage
FROM nginx:1.21.6

# Copy the custom nginx.conf file to the container
COPY .docker/nginx.conf /etc/nginx/nginx.conf

# Copy the built React app from the build stage to the nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]