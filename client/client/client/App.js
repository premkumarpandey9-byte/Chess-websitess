import { renderBoard } from "./Board.js";

export default function App() {
  const socket = io();
  const roomId = prompt("Enter a game room name:") || "default";
  socket.emit("joinGame", roomId);

  const boardEl = document.createElement("div");
  boardEl.className = "board";
  document.getElementById("root").appendChild(boardEl);

  let currentFen = "";

  socket.on("initBoard", (fen) => {
    currentFen = fen;
    renderBoard(boardEl, fen, (from, to) => {
      socket.emit("move", { roomId, move: { from, to } });
    });
  });

  socket.on("moveMade", ({ fen }) => {
    currentFen = fen;
    renderBoard(boardEl, fen, (from, to) => {
      socket.emit("move", { roomId, move: { from, to } });
    });
  });

  socket.on("startGame", (msg) => alert(msg));
  socket.on("gameOver", (msg) => alert("Game Over: " + msg.reason));
            }
