
//player moves, owns tiles
//board has tiles, logic to check legal player movements
//"referee" check win/lose/tie situations
//flow: players are created. players move. check win. 

const GameBoard = (() => {
    let Board = [1,2,3,4,5,6,7,8,9];
    return {Board};
})

const DisplayBoard = ((GameBoard) => {
    const board = document.getElementById('board');
    GameBoard.forEach(item => {
        div = document.createElement('div');
        div.id = item;
        div.setAttribute('data-player', item)
        div.classList.add('tile');
        board.appendChild(div);
    })
})



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
           console.log('winnn')
       }
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
})

let board = GameBoard() ;
DisplayBoard(board.Board);
const rules = Rules('p1', 'p2', board.Board);

const tiles = document.querySelectorAll('.tile');

tiles.forEach(item => {
    item.addEventListener('click', function() {
        if (rules.checkPlayer() === 'p1' && item.id !== 'p2' ) {   //Aqui estaba evaluando rules.currentPlayer    
            item.style.backgroundColor = 'red';
            item.setAttribute('data-player', 'p1');
        } else if (rules.checkPlayer() === 'p2' && item.id !== 'p1') {
            item.style.backgroundColor = 'blue';
            item.setAttribute('data-player', 'p2');
        }
        rules.checkWin();
        rules.changeTurn() ; 
    })
});