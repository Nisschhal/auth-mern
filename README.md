# Authentication Using MERN

A comprehensive authentication system built with the MERN stack (MongoDB, Express, React, Node.js), featuring email sign-in, email verification, and password recovery.

## Features

- **Email Sign-in**: Secure authentication using email and password.
- **Email Verification**: Verify user email addresses during registration.
- **Password Recovery**: Reset password functionality through email.
- **Token-based Authentication**: Secure user sessions using JSON Web Tokens (JWT).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Implementation Steps](#implementation-steps)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Nisschhal/auth-mern.git
   ```
2. Navigate to the project directory:
   ```bash
   cd authentication-mern
   ```
3. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```
     MONGODB_URL=<your-mongodb-connection-string>
     PORT=<your-server-port>
     JWT_SECRET=<your-jwt-secret-key>
     NODE_ENV=<environment-type>
     MAILTRAP_TOKEN=<your-mailtrap-token>
     CLIENT_URL=<your-client-url>
     ```
5. Start the backend server:

   ```bash
   npm run dev
   ```

6. (Optional) Set up the frontend:
   - Navigate to the `frontend` directory and follow similar steps to set up the frontend.

## Usage

To use the application, follow these steps:

1. Access the application at `http://localhost:3000` after starting the server.
2. Use the `/signup` route to register a new user.
3. Verify the email using the link sent to the registered email address.
4. Use the `/login` route to authenticate with the verified account.

## Project Structure

- `backend/`
  - `controllers/`: Handles the logic for each route.
  - `models/`: Defines the MongoDB schemas.
  - `routes/`: Defines API routes for authentication.
  - `db/`: Database connection setup.
  - `middlewares/`: Contains middleware for authentication.
  - `utils/`: Utility functions (e.g., email templates, auth token generation and set cookie).

## API Endpoints

### Authentication

- **POST** `/api/auth/signup`: Register a new user.
- **POST** `/api/auth/login`: Authenticate an existing user.
- **POST** `/api/auth/verify-email`: Verify user's email address.
- **POST** `/api/auth/forgot-password`: Send password reset link.
- **POST** `/api/auth/reset-password`: Reset user's password.

## Implementation Steps (BACKEND)

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

### 2. Routes, Controllers, and Models

1. Create `routes/auth.routes.js` for 'api/auth' routes: `/signup`, `/login`, and `/logout`.
   - Initialize the router using `express.Router()`.
   - Define the authentication routes.
2. Create `controllers/auth.controllers.js`: Functions for each route.
3. Create `models/user.models.js`: A model to map users to the database collection.
   - Define the schema with `new mongoose.Schema({...}, { timestamps: true })`.
   - Export the schema by mapping the model to the database collection.

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

3. **Verify the Email**:

   - Create a route `/verify-email` with its controller function and attach the `verifyEmail` function with it.
   - **verifyEmail**:
     - Get the code from `req.body`.
     - Check if the code exists with its expiry date being valid and get that user.
     - If yes, update the user's `isVerified` to true, and set `verification` and `verificationExpiresAt` to undefined.
     - Send the welcomeEmail(email, user).
     - Return the response.

4. **Verify the Logged-in User**:
   - Create a route `/check-auth` and add `middleware:verifyToken/protectedRoute` to extract the `userId` from the incoming request via `cookie` using `jsonwebtoken` and attach to `request.userId`.
   - Verify the extracted `userId` if it exists in the database.
   - If yes, send the success/verified response with user for frontend to verify.

### Backend Overview (Node.js/Express, MongoDB)

1. Project is set up with required dependencies, routes, controllers, and User model to store and manipulate authenticated user data.
2. Routes for different authentication operations are created with respective controllers and logic.
3. `mailtrap` is used to send verification, password forget, reset, and success emails, as well as welcome emails for newly verified users.
4. `mongoose` with MongoDB Atlas is used for the database.

## Technologies Used

- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs, cookie-parser
- **Email**: Mailtrap for email verification and password recovery
- **Environment Variables**: dotenv
- **Security**: Crypto(to generate reset-token)

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

---

---

---

## Frontend

### Implementation Steps (FRONTEND)

1. **Install and Initialize Dependencies (SETUP)**

   - Step into the frontend directory:
     ```bash
     cd frontend
     ```
   - Install Vite:
     ```bash
     npm install vite@latest
     Set up with React and JavaScript.
     ```
   - Install Tailwind CSS for styling, **follow its docs and setup guide.**

   - Install Framer Motion for animations:
     ```bash
     npm install framer-motion
     ```
   - Install React Router DOM for routing:
     ```bash
     npm install react-router-dom
     ```
     Define routes: `/`, `/signup`, `/login`.
   - Install Lucide React for icons:
     ```bash
     npm install lucide-react
     ```
   - Install Zustand for state management:
     ```bash
     npm install zustand
     ```
   - Install Axios for API calls to the backend:
     ```bash
     npm install axios
     ```
   - Install CORS for cross-origin resource sharing:
     ```bash
     npm install cors
     ```
   - Install React Hot Toast for toast notifications:
     ```bash
     npm install react-hot-toast
     ```

2. **UIs and Components**

   - **Signup and Login UI**:
     - Background with a gradient and floating shapes for animation.
     - Card layout for the form, inputs, and icons.
     - Password strength meter with logic for user feedback.
   - **Login UI**:
     - Similar to Signup, but includes loading and error states.
   - **Email Verification UI**:
     - Input fields for 6-digit codes using the ref hook.
     - Backspace logic to focus on the previous field when needed.
     - Automatic submission when all digits are entered.
   - **Forgot Password**:
     - Functionality to send a password reset email to the registered email address.
     - Link to set a new password after verification.
   - **Dashboard**:
     - Display user information: name, email, last login, and join date.

3. **Authentication Process**

   - Create a store using Zustand for managing authentication state:
     - Store properties: `isAuthenticated`, `isLoading`, `error`, `user`, `isCheckingAuth`.
     - Store methods: `signup()`, `verifyMail()`, `checkAuth()`.
   - Use Axios for API calls to the backend:
     - Set `axios.defaults.withCredentials` to true for sending cookies with each request to the server.
     - Configure CORS in the backend to allow requests:
       ```javascript
       app.use(cors({ origin: `client_url`, credentials: true }));
       ```
   - **Redirect Users**:
     - If authenticated, do nothing or redirect to the dashboard.
     - If not authenticated, redirect to the login/signup or email verification page, if already signed up.
   - Use the backend API calls for signup, login, and forgot password functionalities.
     - Call these APIs in the created `authStore()` and export them for use in the required components or pages.

### Deployment (Vercel)

- **Root Directory**: `./`
  - In the `package.json` file, create the following scripts:
    ```json
    "scripts": {
      "build": "npm install && npm install --prefix frontend && npm run build --prefix frontend",
      "start": "node backend/index.js"
    }
    ```
    1. `npm install`: Installs all root-level dependencies.
    2. `npm install --prefix frontend`: Installs all frontend dependencies.
    3. `npm run build --prefix frontend`: Builds the frontend/React app inside the **dist** folder.
  - Start the backend server:
    ```bash
    node backend/index.js
    ```
    1. All logic is set up in the `index.js` file.
    2. API calls will be handled at `www.example.com/api/auth/{endpoints}`.
    3. Routes from the frontend will be served from `www.example.com/{anything}`, handling requests through `frontend/dist/index.html`.

---

## Learning Outcomes

### Frontend Implementation

1. **Modern Tools**: Gained experience with **Vite** for fast development and **Tailwind CSS** for utility-first styling, enabling efficient design.

2. **Component Development**: Created reusable components and integrated **Framer Motion** for enhanced animations, improving user engagement.

3. **Routing & Navigation**: Utilized **React Router DOM** for seamless navigation between key components like Signup and Login.

4. **State Management**: Employed **Zustand** for centralized state management, efficiently handling authentication states and API interactions.

5. **API Integration**: Used **Axios** for API calls and implemented CORS policies for secure cross-origin requests.

6. **User Experience**: Designed interfaces with features like password strength meters and notifications using **React Hot Toast** for instant feedback.

### Backend Implementation

1. **Node.js & Express**: Developed a RESTful API, structuring endpoints for user authentication and data retrieval.

2. **Database Management**: Managed user data securely, implementing password hashing and email verification.

3. **Authentication & Security**: Set up JWT for secure authentication and configured CORS policies to enhance security.

4. **Middleware**: Utilized middleware for error handling, logging, and data validation to streamline request processing.

5. **Deployment**: Established deployment scripts for both frontend and backend, ensuring smooth application startup.

### Overall Outcomes

- Independently developed a full-stack application, integrating frontend and backend technologies.
- Improved problem-solving skills through real-world functionalities like user authentication and data handling.
- Enhanced my understanding of the software development lifecycle, managing both frontend and backend tasks effectively.

## Conclusion

Thank you for taking the time to explore the **Auth-MERN** application. I hope this documentation provides a clear understanding of the project's architecture and implementation that I have used. If you have any questions or feedback, feel free to reach out!

### Happy coding! ./
