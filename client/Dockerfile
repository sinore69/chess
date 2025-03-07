# Step 1: Build the Next.js app
FROM node:22.14-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./

RUN npm install

# Copy all files and build the Next.js app
COPY . .

RUN npm run build

EXPOSE 3000

# Start the Next.js app
CMD ["npm","run", "start"]
