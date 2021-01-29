# pull official base image
FROM node:13.12.0-alpine
 
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

RUN apk update && apk add bash py-pip

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts -g --silent

# RUN pip install -r app/app/requirements.txt 

# add app
COPY . ./app

# start app
CMD bash -c "cd app && ls && npm run start-docker"