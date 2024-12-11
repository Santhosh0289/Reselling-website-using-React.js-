# Reselling Website

Welcome to the Reselling Website project! This platform is designed to provide users with a seamless experience for buying and selling products across various categories. With features such as dynamic product filtering, advanced authentication, and robust backend integration, this application is a comprehensive solution for reselling needs.

## Features

### General Features
- **Dynamic Product Filtering:** Users can search and filter products based on categories, locations, and keywords.
- **Location-Based Search:** Get current location using Geolocation API or manually select from a predefined list.
- **Responsive Design:** Tailored for a seamless user experience across devices.

### Authentication
- **Firebase Authentication:** Secure login and signup options using:
  - Email and Password
  - Google Authentication
  - Phone Number with OTP Verification
- **Real-Time Authentication Tracking:** Updates the user interface dynamically based on login state.

### User Interaction
- **Sell Page:** Allows users to list their products with an intuitive interface.
- **Dynamic Product Listings:** Real-time updates for new listings with seamless integration into the homepage.
- **Details Page:** Displays comprehensive product information including images, pricing, and seller details.

## Technologies Used

### Frontend
- **React.js:** For building dynamic and responsive user interfaces.
- **TypeScript (TSX):** Ensures type safety and better code maintainability.
- **Tailwind CSS:** Provides utility-first CSS framework for rapid UI development.

### Backend & Database
- **Firebase:**
  - Authentication for secure login.
  - Firestore for real-time database management.

### APIs
- **Nominatim API:** Converts geolocation coordinates into human-readable location names.

### Deployment
- Deployed using modern hosting solutions ensuring scalability and performance.

## Installation and Setup

### Prerequisites
- Node.js and npm installed.
- Firebase project configured.

- # React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

### Steps to Run Locally

#### Setting up React.js
1. Install Node.js from [Node.js official site](https://nodejs.org/).
2. Create a new React project (if not using the existing one):
   ```bash
   npx create-react-app reselling-website --template typescript
   ```
3. Navigate to the project directory:
   ```bash
   cd reselling-website
   ```
4. Install dependencies:
   ```bash
   npm install
   ```

#### Setting up Tailwind CSS
1. Install Tailwind CSS via npm:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```
2. Configure `tailwind.config.js`:
   ```javascript
   module.exports = {
     content: ["./src/**/*.{js,jsx,ts,tsx}"],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```
3. Add Tailwind to your CSS file (e.g., `src/index.css`):
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

#### Setting up Firebase
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Install Firebase SDK:
   ```bash
   npm install firebase
   ```
3. Configure Firebase in your project (`src/firebase/setup.ts`):
   ```javascript
   import { initializeApp } from "firebase/app";
   import { getAuth, GoogleAuthProvider } from "firebase/auth";
   import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
     apiKey: "<YOUR_API_KEY>",
     authDomain: "<YOUR_AUTH_DOMAIN>",
     projectId: "<YOUR_PROJECT_ID>",
     storageBucket: "<YOUR_STORAGE_BUCKET>",
     messagingSenderId: "<YOUR_MESSAGING_SENDER_ID>",
     appId: "<YOUR_APP_ID>",
   };

   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   export const googleProvider = new GoogleAuthProvider();
   ```

4. Replace placeholders in `firebaseConfig` with your Firebase project credentials.


#### Running the Project
1. Start the development server:
   ```bash
   npm start
   ```
2. Access the application at `http://localhost:3000`.

## Folder Structure
- **src/components:** Contains reusable React components such as Navbar, Menubar, Footer, etc.
- **src/pages:** Pages like Home, Sell, and Details.
- **src/firebase:** Firebase configuration and utility files.
- **src/assets:** Images and other static assets.
- **src/styles:** Contains global and component-specific styles.

## Website Workflow

### Homepage:
Displays all available listings with options to filter by category, location, and search keywords.

![Screenshot (156)](https://github.com/user-attachments/assets/8c88f50c-f5c7-41ca-bc0c-1459bf48aa31)

### Product Listing: 
Allows sellers to create new listings with attributes such as title, price, and images.

![Screenshot (161)](https://github.com/user-attachments/assets/a5e8ed33-3750-40ab-b13a-e89adb6182be)

![image](https://github.com/user-attachments/assets/0151fb6c-06d6-447d-9703-88365435328d)

### Dynamic Listings:
Automatically updates the homepage with real-time product data fetched from Firestore.

![Screenshot (166)](https://github.com/user-attachments/assets/dec33a1c-9a63-46a8-a00d-fc6f2981ab10)


### User Authentication: 
Provides secure login and signup options using Firebase.

![Screenshot (159)](https://github.com/user-attachments/assets/d85c097f-a002-4b40-839b-db5182300100)

### Details Page:
Offers an in-depth view of each product, including seller details and location.

![Screenshot (164)](https://github.com/user-attachments/assets/455644cd-2ef2-4b05-8239-fdfe3f923dcb)


## Future Enhancements
- **AI Recommendations:** Suggest products based on user preferences.
- **In-App Chat:** Enable direct communication between buyers and sellers.
- **Advanced Analytics:** Provide sellers with insights on product views and engagement.
- **Multi-Language Support:** Expand accessibility with language localization.

## Contributing
We welcome contributions to enhance the platform. To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your message"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## Acknowledgments
- **Firebase:** For seamless backend and authentication solutions.
- **React.js:** For building a dynamic and user-friendly interface.
- **Tailwind CSS:** For rapid UI development with consistent styling.

---
For any questions or support, feel free to contact us at [support@resellingwebsite.com](mailto:ssanthosh0289@gmail.com).


