# TechZone – Electronics E-Commerce Website

TechZone is a modern electronics e-commerce web application built with **React.js and Tailwind CSS**. It allows users to browse electronic products, search and filter items, view product details, and manage their shopping cart through a simple and responsive user interface.

This project was developed to practice React.js, reusable components, state management, routing, and real-world e-commerce functionality.

##  Features
- **Home Page:** Attractive homepage with a sliding banner.
- **Product Categories:** Browse electronics by category.
- **Product Search:** Search for products easily.
- **Advanced Filtering:** Filter products by category, brand, and price.
- **Pagination:** Display 8 products per page.
- **Product Details:** View product information, image gallery, and select quantities.
- **Shopping Cart:** Add, remove, and update product quantities.
- **Cart Total:** Automatically calculate the total price of cart items.
- **Persistent Cart:** Keep cart items saved after refreshing the page.
- **Authentication:** Sign up and sign in using Clerk.
- **Location Detection:** Detect the user's location.
- **Delivery Form:** Provide delivery details for orders.
- **Toast Notifications:** Display messages when products are added to or removed from the cart.
- **Animations:** Smooth banner transitions and animations, including a “No Products Found” animation.
- **Responsive Design:** A user-friendly layout for different screen sizes.

##  Technologies Used

- **React.js** – Building the user interface
- **Vite** – Development server and build tool
- **Tailwind CSS** – Styling and responsive layouts
- **React Router** – Page navigation
- **Context API** – Shared product and cart state
- **Clerk** – User authentication
- **Swiper.js** – Banner slider
- **Axios** – HTTP requests
- **React Toastify** – Toast notifications
- **Lottie** – Animations
- **DummyJSON** – Sample product data

## Getting Started
Follow these steps to run TechZone locally.
### 1. Clone the Repository
```bash
git clone https://github.com/engribrahimorakzai/TechZone.git
```
### 2. Navigate to the Project Directory
```bash
cd TechZone
```
### 3. Install Dependencies
```bash
npm install
```
### 4. Configure Environment Variables
Create a `.env` file in the root directory and add your Clerk publishable key:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```
Get your Clerk publishable key from the [Clerk Dashboard](https://dashboard.clerk.com/).
**Note:** Replace the placeholder with your actual key. Never commit secret keys or private credentials to GitHub.
### 5. Start the Development Server
```bash
npm run dev
```
### 6. Open the Application
Open the local URL displayed in your terminal, usually:
```text
http://localhost:5173
```
## 📁 Project Structure

```text
TechZone/
├── public/
├── src/
│   ├── assets/       # Images and animation assets
│   ├── components/   # Reusable UI components
│   ├── context/      # Shared application state
│   ├── pages/        # Application pages
│   ├── App.jsx       # Main application component
│   └── main.jsx      # Application entry point
├── .env              # Environment variables
├── package.json
└── README.md
```

*Note: The folder structure above is a general overview. Adjust it to match the actual files in your repository.*

## 🎯 Project Purpose

TechZone was built as a hands-on project to improve my frontend development skills and understand how an e-commerce application works, including product browsing, filtering, authentication, cart management, and responsive UI development.

## 👨‍💻 Author

**Muhammad Ibrahim Orakzai**

- GitHub: [@engribrahimorakzai](https://github.com/engribrahimorakzai)

---

If you find this project useful, feel free to explore the repository and share your feedback.
