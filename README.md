# basic version of Paytm

### Live Demo
You can access a live demo of the project [LiveDemo](https://paytm-v0-frontend.onrender.com).

### functionality
1. user can signup as new customer
2. user can signin to existing account
3. user get random balance on account creation
4. user can see other users on platform and can filter users wrt custom input
5. user can transfer money from his account to another user's account


### things taken care:
1. jwt added as auth mechanism
2. user and account schema created with mongoose and relationship between models added
3. different routes for user signup/signin and account balance/transfer actions
4. amount transfer is maintained as transaction in database so that either whole transfer is rollbacked or committed at end
5. passwords are now hashed before storing to database


### Get Started
backend spin up:
```bash
cd backend/ && npm install && node index.js
```
frontend spin up:
```bash
cd frontend/ && npm install && npm run dev
```

### Stack
1. backend: express + node
2. database: mongodb + mongoose
3. other backend libs: zod + jsonwebtoken + cors
4. frontend: react + typescript + vite