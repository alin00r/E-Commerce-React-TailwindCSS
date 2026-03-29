# 🛍️ E-Commerce Application

A modern, full-featured e-commerce platform built with React and contemporary web technologies. This application provides a seamless shopping experience with user authentication, product browsing, shopping cart functionality.

## 🎯 Features

- **User Authentication & Registration**
  - Secure user registration with email validation
  - Form validation using Formik and Yup
  - Protected routes for authenticated users
  - Context-based authentication state management

- **Product Management**
  - Browse products with detailed information
  - Product ratings and reviews
  - Product details page with comprehensive information
  - Responsive product grid layout

- **Shopping Cart**
  - Add/remove items from cart
  - Cart state management with Redux
  - Price calculations and totals
  - Persistent cart data

- **Responsive Design**
  - Mobile-first responsive approach
  - Works seamlessly on all devices (mobile, tablet, desktop)
  - Beautiful gradient UI with Tailwind CSS
  - Optimized for all screen sizes

- **Multi-Language Support**
  - Language context for internationalization
  - Easy language switching

## 🛠️ Tech Stack

### Frontend Framework & Libraries

- **React.js** - UI library for building interactive components
- **Vite** - Lightning-fast build tool and development server
- **React Router** - Client-side routing and navigation

### State Management

- **Redux** - State management for cart and global state
- **React Context API** - Context for authentication and language settings

### Form Handling & Validation

- **Formik** - Form state management and handling
- **Yup** - Schema validation library for form validation

### Styling

- **Tailwind CSS** - Utility-first CSS framework for responsive design

### Development Tools

- **ESLint** - Code quality and style checking
- **Node.js** - JavaScript runtime environment

### Version Control

- **Git** - Version control system

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.0 or higher)
- npm (v6.0 or higher) or yarn
- Git

## 🚀 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd E-commerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173` (Vite default port)

## 📦 Project Structure

```
E-commerce/
├── src/
│   ├── components/
│   │   ├── ProtectedRoute.jsx          # Route protection wrapper
│   │   ├── feed/
│   │   │   └── FeedContainer.jsx       # Product feed component
│   │   ├── footer/                     # Footer component
│   │   ├── header/
│   │   │   ├── HeaderContainer.jsx     # Main header
│   │   │   ├── Logo.jsx                # Logo component
│   │   │   └── NavLinks.jsx            # Navigation links
│   │
│   ├── context/
│   │   ├── authContext.js              # Authentication context
│   │   ├── cartContext.js              # Shopping cart context
│   │   └── languageContext.js          # Language/i18n context
│   │
│   ├── pages/
│   │   ├── cart-page/
│   │   │   └── CartPage.jsx            # Shopping cart page
│   │   ├── contact-page/
│   │   │   └── ContactPage.jsx         # Contact/support page
│   │   ├── home-page/
│   │   │   └── HomePage.jsx            # Home/landing page
│   │   ├── not-found/
│   │   │   └── NotFound.jsx            # 404 page
│   │   ├── product-details/
│   │   │   └── ProductDetails.jsx      # Product detail page
│   │   ├── products-page/
│   │   │   ├── ProductsPage.jsx        # Products listing page
│   │   │   └── RatingComponents.jsx    # Rating component
│   │   ├── register-page/
│   │   │   └── RegisterPage.jsx        # User registration page
│   │
│   ├── provider/
│   │   ├── AuthProvider.jsx            # Auth context provider wrapper
│   │   └── LanguagesProvider.jsx       # Language context provider wrapper
│   │
│   ├── redux/
│   │   ├── store.js                    # Redux store configuration
│   │   └── reducers/
│   │       └── cartSlice.js            # Cart Redux slice (actions & state)
│   │
│   ├── lib/                            # Utility functions and helpers
│   ├── assets/                         # Images, icons, and static files
│   ├── App.jsx                         # Main App component
│   ├── App.css                         # Global styles
│   ├── main.jsx                        # Application entry point
│   └── index.css                       # Global CSS
│
├── public/                             # Static assets
├── package.json                        # Project dependencies and scripts
├── vite.config.js                      # Vite configuration
├── eslint.config.js                    # ESLint configuration
├── index.html                          # HTML template
└── README.md                           # Project documentation
```

## 🔐 Authentication Flow

1. **User Registration:** User fills out registration form with validation
2. **Form Validation:** Formik + Yup validates all input fields
3. **Store User Data:** User information stored in AuthContext
4. **Protected Routes:** ProtectedRoute component restricts access to authenticated users only
5. **Navigation:** User redirected to Products page after successful registration

## 🛒 State Management Architecture

### Context API

- **AuthContext** - Manages user authentication state and profile data
- **CartContext** - Manages shopping cart items and operations
- **LanguageContext** - Manages application language preferences

### Redux

- **cartSlice** - Redux slice for cart state with add/remove/update actions

## 🎨 Styling & Design

- **Tailwind CSS** - Utility-first CSS framework for rapid development
- **Responsive Design** - Mobile-first approach for all screen sizes
- **Gradient Effects** - Modern aesthetic with color gradients
- **Consistent UI** - Unified color scheme and typography across app

## 📱 Responsive Breakpoints

- **Mobile** - < 640px
- **Tablet** - 640px - 1024px
- **Desktop** - > 1024px

## 🔧 Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint to check code quality
npm run lint
```

## 📝 Key Pages

| Page            | Path           | Description                                |
| --------------- | -------------- | ------------------------------------------ |
| Home            | `/`            | Landing page with featured products        |
| Register        | `/register`    | User registration and signup               |
| Products        | `/products`    | Browse all products (protected)            |
| Product Details | `/product/:id` | Individual product information (protected) |
| Cart            | `/cart`        | Shopping cart management (protected)       |
| Contact         | `/contact`     | Contact and support page                   |
| 404             | `*`            | Not found error page                       |

## 🔒 Protected Routes

The following routes require user authentication:

- `/products` - Products listing page
- `/product/:id` - Product details page
- `/cart` - Shopping cart page

When unauthenticated users try to access these routes, they are redirected to the register page.

## 📚 Learning Outcomes

This project demonstrates proficiency in:

- ✅ React component architecture and composition
- ✅ React Router for client-side navigation
- ✅ Form handling with Formik and validation with Yup
- ✅ State management with Context API and Redux
- ✅ Responsive CSS with Tailwind
- ✅ Protected routes and authentication flows
- ✅ Component reusability and modularity
- ✅ Best practices in React development

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👤 Author

**Your Name**

- GitHub: [@alin00r](https://github.com/alin00r)
- LinkedIn: [alinourr](linkedin.com/in/alinourr/en/)
- Email:alymohameedaly@gmail.com

## 🙏 Acknowledgments

- React.js community for excellent documentation
- Tailwind CSS for the amazing utility framework
- Formik and Yup for robust form handling
- Vite for the ultra-fast build tool
- Redux for state management best practices
- ITI for the opportunity to build this project

---

**Last Updated:** March 2026  
**Version:** 1.0.0

Made with ❤️ Ali Nour
