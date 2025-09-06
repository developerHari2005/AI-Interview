# Backend Setup

## Environment Variables

This application requires a `.env` file in the `backend` directory. Create a file named `.env` and add the following content:

```
DB_URL=postgresql://neondb_owner:npg_L9gra6FqcbKD@ep-divine-shadow-adwbjbwn-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## Running the Application

Due to an unstable environment during development, the application could not be tested. However, it is expected to run with the following command from the `backend` directory:

```bash
go run main.go
```

## Project Structure

Also due to the unstable environment, all the backend code has been consolidated into the `main.go` file. This is not ideal, but it was a necessary workaround. In a stable environment, the code should be refactored into separate files for controllers, routes, and database configuration.
