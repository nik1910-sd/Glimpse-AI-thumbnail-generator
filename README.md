# 📸 Glimpse: AI-Powered Thumbnail Generator

**Glimpse** is a professional full-stack  platform designed for content creators to generate high-conversion thumbnails using Generative AI. It features a unique **Live Preview System** that injects generated thumbnails into a simulated YouTube homepage mockup, allowing creators to test their "click-through rate" potential in a real-world environment.

---

## 🔗 Live Demo
**Check it out here:** [https://glimpse-umber.vercel.app/](https://glimpse-umber.vercel.app/)

---

## 📍 Table of Contents

* [🌟 Key Features](#-key-features)
* [🛠️ Tech Stack](#️-tech-stack)
* [🧠 Technical Implementation](#-technical-implementation)
* [🚀 Installation & Setup](#-installation--local-setup)
* [👨‍💻 About the Developer](#-about-the-developer)

---

## 🌟 Key Features

### 1. AI-Powered Generation
Generate high-quality, context-aware thumbnails using the **Google Gemini API**. Simply enter your video title and style preferences, and the AI handles the rest.
> *<img width="1919" height="874" alt="Screenshot 2026-01-22 132654" src="https://github.com/user-attachments/assets/6d56aa79-b47d-477c-8318-56ed55fdfecc" />*

### 2. Live YouTube Preview (The "Glimpse" Feature)
Our standout feature. Before downloading, see exactly how your thumbnail looks on a real YouTube homepage mockup. Test visibility against "competitors" in real-time.
> *<img width="1919" height="879" alt="Screenshot 2026-01-22 132730" src="https://github.com/user-attachments/assets/ffcf1820-0a46-43c6-a736-99557b75e349" />* 

### 3. Personal Generation Gallery
A sleek, dark-themed dashboard to manage all your past designs. View, download, or delete your creations with a single click—optimized for both desktop and mobile.
> *<img width="1919" height="937" alt="Screenshot 2026-01-22 132711" src="https://github.com/user-attachments/assets/58b4299d-3c66-4939-8a98-f1fdd22c26c8" />*

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React.js, Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas |
| **AI Engine** | Google Gemini API (Generative AI) |
| **Storage** | Cloudinary API (Image Hosting) |
| **Deployment** | Vercel (Frontend), Vercel (Backend) |

---

## 🧠 Technical Implementation

### 1. AI Prompt Engineering Workflow
I implemented a **Prompt Refinement Layer** to ensure high-quality outputs. The system wraps user input (e.g., "Java Tutorial") into a specialized system prompt:
* **Refined Output:** "Generate a high-contrast, professional YouTube thumbnail for a Java tutorial. Focus: Code on a monitor, neon lighting, cinematic atmosphere, bold typography space."

### 2. System Architecture & Data Flow


1. **Request:** React frontend hits the Express backend.
2. **Generation:** Backend calls **Google Gemini API** for image creation.
3. **Storage:** Image stream is piped to **Cloudinary** for CDN delivery.
4. **Persistence:** The Cloudinary URL is indexed in **MongoDB Atlas**.

---

## 🚀 Installation & Local Setup

### 1. Clone the Project
```bash
git clone https://github.com/nik1910-sd/Glimpse-AI-thumbnail-generator.git
cd glimpse
```
## 2. Environment Configuration

To run this project locally, create a `.env` file in the `/server` directory and add your credentials:

```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
CLOUDINARY_url=your_cloudinary_url
SESSION_SECRET=your_password
```

## Run the Backend
```bash
cd server
npm install
npm run server
```
## Run the Frontend
```bash
# Open a new terminal window
cd client
npm install
npm run dev
```
## 👨‍💻 About the Developer  

**Nikhil Kumar**  
B.Tech in Robotics & AI | Class of 2026  
Punjab Technical University  

Passionate about full-stack development and the intersection of AI with user experience.

**LinkedIn:** [https://www.linkedin.com/in/nikhil-kumar-5a1584223]  
 

---

Built with 🖤 for the Creator Community.
