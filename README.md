[![Netlify Status](https://api.netlify.com/api/v1/badges/fd20f916-72b2-493c-8417-e14fe3ceff0f/deploy-status)](https://app.netlify.com/sites/kind-euclid-dcefd3/deploys)
![Linter Status](https://github.com/parahyba-valley/parahyba-valley-web/workflows/Linter/badge.svg)
![Test Status](https://github.com/parahyba-valley/parahyba-valley-web/workflows/Test/badge.svg)

![Parahyba Valley logo](https://parahybavalley.org/9ab7979ccf0ea8912cdc10d1f927085f.png)

# Welcome to Parahyba Valley

### What's Parahyba Valley?

Parahyba Valley is an open-source project to help startups, companies and organizations of the Vale do Paraíba promote yours initiatives and products.

### Setup

#### With docker

Up the container app using:
```shell
docker-compose up -d app
```

Install dependencies
```shell
docker-compose exec app yarn install
```

Start app
```shell
docker-compose exec app yarn start
```

#### Without docker

Install dependencies
```shell
yarn install
```

Start app
```shell
yarn start
```

After that, API parahyba-valley is available on http://localhost:9000/ and WEB parahyba-valley is available on http://localhost:9001/.

#### Resources

- [Development](https://github.com/parahyba-valley/parahyba-valley-web/blob/master/DEVELOPMENT.md)
- [Contributing Guide](https://github.com/parahyba-valley/parahyba-valley-web/blob/master/CONTRIBUTING.md)
