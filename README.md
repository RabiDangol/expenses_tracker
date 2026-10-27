# Expenses Tracker

A React app with an Express API and MongoDB for managing expenses.

## Live app

The production frontend is available at [https://expenses-tracker-vk2n.vercel.app](https://expenses-tracker-vk2n.vercel.app).

## Run locally

1. Install the root dependencies with `npm install`.
2. Install the frontend dependencies with `npm install --prefix client`.
3. Create a root `.env` file with `PORT`, `MONGO_URL`, and `JWT_SECRET`.
4. Start the API and frontend with `npm run dev`.

The frontend uses `http://localhost:5000/api/v1` for API requests in local
development.

## Deploy

### API on Render

1. Create a new Render Blueprint from this GitHub repository. Render will use
   [`render.yaml`](./render.yaml) to create the API service.
2. Set `MONGO_URL` in the Render service environment to your MongoDB connection
   string. Keep this value private.
3. Ensure your MongoDB deployment permits connections from Render.
4. Wait for the service health check at `/` to pass and copy its public URL.

Render generates a `JWT_SECRET` for the service. Existing users may need to
sign in again if that secret changes.

### Frontend on Vercel

1. Import this GitHub repository into Vercel and set the project root directory
   to `client`.
2. Add the `REACT_APP_API_URL` environment variable in Vercel, using the Render
   service URL followed by `/api/v1` (for example,
   `https://your-api.onrender.com/api/v1`).
3. Deploy the project. [`client/vercel.json`](./client/vercel.json) enables
   client-side routes to load directly.

The frontend and API are deployed separately. The Vercel project uses `client`
as its root directory.
