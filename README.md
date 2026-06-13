# 🎮 XO-Game

A turn-based X-O game with persistent game history, built with React + TypeScript and backed by json-server.

---

## 🛠 Tech Stack

| Layer            | Technology                |
| ---------------- | ------------------------- |
| Frontend         | React (Vite) + TypeScript |
| Styling          | Tailwind CSS              |
| Backend          | json-server               |
| Testing          | Vitest                    |
| Containerization | Docker + Docker Compose   |

---

## ✨ Features

- **Persistent History**: Game results are saved and retrieved from a JSON database.
- **Full Dockerization**: Easy setup for both frontend and backend with a single command.
- **Unit Tested**: Core game logic covered with Vitest.

---

## 🚀 Getting Started

**1. Clone the repository:**

```bash
git clone https://github.com/ahmedzaki-me/enexabit-task-unit-testing-docker
```

**2. Start the app:**

```bash
cd enexabit-task-unit-testing-docker
docker-compose up --build
```

| Service         | URL                   |
| --------------- | --------------------- |
| React App       | http://localhost:80   |
| json-server API | http://localhost:3001 |

---

## 🧪 Tests

```bash
npm install
npm run test
```
