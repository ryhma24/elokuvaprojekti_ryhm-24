FROM node:22
WORKDIR /app
COPY package.json package-lock.json ./
RUN ls -la
RUN npm install
COPY . .
RUN ls -la
EXPOSE 3001
CMD ["npm", "run", "devstart"]