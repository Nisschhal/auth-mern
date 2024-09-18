# Authentication Using MERN

This project implements authentication logic for MERN stack applications, covering key features such as email sign-in and verification.

- Email sign-in
- Email verification for password recovery
- Additional authentication features

---

## Implementation Steps

### 1. Dependencies, Server, and Database Setup

1. **Create Project Structure**: Set up a project directory with `backend` and `frontend` subdirectories.
2. **Initialize and Install Dependencies**:
   - `express`: Server setup
   - `cookie-parser`: Handling cookies in headers
   - `mailtrap`: Email authentication and verification
   - `bcryptjs`: Password hashing
   - `dotenv`: Managing environment variables
   - `jsonwebtoken`: Session management and token verification
   - `mongoose`: Database interactions
   - `crypto`: Cryptographic functions
   - `nodemon`: Live change feedback
3. Initialize `server/index.js` and listen on **PORT 3000**.
4. Set up `dotenv` for `MONGODB_URL` and establish the database connection in `db/connectDB.js`.

---

## 2. Routes, Controllers, and Models

1. Create `routes/auth.routes.js` for 'api/auth' routes: `/signup`, `/login`, and `/logout`.
   - Initialize the router using `express.Router()`.
   - Define the authentication routes.
2. Create `controllers/auth.controllers.js`: Functions for each route.
3. Create `models/user.models.js`: A model to map users to the database collection.
   - Define the schema with `new mongoose.Schema({...}, { timestamps: true })`.
   - Export the schema by mapping the model to the database collection.

---

### 3. Controller Functions

1. **Signup Controller**:

   - Extract `email`, `password`, and `name` from the request body.
   - Check if a user with the provided email exists in the database.
   - If not, hash the password and create a random verification token.
   - Create a new user using the `User` model structure.
   - Save the user to the database.
   - Create a JWT token using `user._id` and set it in `response.cookie` for authentication.
   - Return a success response.

2. **Email Verification Using `mailtrap`**:

   - After setting the verification token in the cookie, generate a verification code using the user's email.
   - Set up `mailTrap/mailTrap.config.js`, where `mailTrapClient` and sender details (domain or test domain) are exported.
   - Create two new files in `mailTrap`:
     - **emailTemplates.js**: Contains `EMAIL_VERIFICATION_TEMPLATE`, `EMAIL_RECOVERY_REQUEST_TEMPLATE`, and `EMAIL_RESET_SUCCESS_TEMPLATE`.
       - Customize these templates with placeholders for the verification code.
     - **generateVerificationToken.js**: Function that takes `email` and `verificationCode` as parameters.
       - Use the provided email to send the email and replace the template placeholder with the `verificationCode`.
   - Call this function in the **signup controller** after setting the authentication token in the cookie.

3. **Verify the email**:

   - Create a route `/verify-email` with its controller function and attach the verifyEmail function with it
   - **verifyEmail**
     - get the code from req.body
     - check if the code exists with its expirydate being valid and get that user
     - if yes, update the user's isVerified to true, and verification, and verificationExpiriesAt to undefined
     - now, send the welcomeEmail(email, user)
     - return the response

4. **Verify the logged in user**:
   - Create a route `/check-auth` and add `middleware:verifyToken/protectedRoute` to extract the **userId** from the incoming request aka `cookie` via `jsonwebtoken` and attach to **_request.userId_**
   - verify the extracted **_userId_** if exits in db
   - if yes, send the success/verified response

---

### Backend Overview (Node.js/Express, Mongodb):

1.  Project is setup with required dependencies; routes with their controllers, and User model to store and manipulate authenticated user data.
2.  Routes for different Authentication operation is created with respective Controllers and logic in it.
3.  `mailtrap` is used to send verfication, password forget, reset, and success. Also, welcome for newly verified user.
4.  `mongoose`: mongodb atlast is used for the database/storage
