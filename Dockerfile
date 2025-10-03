# Use Node.js 20 LTS Alpine for smaller image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies first (cache optimization)
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "run", "start"]
