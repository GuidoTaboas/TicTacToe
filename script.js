
//player moves, owns tiles
//board has tiles, logic to check legal player movements
//"referee" check win/lose/tie situations
//flow: players are created. players move. check win. 

const GameBoard = (() => {
    let Board = {1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9};
    return {Board};
})()

const Display = (() => {
    const board1 = document.getElementById('board');
    const boardArr = GameBoard.Board
    const display = (GameBoard) => {
        for(let [key] of Object.entries(GameBoard)) {
            div = document.createElement('div');
            div.id = key;
            div.setAttribute('data-player', key);
            div.classList.add('tile');
            board1.appendChild(div);
        }
    }

    const resetBoard = () => {
        let  i = 1
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(item => {
            boardArr[(item.id - 1)] = i
            item.setAttribute('data-player', i)
            item.style.backgroundColor = 'transparent'
            i++
        })
    }

    const endMessage = (winner) => {
        let endMessageBox = document.getElementById('endMessage')
        if(winner === 'p1') {
            endMessageBox.innerText = `The Player ${document.getElementById('p1').innerText} won `
        } else {
            endMessageBox.innerText = `The Player ${document.getElementById('p2').innerText} won `
        }
        endMessageBox.style.visibility = 'visible'
    }

    return {resetBoard, display, endMessage}

})()

const Player = (name) => {
    return {
        name
    }
}


// en lugar de devolver, checkPlayer, estaba devolviendo currentPlayer, y evaluando abajo rules.currentPlayer
//currentPlayer se actualizaba, pero rules.currentPlayer no se actualizaba, porque?

const Rules = ((P1, P2) => {
    let currentPlayer = P1;
    let board = GameBoard.Board

    const changeTurn = () => {
        if (currentPlayer === P1){
            currentPlayer = P2;
        } else {
            currentPlayer = P1;
        } 
        return currentPlayer
    }   

    const checkPlayer = () => {
        return currentPlayer
    }

    const checkWin = () => {
       if (checkCol() || checkDia() || checkRow()) {
           return 'win'
       } 
    }

    // if every tile data-player is not in board, means every tile is occupied

    const checkRow = () => {
        if (board[0] === board[1]&&
            board[0] === board[2]) {
                return board[0];
        } else if (board[3] === board[4]&&
            board[3] === board[5]) {
                return board[3]
        } else if (board[6] === board[7]&&
            board[6] === board[8]) {
                return board[6];
        }
    }

    const checkCol = () => {
        if (board[0] === board[3]&&
            board[0] === board[6]) {
                return board[0];
        } else if (board[1] === board[4]&&
            board[1] === board[7]) {
                return board[1];
        } else if (board[2] === board[5]&&
            board[2] === board[8]) {
                return board[2];
        }
    }

    const checkDia = () => {
        if (board[0] === board[4]&&
            board[0] === board[8]) {
                return board[0];
        } else if (board[2] === board[4]&&
            board[2] === board[6]) {
                return board[2];
        } 
    }

    return {changeTurn, checkPlayer, checkWin};
})('p1', 'p2', board.Board)

Display.display(GameBoard.Board);
const tiles = document.querySelectorAll('.tile');

tiles.forEach(item => {
    item.addEventListener('click', function() {
        if (Rules.checkPlayer() === 'p1' && !(['p2', 'p1'].includes(item.getAttribute('data-player')))) { 
            item.style.backgroundColor = '#F8E9A1';
            item.setAttribute('data-player', 'p1');
            GameBoard.Board[item.id - 1]= 'p1';
            if (Rules.checkWin()) {
                Display.resetBoard();
                Display.endMessage('p1');
                return;
            }
            Rules.changeTurn(); 
        } else if (Rules.checkPlayer() === 'p2' && !(['p2', 'p1'].includes(item.getAttribute('data-player')))) {
            item.style.backgroundColor = '#374785';
            item.setAttribute('data-player', 'p2');
            GameBoard.Board[item.id - 1]= 'p2';
            if (Rules.checkWin()) {
                Display.resetBoard();
                Display.endMessage('p2');
                return;
            }
            Rules.changeTurn(); 
        }
        
    })
});

const restartButton = document.getElementById('restartButton')
const startButton = document.getElementById('startButton')

startButton.addEventListener('click', function() {
    const p1Name = document.getElementById('p1Name').value
    const p2Name = document.getElementById('p2Name').value
    if (p1Name !== '' && p2Name !== '') {
        document.getElementById('p1').innerText = p1Name
        document.getElementById('p2').innerText = p2Name
        document.getElementById('startBox').classList.add('hidden')
        document.getElementById('mainContainer').classList.remove('hidden')
        document.getElementById('mainContainer').classList.add('visible')
    } else {
        alert("Player's names can't be empty")
    }

})
restartButton.addEventListener('click', function() {
    Display.resetBoard()
})