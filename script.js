/**
 * Chess Game Logic
 * Handles game state, move validation, and UI rendering.
 */

// --- Constants & Assets ---

const PIECES = {
    w: {
        p: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" /></svg>',
        n: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" /><path d="M24 18c.38 2.32-4.68 1.97-5 0 0-3.5 3-7 5-7 2.5 0 2.83 2.5 2.71 4.5L20.5 21c-1.5-5.5-10-6-11 3V28h4.29c1.71 0 2.71.5 2.71 1.5S15.29 31 13.57 31H6v4h33v-4H28.57c-1.71 0-2.71-.5-2.71-1.5s1-1.5 2.71-1.5H33V19c0-5-4-9-11-9z" fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" /></svg>',
        b: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 36c3.39-.47 5.5-2 5.5-5.43 0-3.87-2.7-5.1-4.5-7.43C8.5 21.5 9 19 14 12c0 0 1-1 2-1 .89 0 1.48.6 2 1 1.38 1.08 3.5 3 3.5 6 0 1.63-.69 3-1.5 4 2.5 1.5 6 2.5 6 6 0 3.43 2.11 4.96 5.5 5.43" /><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" /></g></svg>',
        r: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" stroke-linecap="butt" /><path d="M34 14l-3 3H14l-3-3" /><path d="M31 17v12.5c0 2.76-2.24 5-5 5h-7c-2.76 0-5-2.24-5-5V17" /><path d="M31 29.5l1.5 2.5h-20l1.5-2.5" /><path d="M11 14h23" fill="none" stroke-linejoin="miter" /></g></svg>',
        q: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM10.5 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM38.5 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0z" /><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11zM9 26c0 2 1.5 2 2.5 4 1 2.5 1 4.5 1 4.5s6-2 10-2 10 2 10 2 0-2 1-4.5c1-2 2.5-2 2.5-4-9 2-18 2-27 0z" stroke-linecap="butt" /><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" /></g></svg>',
        k: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#fff" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5" stroke-linejoin="miter" /><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#fff" stroke-linecap="butt" /><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 2-8 2s-4-1-9-1-5 0-8-2S2 23.5 6 29.5c-3 6 6 10.5 6 10.5v7z" /><path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" fill="none" /></g></svg>'
    },
    b: {
        p: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z" fill="#111" stroke="#fff" stroke-width="1.5" stroke-linecap="round" /></svg>',
        n: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><path d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21" fill="#111" stroke="#fff" stroke-width="1.5" stroke-linecap="round" /><path d="M24 18c.38 2.32-4.68 1.97-5 0 0-3.5 3-7 5-7 2.5 0 2.83 2.5 2.71 4.5L20.5 21c-1.5-5.5-10-6-11 3V28h4.29c1.71 0 2.71.5 2.71 1.5S15.29 31 13.57 31H6v4h33v-4H28.57c-1.71 0-2.71-.5-2.71-1.5s1-1.5 2.71-1.5H33V19c0-5-4-9-11-9z" fill="#111" stroke="#fff" stroke-width="1.5" stroke-linecap="round" /></svg>',
        b: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#111" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 36c3.39-.47 5.5-2 5.5-5.43 0-3.87-2.7-5.1-4.5-7.43C8.5 21.5 9 19 14 12c0 0 1-1 2-1 .89 0 1.48.6 2 1 1.38 1.08 3.5 3 3.5 6 0 1.63-.69 3-1.5 4 2.5 1.5 6 2.5 6 6 0 3.43 2.11 4.96 5.5 5.43" /><path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2zM25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 1 1 5 0z" /></g></svg>',
        r: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#111" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" stroke-linecap="butt" /><path d="M34 14l-3 3H14l-3-3" /><path d="M31 17v12.5c0 2.76-2.24 5-5 5h-7c-2.76 0-5-2.24-5-5V17" /><path d="M31 29.5l1.5 2.5h-20l1.5-2.5" /><path d="M11 14h23" fill="none" stroke-linejoin="miter" /></g></svg>',
        q: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#111" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM24.5 7.5a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM41 12a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM10.5 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0zM38.5 20a2 2 0 1 1-4 0 2 2 0 1 1 4 0z" /><path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25l-7-11zM9 26c0 2 1.5 2 2.5 4 1 2.5 1 4.5 1 4.5s6-2 10-2 10 2 10 2 0-2 1-4.5c1-2 2.5-2 2.5-4-9 2-18 2-27 0z" stroke-linecap="butt" /><path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" /></g></svg>',
        k: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#111" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22.5 11.63V6M20 8h5" stroke-linejoin="miter" /><path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill="#111" stroke-linecap="butt" /><path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 2-8 2s-4-1-9-1-5 0-8-2S2 23.5 6 29.5c-3 6 6 10.5 6 10.5v7z" /><path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" fill="none" /></g></svg>'
    }
};

