# ♟️ Chess Game Project

This is a full-featured web-based chess game developed using **Nextjs**, **TypeScript**, **Tailwind CSS**, and **Go** for the backend. It allows players to play standard chess, with full support for all legal chess moves including castling, en passant, pawn promotion, and check/checkmate detection.It supports Play with Friend mode using unique room codes that enable real-time multiplayer over WebSockets, allowing two players to join the same match from different devices. Additionally, it offers a Play with Bot mode where users can challenge an AI bots, enabling solo practice and casual play.

## 🚀 Features

- Interactive chessboard with drag-and-drop functionality (mobile and desktop support)
- Full move validation logic (written in Golang)
- Multiplayer game logic using WebSockets (optional)
- Responsive UI styled with Tailwind CSS

---

## 🛠️ Local Development Setup
```
git clone https://github.com/sinore69/chess
cd chess
docker-compose up -d
```