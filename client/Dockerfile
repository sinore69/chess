# Use official Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port Next.js runs on
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]
