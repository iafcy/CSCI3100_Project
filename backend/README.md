# Backend

This is the Backend for CUHKG.

## Tech stack

<div>
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
    <img src="https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white">
    <img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
    <img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white">
    <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white">
</div>

## Installation

1. Install NPM packages

```bash
npm install
```

2. Copy .env.sample

```bash
cp .env.example .env
```

3. Setup environment variables

```
API_PORT=<Port number for the backend>

LOG_LEVEL=<Log level for logger>

SUPABASE_DB_PASSWORD=<Password for accessing Supabase>
SUPABASE_URL=<URL for connecting to Supabase>
SUPABASE_KEY=<ANON API key for accessing Supabase>
SUPABASE_SERVICE_KEY=<Secret service API key for accessing Supabase>
```

4. Run the application

```bash
# For development
npm run dev
```

## Testing

### Unit test

These unit tests are designed to verify the correctness of the logic and functionality within the Express backend.

Tests files can be found in `/test/unit`. Execute the following command to execute the tests.

```bash
npm run test:unit
```

### Integration test

These integration tests are designed to test if the Express backend and Supabase are functioning cohesively by testing the interaction between these components.

The tests make use of a local instance of Supabase.

#### Setup local instance of Supabase

1. Prerequisites

- Docker

2. Setup Supabase

```bash
npx supabase login

# It will pull all necessary docker images if you do not have them
npx supabase start

# Link the cloud instance to the local instance
npx supabase link --project-ref <project-id>
npx supabase db pull

# Reset the local instance and populate with seed data in ../supabase/seed.sql
npx supabase db reset
```

3. Copy .env.sample

```bash
cp .env.example .env.test
```

4. Setup environment variables for the local instance

```
API_PORT=<Port number for the backend>

LOG_LEVEL=<Log level for logger>

SUPABASE_DB_PASSWORD=<Password for accessing Supabase>
SUPABASE_URL=<URL for connecting to Supabase>
SUPABASE_KEY=<ANON API key for accessing Supabase>
SUPABASE_SERVICE_KEY=<Secret service API key for accessing Supabase>
```

Tests files can be found in `/test/unit`. Execute the following command to execute the tests.

```bash
npm run test:integration
```
