# Authentication Using MERN

This project implements authentication logic for MERN stack applications, covering key features such as email sign-in and verification.

- Email sign-in
- Email verification for password recovery
- Additional authentication features

---

## Implementation Steps

### 1. Dependencies, SERVER and DATABASE setup

1. **Create Project Structure**: Set up a project directory with `backend` and `frontend` subdirectories.
2. **Initialize and Install Dependencies**:
   - **express**: for server setup
   - **cookie-parser**: for handling cookies in headers
   - **mailtrap**: for email authentication and verification codes
   - **bcryptjs**: for password hashing
   - **dotenv**: for managing environment variables
   - **jsonwebtoken**: for session management and token verification
   - **mongoose**: for database interactions
   - **crypto**: for cryptographic functions
   - **nodemon**: for live changes feedbacks
3. Initialize `Server/index.js` and Listen on PORT: **3000**;
4. Initialize the `dotenv` for MONGODB_URL and set up the database connection with it in `db/connectDB.js`

---

## 2. Routes, Controllers, and Models

1. Create a separate `routes/auth.routes.js` for 'api/auth' routes : `/signup`, `/login`, and `/logout`
   - Initailize the router using **express.Router()**
   - Create each mentioned authentication routes
2. Create `controllers/auth.controllers.js'`: function for each route, for each routes.
3. Create `models/user.models.js`: a model to map user into DB collection
   - Initialize the `new mongoose.Schenma({..define data structure}, {timestamp:true})`
   - export the defined Schema by mapping the model to DB collection

---

### 3. Contollers Functions

