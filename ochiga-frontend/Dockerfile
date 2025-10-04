# Use Node.js 20 base image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files
COPY . .

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js app in development mode
CMD ["npm", "run", "dev"]
