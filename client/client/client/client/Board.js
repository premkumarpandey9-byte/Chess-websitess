import { Chess } from "https://cdn.skypack.dev/chess.js";

export function renderBoard(container, fen, onMove) {
  container.innerHTML = "";
  const chess = new Chess(fen);
  const board = chess.board();

  let selected = null;

  board.forEach((row, r) => {
    row.forEach((square, c) => {
      const div = document.createElement("div");
      div.className = (r + c) % 2 === 0 ? "light" : "dark";
      if (square) {
        div.textContent = pieceUnicode(square);
      }
      div.addEventListener("click", () => {
        if (selected) {
          onMove(selected, coord(r, c));
          selected = null;
        } else {
          selected = coord(r, c);
        }
      });
      container.appendChild(div);
    });
  });
}

function coord(r, c) {
  return "abcdefgh"[c] + (8 - r);
}

function pieceUnicode(p) {
  const map = {
    p: "♟", r: "♜", n: "♞", b: "♝", q: "♛", k: "♚",
    P: "♙", R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔"
  };
  return map[p.type === p.type.toLowerCase() ? p.type : p.type.toUpperCase()];
}
