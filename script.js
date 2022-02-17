
const GameBoard = (() => {
    let Board = {1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9};
    return {Board};
})()

const Display = (() => {
    const board = document.getElementById('board');
    const boardArr = GameBoard.Board
    let endMessageBox = document.getElementById('endMessage')

    const display = (GameBoard) => {
        for(let [key] of Object.entries(GameBoard)) {
            div = document.createElement('div');
            div.id = key;
            div.setAttribute('data-player', key);
            div.classList.add('tile');
            board.appendChild(div);
        }
    }

    const resetBoard = () => {
        let  i = 1
        const tiles = document.querySelectorAll('.tile');
        document.getElementById('endMessage').classList.remove('visible2')
        document.getElementById('endMessage').classList.add('hidden2')
        tiles.forEach(item => {
            boardArr[(item.id - 1)] = i;
            item.setAttribute('data-player', i);
            item.style.backgroundColor = 'transparent';
            i++;
        })
    }

    const startBox = () => {
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
    }

    const endMessage = (winner) => {
        if (document.getElementById(winner)) {
            endMessageBox.innerText = `The Player ${document.getElementById(winner).innerText} won`
        } else {
            endMessageBox.innerText = 'TIE'
        }
        console.log('message')
        document.getElementById('endMessage').classList.remove('hidden2')
        document.getElementById('endMessage').classList.add('visible2')
    }

    const tilePlayerColor = (item, player, color) => {
        item.style.backgroundColor = color;
        item.setAttribute('data-player', player);
        GameBoard.Board[item.id - 1] = player;
    }

    return {resetBoard, display, endMessage, startBox, tilePlayerColor}

})()

const Rules = ((P1, P2) => {
    let currentPlayer = P1;
    let board = GameBoard.Board
    let arr = [1]

    const changeTurn = () => {
        if (currentPlayer === P1){
            currentPlayer = P2;
        } else {
            currentPlayer = P1;
        } 
        arr.push('a')
        return currentPlayer
    }   

    const checkPlayer = (item) => {
        if (currentPlayer === 'p1' && !(['p2', 'p1'].includes(item.getAttribute('data-player')))) {
            return ['p1', '#F8E9A1']
        } else if (currentPlayer === 'p2' && !(['p2', 'p1'].includes(item.getAttribute('data-player')))) {
            return ['p2', '#24305E']
        }
    }

    const checkWin = () => {
        return checkCol() || checkDia() || checkRow() || checkTie()
    }

    const checkTie = () => {
        if (arr.length === 9){
            return true
        }
    }

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

    const resetArr = () => {
        arr = [1]
    }

    return {changeTurn, checkPlayer, checkWin, checkTie, resetArr};
})('p1', 'p2', board.Board)

Display.display(GameBoard.Board);
const tiles = document.querySelectorAll('.tile');
const restartButton = document.getElementById('restartButton')
const startButton = document.getElementById('startButton')

tiles.forEach(item => {
    item.addEventListener('click', function() {
        player = Rules.checkPlayer(item)
        Display.tilePlayerColor(item, player[0], player[1]);
        if (Rules.checkWin()) Display.endMessage(Rules.checkWin());
        Rules.changeTurn();
    })
});

startButton.addEventListener('click', function() {
    Display.startBox()
})

restartButton.addEventListener('click', function() {
    Display.resetBoard()
    Rules.resetArr()
})