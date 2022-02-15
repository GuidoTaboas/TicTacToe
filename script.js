
//player moves, owns tiles
//board has tiles, logic to check legal player movements
//"referee" check win/lose/tie situations
//flow: players are created. players move. check win. 

const GameBoard = (() => {
    let Board = [1,2,3,4,5,6,7,8,9];
    return {Board};
})()

const DisplayBoard = (() => {
    const board = document.getElementById('board');
    
    const display = (GameBoard) => {
    GameBoard.forEach(item => {
        div = document.createElement('div');
        div.id = item;
        div.setAttribute('data-player', item);
        div.classList.add('tile');
        board.appendChild(div);
    })}

    const resetBoard = () => {
        let  i = 1
        const tiles = document.querySelectorAll('.tile');
        tiles.forEach(item => {
            item.setAttribute('data-player', i)
            item.style.backgroundColor = 'transparent'
            i++
        })
    }
    return {resetBoard, display}

})()

const Player = (name) => {
    const showName = () => console.log(name);
    return {
        name
    }
}


// en lugar de devolver, checkPlayer, estaba devolviendo currentPlayer, y evaluando abajo rules.currentPlayer
//currentPlayer se actualizaba, pero rules.currentPlayer no se actualizaba, porque?

const Rules = ((P1, P2, Board) => {
    let currentPlayer = P1;

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

    const checkWin = (board) => {
       if (checkCol() || checkDia() || checkRow()) {
           return 'win'
       } else if(checkTie()) {
           console.log('tie')
       }
    }

    // if every tile data-player is not in board, means every tile is occupied
    const checkTie = () => {
        let board = [1,2,3,4,5,6,7,8,9]
        let flag = false
        tiles.forEach(item => {
           if(board.includes(parseInt(item.getAttribute('data-player')))) {
               flag = true
               return 
           }
        return flag
        })
    }

    const checkRow = () => {
        if (tiles[0].getAttribute('data-player') === tiles[1].getAttribute('data-player') &&
            tiles[0].getAttribute('data-player') === tiles[2].getAttribute('data-player') ) {
            return tiles[0].getAttribute('data-player');
        } else if (tiles[3].getAttribute('data-player') === tiles[5].getAttribute('data-player') &&
                    tiles[3].getAttribute('data-player') === tiles[4].getAttribute('data-player') ) {
                    return tiles[3].getAttribute('data-player');
        } else if (tiles[6].getAttribute('data-player') === tiles[7].getAttribute('data-player') &&
                    tiles[6].getAttribute('data-player') === tiles[8].getAttribute('data-player')) {
                    return tiles[6].getAttribute('data-player');
        }
    }

    const checkCol = () => {
        if (tiles[0].getAttribute('data-player') === tiles[3].getAttribute('data-player') &&
            tiles[0].getAttribute('data-player') === tiles[6].getAttribute('data-player') ) {
                return tiles[0].getAttribute('data-player');
        } else if (tiles[1].getAttribute('data-player') === tiles[4].getAttribute('data-player') &&
                    tiles[1].getAttribute('data-player') === tiles[7].getAttribute('data-player') ) {
                    return tiles[1].getAttribute('data-player');
        } else if (tiles[2].getAttribute('data-player') === tiles[5].getAttribute('data-player') &&
                    tiles[2].getAttribute('data-player') === tiles[8].getAttribute('data-player')) {
                    return tiles[2].getAttribute('data-player');
        }
    }

    const checkDia = () => {
        if (tiles[0].getAttribute('data-player') === tiles[4].getAttribute('data-player') &&
            tiles[0].getAttribute('data-player') === tiles[8].getAttribute('data-player') ) {
                return tiles[0].getAttribute('data-player');
        } else if (tiles[2].getAttribute('data-player') === tiles[4].getAttribute('data-player') &&
                    tiles[2].getAttribute('data-player') === tiles[6].getAttribute('data-player') ) {
                        return tiles[2].getAttribute('data-player');
        } 
    }

    return {changeTurn, checkPlayer, checkWin};
})('p1', 'p2', board.Board)

DisplayBoard.display(GameBoard.Board);
const tiles = document.querySelectorAll('.tile');

tiles.forEach(item => {
    item.addEventListener('click', function() {
        if (Rules.checkPlayer() === 'p1' && !(['p2', 'p1'].includes(item.getAttribute('data-player')))) {   //Aqui estaba evaluando rules.currentPlayer    
            item.style.backgroundColor = '#F8E9A1';
            item.setAttribute('data-player', 'p1');
            if (Rules.checkWin()) {
                alert('Player 1 has won');
                DisplayBoard.resetBoard()
                return
            }
            Rules.changeTurn(); 
        } else if (Rules.checkPlayer() === 'p2' && !(['p2', 'p1'].includes(item.getAttribute('data-player')))) {
            item.style.backgroundColor = '#374785';
            item.setAttribute('data-player', 'p2');
            if (Rules.checkWin()) {
                alert('Player 2 has won')
                DisplayBoard.resetBoard()
                return
            }
            Rules.changeTurn(); 
        }
        
    })
});

const restartButton = document.getElementById('restartButton')

restartButton.addEventListener('click', function() {
    DisplayBoard.resetBoard()
})