const INITIAL_BOARD = [
    ['br', 'bn', 'bb', 'bq', 'bk', 'bb', 'bn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wn', 'wb', 'wq', 'wk', 'wb', 'wn', 'wr']
];

// --- State Management ---

let gameState = {
    board: JSON.parse(JSON.stringify(INITIAL_BOARD)),
    turn: 'w', // 'w' or 'b'
    selectedSquare: null,
    possibleMoves: [],
    castling: { w: { k: true, q: true }, b: { k: true, q: true } },
    enPassant: null, // Target square for en passant capture (e.g., [2, 3])
    history: [],
    gameOver: false
};

// --- DOM Elements ---

const boardElement = document.getElementById('chessBoard');
const turnIndicator = document.getElementById('turnIndicator');
const turnText = document.getElementById('turnText');
const statusMessage = document.getElementById('statusMessage');
const undoBtn = document.getElementById('undoBtn');
const resetBtn = document.getElementById('resetBtn');
const promotionModal = document.getElementById('promotionModal');
const promotionOptions = document.getElementById('promotionOptions');

// --- Initialization ---

function init() {
    loadGame();
    renderBoard();
    updateUI();

    undoBtn.addEventListener('click', undoMove);
    resetBtn.addEventListener('click', resetGame);
}

// --- Game Logic ---

function getPiece(row, col) {
    if (row < 0 || row > 7 || col < 0 || col > 7) return null;
    return gameState.board[row][col];
}

function isEnemy(piece, color) {
    return piece && piece !== '' && piece[0] !== color;
}

function isFriendly(piece, color) {
    return piece && piece !== '' && piece[0] === color;
}

