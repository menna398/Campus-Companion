# 🎓 Campus Companion

> Your academic journey, beautifully organized.

Campus Companion is a full-stack web app that helps students manage their university life in one place: courses, weekly schedule, assignments, exams, notes, and campus events, all tied together by a personal dashboard.

**Live demo:** https://campus-companion-blush.vercel.app
**API:** https://campus-companion-back.vercel.app/api/health

---

## ✨ Features

- **Authentication**: register, login, and logout with JWT. Every student only sees their own data.
- **Dashboard**: today's classes, upcoming assignments and exams, course progress, upcoming events, and an academic snapshot (GPA, semester progress, assignments done).
- **Courses**: add and edit courses with professor, location, color, and weekly time. The schedule is generated from the course data.
- **Schedule**: weekly timetable synced automatically with the courses.
- **Assignments**: track due dates, priority, and completion per course.
- **Exams**: upcoming exams with date, time, and live status (upcoming / pending grade).
- **Notes**: notebooks per course, full-text search, and a rich note view with sections and code blocks.
- **Events**: browse campus events by category, add new events, delete events, always sorted by date.
- **Profile**: personal and academic info (university, college, GPA), your courses, logout, and delete account.

---

## 🧰 Tech Stack

**Frontend**

- React + Vite
- Tailwind CSS
- React Router
- Zustand (state management)
- Axios
- React Hook Form + Zod (form validation)
- SweetAlert2 and react-hot-toast (feedback)
- lucide-react (icons)

**Backend**

- Node.js + Express
- MongoDB + Mongoose
- JWT authentication + bcryptjs
- CORS, morgan, dotenv

---

## ☁️ Deployment

**Backend (Vercel + MongoDB Atlas)**

1. Add the backend environment variables in the Vercel project settings.
2. In MongoDB Atlas, allow network access from Vercel (`0.0.0.0/0`).
3. Add the frontend URL to `CLIENT_URL` (or to the allowed origins in `server.js`).

**Frontend (Vercel)**

1. Set `VITE_API_URL` to the deployed backend URL, ending with `/api`.
2. Redeploy, because Vite reads environment variables at build time.

> File names are case-sensitive on Vercel (Linux). Make sure every import matches the file name exactly, e.g. `dashboardStore.js`, not `Dashboardstore.js`.

---

## 🖼️ Screenshots

<img width="1917" height="988" alt="image" src="https://github.com/user-attachments/assets/0f105dec-04b2-4640-a03f-e0d9a83ead7a" />


---

## 👩‍💻 Author

**Menna Khaled**: [@menna398](https://github.com/menna398)

---

