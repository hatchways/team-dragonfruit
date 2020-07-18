# EXPRESS-STARTER

## Environment variables

In order to run the server, you need to create `.env.local` file in `/server` with the following content:

```
MONGODB_URL=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0-ttgy0.mongodb.net/<DB_NAME>?retryWrites=true&w=majority
JWT_SECRET=<JWT_SECRET>
STRIPE_SECRET=<STRIPE_SECRET>
```