function getPossibleMoves(row, col, checkCheck = true) {
    const piece = gameState.board[row][col];
    if (!piece) return [];

    const color = piece[0];
    const type = piece[1];
    let moves = [];

    // Helper to add move if valid
    const addMove = (r, c) => {
        if (r >= 0 && r < 8 && c >= 0 && c < 8) {
            const target = gameState.board[r][c];
            if (!isFriendly(target, color)) {
                moves.push({ r, c });
                return !!target; // Stop sliding if hit piece
            }
            return true; // Stop sliding if hit friendly
        }
        return true; // Stop sliding if out of bounds
    };

    if (type === 'p') {
        const dir = color === 'w' ? -1 : 1;
        const startRow = color === 'w' ? 6 : 1;

        // Move forward 1
        if (!getPiece(row + dir, col)) {
            moves.push({ r: row + dir, c: col });
            // Move forward 2
            if (row === startRow && !getPiece(row + dir * 2, col)) {
                moves.push({ r: row + dir * 2, c: col, isDouble: true });
            }
        }

        // Captures
        [[dir, -1], [dir, 1]].forEach(([dr, dc]) => {
            const tr = row + dr, tc = col + dc;
            if (isEnemy(getPiece(tr, tc), color)) {
                moves.push({ r: tr, c: tc });
            }
            // En Passant
            if (gameState.enPassant && gameState.enPassant.r === tr && gameState.enPassant.c === tc) {
                moves.push({ r: tr, c: tc, isEnPassant: true });
            }
        });
    } else if (type === 'n') {
        const offsets = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
        offsets.forEach(([dr, dc]) => addMove(row + dr, col + dc));
    } else if (type === 'k') {
        const offsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
        offsets.forEach(([dr, dc]) => addMove(row + dr, col + dc));

        // Castling
        if (checkCheck && !isSquareAttacked(row, col, color)) {
            if (gameState.castling[color].k && !getPiece(row, 5) && !getPiece(row, 6)) {
                if (!isSquareAttacked(row, 5, color) && !isSquareAttacked(row, 6, color)) {
                    moves.push({ r: row, c: 6, isCastling: 'k' });
                }
            }
            if (gameState.castling[color].q && !getPiece(row, 3) && !getPiece(row, 2) && !getPiece(row, 1)) {
                if (!isSquareAttacked(row, 3, color) && !isSquareAttacked(row, 2, color)) { // Square 1 doesn't need check check
                    moves.push({ r: row, c: 2, isCastling: 'q' });
                }
            }
        }
    } else {
        // Sliding pieces (b, r, q)
        const dirs = {
            b: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
            r: [[-1, 0], [1, 0], [0, -1], [0, 1]],
            q: [[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]]
        }[type];

        dirs.forEach(([dr, dc]) => {
            let r = row + dr, c = col + dc;
            while (r >= 0 && r < 8 && c >= 0 && c < 8) {
                const target = gameState.board[r][c];
                if (isFriendly(target, color)) break;
                moves.push({ r, c });
                if (target) break; // Capture
                r += dr;
                c += dc;
            }
        });
    }

    if (checkCheck) {
        // Filter moves that leave king in check
        moves = moves.filter(move => {
            const tempState = cloneState(gameState);
            applyMove(tempState, { r: row, c: col }, move);
            return !isInCheck(tempState, color);
        });
    }

    return moves;
}

function isSquareAttacked(r, c, color) {
    // Check if square (r, c) is attacked by enemy of 'color'
    const enemyColor = color === 'w' ? 'b' : 'w';
    // Inefficient but simple: generate all enemy moves
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const piece = gameState.board[i][j];
            if (isFriendly(piece, enemyColor)) {
                const moves = getPossibleMoves(i, j, false); // Don't recurse
                if (moves.some(m => m.r === r && m.c === c)) return true;
            }
        }
    }
    return false;
}

function isInCheck(state, color) {
    // Find king
    let kr, kc;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (state.board[i][j] === color + 'k') {
                kr = i; kc = j;
                break;
            }
        }
    }
    // Temporarily swap global state to use isSquareAttacked (hacky but works for static)
    const originalBoard = gameState.board;
    gameState.board = state.board;
    const result = isSquareAttacked(kr, kc, color);
    gameState.board = originalBoard;
    return result;
}

function cloneState(state) {
    return {
        board: JSON.parse(JSON.stringify(state.board)),
        turn: state.turn,
        castling: JSON.parse(JSON.stringify(state.castling)),
        enPassant: state.enPassant ? { ...state.enPassant } : null
    };
}

function applyMove(state, from, to) {
    const piece = state.board[from.r][from.c];
    const color = piece[0];
    const type = piece[1];

    // Move piece
    state.board[to.r][to.c] = piece;
    state.board[from.r][from.c] = '';

    // En Passant Capture
    if (to.isEnPassant) {
        const dir = color === 'w' ? 1 : -1; // Capture pawn behind
        state.board[to.r + dir][to.c] = '';
    }

    // Castling Move Rook
    if (to.isCastling) {
        const row = from.r;
        if (to.isCastling === 'k') {
            state.board[row][5] = state.board[row][7];
            state.board[row][7] = '';
        } else {
            state.board[row][3] = state.board[row][0];
            state.board[row][0] = '';
        }
    }

    // Update Castling Rights
    if (type === 'k') {
        state.castling[color].k = false;
        state.castling[color].q = false;
    } else if (type === 'r') {
        if (from.c === 0) state.castling[color].q = false;
        if (from.c === 7) state.castling[color].k = false;
    }
    // If rook is captured
    if (to.r === 0 || to.r === 7) {
        if (to.c === 0) {
            const c = to.r === 0 ? 'b' : 'w'; // This logic is slightly off for captured rook color, but simplified:
            // If a corner is target, disable castling for that corner's owner
            if (to.r === 0) state.castling.b.q = false;
            if (to.r === 7) state.castling.w.q = false;
        }
        if (to.c === 7) {
            if (to.r === 0) state.castling.b.k = false;
            if (to.r === 7) state.castling.w.k = false;
        }
    }

    // Update En Passant
    if (to.isDouble) {
        state.enPassant = { r: (from.r + to.r) / 2, c: from.c };
    } else {
        state.enPassant = null;
    }

    // Promotion (handled in UI, but logic here assumes auto-queen for check check)
    // Real promotion happens in executeMove
}

