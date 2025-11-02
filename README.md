# KFC-app

Tournament management web application intended for Klácelky Foosball Cup.

## Development

For local development you will need NodeJS, Yarn and a container runtime for running the database, either Podman or Docker.

1. Copy the `.env.example` file to `.env` and edit it.

2. Install packages.

```
yarn
```

3. Start the database.

```
podman compose up -d database  ## -d will start it in the background
```

4. Run database migrations. This will also generate `@prisma/client` based on the schema.

```
yarn prisma migrate dev
```

5. Let the development begin!
