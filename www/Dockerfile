# Use the official Node.js 20 image as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of your app's source code
COPY . .

# Build your Next.js app
RUN npm run build

# Expose the port your app runs on
EXPOSE 3001

# Start the app
CMD ["npm", "start"]