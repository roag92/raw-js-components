FROM node:10.19.0-stretch-slim AS base
ENTRYPOINT [ "/usr/local/bin/yarn"]
WORKDIR /application
COPY . .

FROM base AS development
RUN apt-get update && \
    apt-get install -y wget gnupg2 && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list && \
    apt-get update && \
    apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*
RUN yarn install
CMD [ "start:dev"]
EXPOSE 3000 3001

FROM base AS production
RUN yarn install --production
CMD [ "start"]
EXPOSE 8080
