# Step 1: Build the React app
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire React app code
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built React app from the previous step
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom Nginx configuration if needed (to use port 3000)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port 3000 instead of 80
EXPOSE 3000

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
