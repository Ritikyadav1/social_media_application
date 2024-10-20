
# Social Media Application

This project is a simple social media platform built using Node.js, Express, MongoDB, and EJS as the templating engine. The application allows users to register, login, create posts, like posts, upload profile pictures, and manage their sessions using JWT tokens.

## Features

- **User Registration and Login:** Users can register with their email, password, username, and other details. Passwords are securely hashed using **bcrypt**.
  
- **Session Management with JWT:** After successful registration or login, the user receives a **JWT token** that is stored in cookies. This token is used for session management and authentication.

- **Profile Page:** Each user has a profile page where they can see their posts, upload profile pictures, and edit posts.

- **Post Creation and Like System:** Users can create posts (like a mini blog or tweet) and like/unlike posts. This functionality is similar to social media platforms like Twitter.

- **Profile Picture Upload:** Users can upload a profile picture. Images are handled and stored using **Multer** for file uploads.

- **Middleware for Authentication:** A custom `isLoggedIn` middleware is used to verify if the user is authenticated using their JWT token before allowing access to specific routes.

## Technologies Used

- **Node.js**: Backend framework.
- **Express.js**: Web framework for handling routing and middleware.
- **MongoDB**: Database to store user data and posts.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **EJS**: Templating engine for rendering HTML pages.
- **JWT (jsonwebtoken)**: Used for tokenizing user sessions and maintaining authentication.
- **bcrypt**: For securely hashing passwords.
- **Multer**: For handling file uploads (profile pictures).
- **cookie-parser**: Middleware to parse cookies.

## Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/Ritikyadav1/mini-project-DA.git
    ```

2. **Install Dependencies**:

    Navigate to the project directory and install the required dependencies:

    ```bash
    cd your-repo-name
    npm install
    ```

3. **Set Up MongoDB**:

    Ensure that MongoDB is installed and running locally, or use a cloud-hosted MongoDB service like MongoDB Atlas.

4. **Set Up Environment Variables**:

    Create a `.env` file at the root of the project and add your MongoDB connection string, secret key, and other necessary configurations. Example:

    ```env
    MONGODB_URI="your-mongodb-connection-string"
    JWT_SECRET="your-jwt-secret"
    ```

5. **Run the Application**:

    After setting up MongoDB and environment variables, start the application:

    ```bash
    node app.js
    ```

6. **Access the Application**:

    The app will run on `http://localhost:3000`. You can open this URL in your browser.

## Routes Overview

- **Home Page**: `/`  
  The landing page of the application.

- **Register**: `/register`  
  Register a new user.

- **Login**: `/login`  
  User login page.

- **Profile**: `/profile`  
  View user profile and posts (requires authentication).

- **Post Creation**: `/post`  
  Create a new post (requires authentication).

- **Post Like/Unlike**: `/like/:id`  
  Like or unlike a post (requires authentication).

- **Edit Post**: `/edit/:id`  
  Edit an existing post (requires authentication).

- **Profile Picture Upload**: `/profile/upload`  
  Upload a profile picture (requires authentication).

- **Logout**: `/logout`  
  Clear the user's session by removing the token.

## Folder Structure

```
├── config
│   └── multerconfig.js   # Configuration for multer (file uploads)
├── models
│   ├── post.js           # Mongoose schema for posts
│   └── user.js           # Mongoose schema for users
├── public
│   └── (static assets like CSS, images)
├── views
│   ├── index.ejs         # Home page
│   ├── login.ejs         # Login page
│   ├── profile.ejs       # Profile page
│   ├── profileupload.ejs # Profile picture upload page
│   ├── edit.ejs          # Post edit page
│   └── test.ejs          # Test page (for any experiment)
├── app.js                # Main server file
├── package.json          # Project dependencies
└── README.md             # Project description
```

## Future Improvements

- Add more features like comments on posts, following users, etc.
- Implement validation on form inputs.
- Use environment variables for sensitive information such as JWT secrets.
- Improve security by setting secure cookies and using HTTPS.

## Author
 Ritik Yadav



---
