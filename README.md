TechZone
TechZone is a small online store for electronics that I built with React. You can browse products, search and filter them, open a product page, and add items to your cart.
I made this project to practice React and to learn how a real shopping site works.

What it can do
Home page with a sliding banner
Browse products by category
Search, and filter by category, brand and price
Pagination (8 products per page)
Product page with image gallery and quantity picker
Cart with plus, minus and delete buttons, and a bill total
Your cart stays saved even after you refresh the page
Sign in and sign up
Detect your location and fill the delivery form for you
Small pop-up message when you add or remove an item
Built with
React and Vite
Tailwind CSS
React Router
Context API
Clerk (login)
Swiper (banner slider)
Axios
React Toastify
Lottie (the "No Products Found" animation)
DummyJSON for product data
How to run it
Clone the project
bash
   git clone https://github.com/engribrahimorakzai/TechZone.git
   cd TechZone
Install the packages
bash
   npm install
Create a file named .env in the main folder and add your Clerk key
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here

You can get a free key from clerk.com.

Start the app
bash
   npm run dev

Then open http://localhost:5173 in your browser.

Folder overview
src/
  components/   small reusable parts (Navbar, ProductCard, Filter...)
  context/      shared data (products and cart)
  pages/        full pages (Home, Products, Cart...)
  assets/       images and animations
About me

I'm Ibrahim Khan. You can find me on GitHub: engribrahimorakzai
