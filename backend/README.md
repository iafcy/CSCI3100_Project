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
