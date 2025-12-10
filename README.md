# ⚡ Quiz App (React + Vite + JSON Server)

This is a timed quiz application built with React.  
Questions are fetched from a mock API using json-server and results are saved at the end of the quiz.

---

# 🚀 How to Run the Application

Follow these steps in order:

---

## 1️⃣ Install dependencies
Open a terminal and run:
```bash
npm install

## 2️⃣ Start backend (json-server)

Open a second terminal and navigate to the folder where api/db.json exists (root of your entire project):

json-server --watch ./api/db.json --port 4000


This will create a local API available at:

http://localhost:4000


Available endpoints:

GET /questions
POST /results

## 3️⃣ Start the frontend

Now go back to the quiz-app folder and run:

npm run dev


Then open:
http://localhost:5173/
