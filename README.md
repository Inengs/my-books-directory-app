#📚 Inengiye's Book Directory App#

Welcome to Inengiye's Book Directory App, a full-stack web application for managing a collection of books! 📖 Built with Node.js, Express, MongoDB, and a responsive frontend, this app allows users to add, view, update, and delete books securely with user authentication. Deployed on Render, it’s ready to help book lovers organize their collections! 🚀

##✨ Features##
User Authentication 🔒: Register and log in securely with JWT-based authentication.

Book Management 📚:

➕ Add new books with title, author, genre, publication year, and ISBN.

🔍 View book details by ID with a user-friendly dropdown.

✏️ Update existing book details.

🗑️ Delete books by ID.


Paginated Book List 📃: Browse all books with pagination on the home page.

Responsive Design 📱: Works seamlessly on desktop and mobile devices.

Secure API 🛡️: Protected endpoints with JWT token validation.

Deployed on Render ☁️: Accessible online with a MongoDB Atlas backend.

##🛠️ Installation##

Follow these steps to run the app locally:
Clone the Repository:

git clone https://github.com/your-username/book-directory-app.git
cd book-directory-app

Install Dependencies:

npm install

Set Up Environment Variables: Create a .env file in the root directory and add:

MONGO_URI=mongodb://localhost:27017/book_directory
JWT_SECRET=your-secure-secret-key
PORT=3000

Replace MONGO_URI with your MongoDB connection string (e.g., MongoDB Atlas for production).

Run the App:

node server.js

The app will be available at http://localhost:3000.

##🚀 Usage##

Register 📝: Go to the homepage (/) and create an account.

Log In 🔑: Log in with your credentials to access protected routes.
Manage Books:
Navigate to /add-book to add a new book.
Use /get-book to view a book’s details by selecting from a dropdown or entering an ID.
Update books at /update-book with a valid book ID.
Delete books at /delete-book by ID.
View all books with pagination at /home.
Log Out 🚪: Click the "Logout" button to clear your session.

##☁️ Deployment##

The app is deployed on Render with MongoDB Atlas for the database. To deploy your own instance:
Set Up a Render Account:
Create an account at Render.
Create a new Web Service and connect your GitHub repository.
Configure Environment Variables:
In the Render dashboard, add:

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/book_directory?retryWrites=true&w=majority
JWT_SECRET=your-secure-secret-key
PORT=3000

Set Build and Start Commands:
Build Command: npm install
Start Command: node server.js
Deploy:
Render will automatically build and deploy your app. Access it at the provided URL (e.g., https://your-app.onrender.com).

##🛠️ Technologies Used##
###Backend:###
Node.js 🌐
Express.js 🚀
MongoDB 🍃 (with Mongoose)
JWT (JSON Web Tokens) 🔒
bcryptjs 🔑

###Frontend:###
HTML/CSS/JavaScript 📄
Responsive design with custom CSS 🎨

###Deployment:###
Render ☁️
MongoDB Atlas 📊

###Other:###
method-override 🛠️
dotenv ⚙️

##🤝 Contributing##
Contributions are welcome! 🙌 To contribute:
Fork the repository.
Create a new branch:
git checkout -b feature/your-feature

Make your changes and commit:
git commit -m "Add your feature"

Push to your branch:
git push origin feature/your-feature

Open a Pull Request on GitHub.

Please ensure your code follows the project’s style and includes tests if applicable.

##📜 License##

This project is licensed under the MIT License. See the LICENSE file for details.

##🙏 Acknowledgments##
Thanks to Render for easy deployment.

Happy book managing! 📖 If you have questions or feedback, open an issue or reach out. 😊
