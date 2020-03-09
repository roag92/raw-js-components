# raw-js-components

This project shows the basic concepts of components using an application based in pure javascript. The application is a PoC of searching videos using YouTube API.

## Requirements

- Docker
- docker-compose
- CircleCi Cli

------------

## Installation

After to clone this project:

```bash
cp .env.dist .env
```

> Note: Don't forget put the right content onto .env file

------------

### Sart Server

Development with live reload

```bash
docker-compose -f docker-compose.dev.yml up
```

Production mode

```bash
docker-compose -f docker-compose.prod.yml up
```

> Note: add the --build parameter to build as the first time

------------

### Test Pipeline

```bash
circleci local execute --job build 
```

------------

### Usage

Format files

```bash
docker-compose -f docker-compose.cli.yml run --rm yarn format:fix
```

Run tests

```bash
docker-compose -f docker-compose.cli.yml run --rm yarn test
```