function executeMove(from, to) {
    console.log('Executing move', from, to);
    // Save history
    gameState.history.push(JSON.stringify({
        board: gameState.board,
        turn: gameState.turn,
        castling: gameState.castling,
        enPassant: gameState.enPassant
    }));

    const piece = gameState.board[from.r][from.c];

    // Handle Promotion
    if (piece[1] === 'p' && (to.r === 0 || to.r === 7)) {
        showPromotionModal(from, to, piece[0]);
        return;
    }

    applyMove(gameState, from, to);
    endTurn();
}

function endTurn() {
    console.log('Ending turn. Current:', gameState.turn);
    gameState.turn = gameState.turn === 'w' ? 'b' : 'w';
    console.log('New turn:', gameState.turn);
    gameState.selectedSquare = null;
    gameState.possibleMoves = [];

    // Check Game Over
    if (isGameOver()) {
        gameState.gameOver = true;
    }

    saveGame();
    renderBoard();
    updateUI();
}

function saveGame() {
    console.log('Saving game. Turn:', gameState.turn);
    localStorage.setItem('chessGameState', JSON.stringify({
        board: gameState.board,
        turn: gameState.turn,
        castling: gameState.castling,
        enPassant: gameState.enPassant,
        history: gameState.history,
        gameOver: gameState.gameOver
    }));
}

function isGameOver() {
    // Check if current player has any moves
    let hasMoves = false;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (isFriendly(gameState.board[i][j], gameState.turn)) {
                if (getPossibleMoves(i, j).length > 0) {
                    hasMoves = true;
                    break;
                }
            }
        }
        if (hasMoves) break;
    }

    if (!hasMoves) {
        if (isInCheck(gameState, gameState.turn)) {
            statusMessage.textContent = `Checkmate! ${gameState.turn === 'w' ? 'Black' : 'White'} wins!`;
        } else {
            statusMessage.textContent = "Stalemate! Draw.";
        }
        return true;
    }

    if (isInCheck(gameState, gameState.turn)) {
        statusMessage.textContent = "Check!";
    } else {
        statusMessage.textContent = "";
    }

    return false;
}

// --- UI Interaction ---

function handleSquareClick(row, col) {
    if (gameState.gameOver) return;

    const piece = gameState.board[row][col];
    const isSelected = gameState.selectedSquare && gameState.selectedSquare.r === row && gameState.selectedSquare.c === col;

    // If clicking a possible move
    const move = gameState.possibleMoves.find(m => m.r === row && m.c === col);
    if (move) {
        executeMove(gameState.selectedSquare, move);
        return;
    }

    // Select piece
    if (isFriendly(piece, gameState.turn)) {
        if (isSelected) {
            gameState.selectedSquare = null;
            gameState.possibleMoves = [];
        } else {
            gameState.selectedSquare = { r: row, c: col };
            gameState.possibleMoves = getPossibleMoves(row, col);
        }
        renderBoard();
    } else {
        gameState.selectedSquare = null;
        gameState.possibleMoves = [];
        renderBoard();
    }
}

