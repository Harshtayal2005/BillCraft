# BillCraft - Invoice Management System

![License](https://img.shields.io/badge/License-MIT-green.svg)  
Deployed on Vercel | [Visit BillCraft](https://bill-craft-by-harshtayal.vercel.app/)

---

## Overview
**BillCraft** is a full-featured, MERN-based invoicing application designed to help businesses and freelancers create and manage invoices seamlessly. It includes advanced client management, customizable templates, and user-friendly PDF and email options for invoice delivery.

---

## Features

- 🌐 **Client Management**: Easily add, view, and update client details.
- 📝 **Customizable Invoice Templates**: Choose from multiple templates to best represent your brand.
- 📄 **PDF Download & Email Functionality**: Download or email invoices directly.
- 🔒 **Secure Authentication**: Includes login/logout functionality to protect user data (Google Oauth 2.0 integrated)
- 👤 **Profile Avatar Uploader**: Allows users to personalize their profiles.
- ⚙️ **Error Handling**: Enhanced error handling for a smooth user experience.
- 💰 **Razorpay Payment Integration**: Allow users to purchase premium memberships (test only)

---

## Tech Stack

- **Frontend**: React, React Hook Form, Axios, Tailwind CSS, jspdf(for pdf downloads)
- **Backend**: Node.js, Express, MongoDB, Cloudinary (for image handling), Multer(for file handling), nodemailer(for mail handling)
- **Deployment**: Vercel (Frontend & Backend)

---

## Getting Started

---

### Prerequisites

- [npm](https://www.npmjs.com/)
- [Node.js](https://nodejs.org/)
- [React](https://reactjs.org/)
- [React-Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/Harshtayal2005/BillCraft.git
   cd BillCraft
   ```

2. **Install Dependencies**:
    Navigate to both the frontend and backend folders and install dependencies

   ```sh
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install

   #script
    "dev": "nodemon -r dotenv/config --experimental-json-modules index.js"
    "start": "node index.js"
   ```
3. **Set up environmental variables**
   Create a .env file in the backend directory
    ```sh
    MONGO_URI=your_mongo_uri
    PORT=3000
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

4. **Run the application locally**

    ```sh
    # Start the frontend
    cd frontend
    npm run dev

    # Start the backend
    cd backend
    npm run dev
    ```

---

### Usage
1. **Register/Login**:
    - Create an account or log in to access the platform.

2. **Add Clients**:
    - Add or edit client details, ready to use in invoices.

3. **Generate & Send Invoices**:
    - Choose from templates, generate PDFs, and send via email.


## Contact
- For any queries or suggestions, feel free to reach out at: harshtayal2005@gmail.com