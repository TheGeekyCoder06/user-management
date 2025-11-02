# User Management System

A simple and elegant **User Management System** built using **Next.js 16**, **Mongoose**, and **Zod**, featuring a beautiful and responsive UI powered by **Shadcn UI**.

This app allows users to perform all basic **CRUD (Create, Read, Update, Delete)** operations efficiently with form validation and real-time updates.

---

## Features

- Add, edit, and delete users  
- Display all users from MongoDB in real-time  
- Form validation using **Zod**  
- Data stored securely with **Mongoose**  
- Clean and modular code structure  
- Modern UI using **Shadcn UI** components  
- Built with **Next.js 16 App Router**

---

## Tech Stack

| Technology | Purpose |
|-------------|----------|
| **Next.js 16** | Frontend framework |
| **Mongoose** | MongoDB ODM for schema-based data management |
| **Zod** | Schema validation for forms |
| **Shadcn UI** | Modern UI components |
| **MongoDB Atlas** | Cloud-based database |
| **Vercel** | Deployment platform |

---

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/user-management.git
   cd user-management

## Install Dependencies

```bash
npm install
Setup Environment Variables
Create a .env.local file in the root of your project and add the following:

env
Copy code
MONGODB_URI=your-mongodb-connection-url
Make sure .env.local is listed in your .gitignore file so it doesn’t get pushed to GitHub.

lua
Copy code
.env.local
Run the Development Server
bash
Copy code
npm run dev
Once the server starts, open:

arduino
Copy code
http://localhost:3000
CRUD Functionalities
Feature	Description
Create	Add new user details to MongoDB
Read	View all users fetched from MongoDB
Update	Edit user details
Delete	Remove user from MongoDB

Validation with Zod
Zod ensures:

Proper email format

Non-empty name and email fields

Input constraints before submission

Deployment (Vercel)
Push your code to GitHub.

Connect your GitHub repo to Vercel.

Add your environment variable (MONGODB_URI) in Vercel’s dashboard under Project Settings → Environment Variables.

Deploy — your app will be live in a few seconds.

Tech Stack
Technology	Purpose
Next.js 16	Frontend framework
Mongoose	MongoDB schema management
Zod	Form validation
Shadcn UI	Prebuilt UI components
MongoDB Atlas	Cloud database
Vercel	Deployment

Author
Harshith M
mharshith200@gmail.com

License
MIT License







