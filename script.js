console.log("Hello world");


const playerOne_token = 1;
const playerTwo_token = 2;
const player_token_sum = 3;


function GameBoard() {
    const row = 3;
    const col = 3;
    // initialize the board
    const board = [];
    for (let i = 0; i < row; i++) {
        board[i] = [];
        for (let j = 0; i < col; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeMark = (r, c, player) => {
        if (board[r][c].getValue() === 0) {
            board[r][c].setValue(player);
            return true;
        } 
        return false;
    };

    const printBoard = () => {
        const boardValue = board.map(row => (row.map(cell => cell.getValue())));
        console.log(boardValue);
    };


    const tied = () => {
        board.forEach((row) =>{
            row.forEach(cell => {
                if (cell.getValue() === 0) {
                    return false;
                }
            });
        });
        return true;
    }
    
    const win = (playerToken) => {
        const otherPlayer = player_token_sum - playerToken;
        let acc = 0;
        // row
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (board[i][j].getValue === otherPlayer) {
                    break;
                }
                acc++;
            }
            if (acc === 3) return true;
            acc = 0;
        }
        // column
        for (let j = 0; j < col; j++) {
            for (let i = 0; i < row; i++) {
                if (board[i][j].getValue === otherPlayer) {
                    break;
                }
                acc++;
            }
            if (acc === 3) return true;
            acc = 0;
        }
        // major

        // minor

        return false;
    }
    const gameOver = (player_token="") => {
        if (player === "")
            return win(playerOne_token) || win(playerTwo_token) || tied();
        else {
            return win(player_token) || tied();
        }
    }

    return {
        getBoard,
        placeMark,
        printBoard,
        gameOver,
    };
}


function Cell() {
    value = 0;

    getValue = () => {
        return value;
    };

    setValue = (player) => {
        value = player;
    };

    return {
        getValue,
        setValue,
    };
}


// this method is use to intialize and control the game flow.
function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    
    const players = [
        {
            name: playerOneName,
            token: playerOne_token,
        },

        {
            name: playerTwoName,
            token: playerTwo_token,
        }
    ];
    const gameBoard = GameBoard();
    let activePlayer = players[0];
    const get_active_player = () => activePlayer;
    const switch_active_player = () => {
        activePlayer =  activePlayer === player[0]? player[1] : player[0];
    }
    
    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`New round; ${get_active_player}'s turn`);
    }

    /**
     * helper funciton to player round
     * 
     * @param r   row of the board 
     * @param c   col of the board 
     * @returns   true indicate the game ended, false indicate continue
     */
    const playRound = (r, c) => {
        console.log(`${activePlayer} add mark to (${r},${c})`);   
        let ret = gameBoard.placeMark(r,c, get_active_player());
        
        if (!ret) {
            console.log("Invalid move; please place the mark in empty space");
            return false;
        } 

        if (gameBoard.gameOver(get_active_player)) {
            console.log(`${get_active_player} won!`);
            return true;
        }
        switch_active_player();
        printNewRound();
        return false;
    }
    printNewRound();

    return {
        printNewRound,
        playRound,
    };
}

const game = GameController();