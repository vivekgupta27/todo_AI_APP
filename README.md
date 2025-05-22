# 📝 Todo App with AI+Slack Integration

A responsive and minimalist Todo app built with **React.js** and **Context API**, featuring:

- ✅ Task creation, editing, deletion, and completion toggle  
- 📦 Backend connectivity for CRUD operations  
- 📊 "Get Summary" feature that sends your todo list summary to **Slack**
- 🔔 Toast notifications for smooth feedback  
- 📱 Fully responsive design

---

## ✨ Features

- **Add New Tasks:** Type and submit tasks using a sleek form
- **Edit Tasks:** Click the edit icon to update a task
- **Delete Tasks:** Instantly remove a task
- **Mark as Done:** Use the checkbox to toggle completed status
- **Slack Summary:** Click the "Get Summary" button to send your current todo list to a Slack channel
- **Real-Time Feedback:** Toast messages show success/failure for every action
- **Responsive Design:** Works smoothly on mobile, tablet, and desktop

---

## 🔧 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Context API
- **Backend:** Node.js, Express.js, SupaBase (not included in this repo)
- **Third-party Libraries:** 
  - `react-icons`
  - `react-toastify`
  - `axios`

---




---

## 📦 Backend Setup

This project assumes you have a backend that provides routes like:

- `POST /add-todo`
- `PATCH /update-todo/:id`
- `DELETE /delete-todo/:id`
- `GET /all-todos`
- `POST /summarize` → Sends summary to Slack

Ensure your backend supports these APIs and CORS.

---

## 📸 Screenshots


![Screenshot 2025-05-22 183541](https://github.com/user-attachments/assets/23c12b6b-f96c-4a91-ba0b-07c6bf5a137f)
![Screenshot 2025-05-22 183602](https://github.com/user-attachments/assets/b75291b6-f4c7-48f6-b749-0779315b430a)
![Screenshot 2025-05-22 183630](https://github.com/user-attachments/assets/63940523-f259-4c7b-94df-297f90d526e5)

---

## 🧩 Folder Structure

```
src/
│
├── components/
│   ├── TODOList.jsx
│   ├── Form.jsx
│   └── BtnSummary.jsx
│
├── context/
│   └── TodoContext.jsx
│
├── App.jsx
└── main.jsx
```

---


## 🙋‍♂️ Author

Made with ❤️ by Vivek Gupta

---