function showPromotionModal(from, to, color) {
    promotionOptions.innerHTML = '';
    ['q', 'r', 'b', 'n'].forEach(type => {
        const div = document.createElement('div');
        div.className = 'promotion-piece';
        div.innerHTML = PIECES[color][type];
        div.onclick = () => {
            applyMove(gameState, from, to);
            gameState.board[to.r][to.c] = color + type; // Promote
            promotionModal.classList.add('hidden');
            endTurn();
        };
        promotionOptions.appendChild(div);
    });
    promotionModal.classList.remove('hidden');
}

function undoMove() {
    if (gameState.history.length === 0) return;
    const previousState = JSON.parse(gameState.history.pop());
    gameState.board = previousState.board;
    gameState.turn = previousState.turn;
    gameState.castling = previousState.castling;
    gameState.enPassant = previousState.enPassant;
    gameState.gameOver = false;
    gameState.selectedSquare = null;
    gameState.possibleMoves = [];
    statusMessage.textContent = "";

    saveGame();
    renderBoard();
    updateUI();
}

function resetGame() {
    if (!confirm("Are you sure you want to start a new game?")) return;
    localStorage.removeItem('chessGameState');
    gameState = {
        board: JSON.parse(JSON.stringify(INITIAL_BOARD)),
        turn: 'w',
        selectedSquare: null,
        possibleMoves: [],
        castling: { w: { k: true, q: true }, b: { k: true, q: true } },
        enPassant: null,
        history: [],
        gameOver: false
    };
    saveGame();
    renderBoard();
    updateUI();
}

// --- Rendering ---

function renderBoard() {
    boardElement.innerHTML = '';

    // Check check status for rendering
    let kingInCheck = null;
    if (isInCheck(gameState, gameState.turn)) {
        // Find king
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (gameState.board[i][j] === gameState.turn + 'k') {
                    kingInCheck = { r: i, c: j };
                }
            }
        }
    }

    // Last move highlight
    let lastMoveStart, lastMoveEnd;
    if (gameState.history.length > 0) {
        // We don't store move coords explicitly in history, but we could infer or store them.
        // For simplicity, let's skip last move highlight for now or implement it later if needed.
        // Actually, let's store it in history? No, history stores full state.
        // Let's just skip for now to keep it simple.
    }

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            const isLight = (i + j) % 2 === 0;
            square.className = `square ${isLight ? 'light' : 'dark'}`;

            // Selection
            if (gameState.selectedSquare && gameState.selectedSquare.r === i && gameState.selectedSquare.c === j) {
                square.classList.add('selected');
            }

            // Possible Moves
            if (gameState.possibleMoves.some(m => m.r === i && m.c === j)) {
                square.classList.add('highlight');
            }

            // Check
            if (kingInCheck && kingInCheck.r === i && kingInCheck.c === j) {
                square.classList.add('check');
            }

            // Piece
            const pieceCode = gameState.board[i][j];
            if (pieceCode) {
                const color = pieceCode[0];
                const type = pieceCode[1];
                const pieceDiv = document.createElement('div');
                pieceDiv.className = 'piece';
                pieceDiv.innerHTML = PIECES[color][type];
                square.appendChild(pieceDiv);
            }

            square.onclick = () => handleSquareClick(i, j);
            boardElement.appendChild(square);
        }
    }
}

function updateUI() {
    turnIndicator.className = 'turn-indicator'; // Reset
    const dot = turnIndicator.querySelector('.turn-dot');

    if (gameState.turn === 'w') {
        turnText.textContent = "White's Turn";
        dot.classList.remove('black');
    } else {
        turnText.textContent = "Black's Turn";
        dot.classList.add('black');
    }

    undoBtn.disabled = gameState.history.length === 0;
}

// --- Persistence ---

function saveGame() {
    localStorage.setItem('chessGameState', JSON.stringify({
        board: gameState.board,
        turn: gameState.turn,
        castling: gameState.castling,
        enPassant: gameState.enPassant,
        history: gameState.history,
        gameOver: gameState.gameOver
    }));
}

function loadGame() {
    const saved = localStorage.getItem('chessGameState');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            gameState = { ...gameState, ...parsed };
        } catch (e) {
            console.error("Failed to load game", e);
        }
    }
}

// Start
document.addEventListener('DOMContentLoaded', () => {
    init();
});
