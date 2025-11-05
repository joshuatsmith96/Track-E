# Track-E: Your Next Lightweight "Trello-like" Project Manager

## 🚀 Overview
**Track-E** is a full-stack project built to offer a streamlined, board-based experience similar to Trello. Users can create multiple boards, and within those boards, they can organize their tasks using multiple lists. It’s the perfect place to keep your projects... well, on track.

## 🛠️ Tech Stack
This project uses the MERN stack:

* **Frontend:** **React** and **TypeScript**
* **Backend:** **Node.js** and **Express**
* **Database:** **MongoDB**
* **Auth:** **Clerk**

This structure ensures a **full-stack** application where every component is typed and ready for action!

## 💾 Core Features (The CRUD of It All)
The application performs standard **CRUD** (Create, Read, Update, Delete) operations, allowing users to:

* **Create** new boards and lists.
* **Read/View** their existing boards and lists.
* **Update/Edit** the names and contents of boards and lists.
* **Delete** boards and lists when they are no longer needed.

## ✨ Key Feature: Customizable Dashboard
A highlight of this project is the newly developed **Dashboard component** developed by me. This Dashboard is open for others to use, and features a fully customizable config file. No need to adjust the code unless you need to.

Instead of digging through component files, you can adjust the appearance, navigation links, and even plug in extra components (`slot1`, `slot2`) directly via the `dashConfig.ts` file.

* **Check out the configuration snippet below to see what's possible:**

```typescript
export const dashConfig: DashConfigType = {
  dashboardName: "Track-E", // Currently "Track-E"
  dashboardIcon: Logo,
  styles: {
    titleColor: "white",
    menuBg: "rgba(32, 32, 32, 1)",
    // ... many more style options
  },
  links: [
    { name: "My Boards", to: "/", icon: DashboardIcon },
  ],
  slot1?: ComponentType<any>, // Ready for your custom components!
};
````

## ✅ Code Quality

To keep the codebase clean and error-free (because nobody likes bugs), **ESLint** has been strictly enforced across the project. This ensures a consistent style and catches potential errors before they become headaches. You're welcome.

-----

## ⚙️ Project Setup

To get Track-E up and running, you'll need to set up a MongoDB cluster and configure the required environment variables.

### 1\. MongoDB Configuration

  * You must **set up a MongoDB cluster** (e.g., using MongoDB Atlas) to provide a database URI.
  * The application cannot run without a valid connection string.

### 2\. Environment Variables

Create `.env` files in both your frontend and backend directories and populate them using the structure provided below.

| File | Variable | Description |
| :--- | :--- | :--- |
| **Frontend (.env)** | `VITE_CLERK_PUBLISHABLE_KEY` | Your public Clerk key for client-side authentication. |
| | `VITE_API_URL` | The endpoint for your running backend (e.g., `http://localhost:5000`). |
| **Backend (.env)** | `PORT` | The port the Node/Express server will listen on (e.g., `5000`). |
| | `MONGO_URI` | The connection string for your MongoDB cluster. |
| | `CLERK_PUBLISHABLE_KEY` | Your public Clerk key. |
| | `CLERK_JWT_KEY` | The secret key required for backend JWT verification. |
| | `AUTHORIZED_PARTIES` | A comma-separated list of front-end URLs allowed to communicate with the backend. |

#### **`.env.example` Snippet for Reference:**

**Front-End `.env`:**

```dotenv
VITE_CLERK_PUBLISHABLE_KEY=pk_test_asdfasdfasdf
VITE_API_URL=API_ENDPOINT_HERE
```

**Back-End `.env`:**

```dotenv
PORT=5000
MONGO_URI=mongodbURI
CLERK_PUBLISHABLE_KEY=pk_test_yourkeyhere
CLERK_JWT_KEY=""
AUTHORIZED_PARTIES=http://localhost:5173,[https://testing.joshuasportfolio.org](https://testing.joshuasportfolio.org)
```
