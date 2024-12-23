# My Business

Before running the development server, install the necessary dependencies:

```bash
npm install
```

Next, run the development server:

```bash
npm run dev
# or
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

### Database Operations

To update the database:

1. Perform a `pg_dump` of the production database and save it as `pgdump.sql`.

   ```bash
   pg_dump -U postgres -h localhost business_db > pgdump.sql
   ```

2. Use the provided script to load the database into the staging environment:
   ```bash
   ./update_docker.sh
   ```
