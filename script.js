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
        for (let j = 0; j < col; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const placeMark = (r, c, player) => {
        if (r < 0 || r >= row) {
            alert("Invalid row number");
            return false;
        }

        if (c < 0 || c >= col) {
            alert("Invalid col number");
            return false;
        }
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
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                if (board[i][j].getValue() === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    const win = (playerToken) => {
        console.log("Player token: "  + playerToken);
        const otherPlayer = player_token_sum - playerToken;
        console.log("other Player token: "  + otherPlayer);
        let acc = 0;
        // row
        let val;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                val = board[i][j].getValue();
                if (val === otherPlayer) {
                    break;
                }

                if (val === playerToken) {
                    acc++;
                }
            }
            if (acc === 3) {
                console.log("won in row");
                return true;
            }
            acc = 0;
        }
        // column
        for (let j = 0; j < col; j++) {
            for (let i = 0; i < row; i++) {
                val = board[i][j].getValue();
                if (val === otherPlayer) {
                    break;
                }

                if (val === playerToken) {
                    acc++;
                }
            }
            if (acc === 3) {
                console.log("won in col");
                return true;
            }
            acc = 0;
        }
        // major

        // minor

        return false;
    }
    const gameOver = (player_token="") => {
        if (player_token === "")
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
    let value = 0;
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


// // this method is use to intialize and control the game flow.
function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    
    console.log("hi");
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
    let activePlayer = players[0]
    const get_active_player = () => activePlayer;
    const switch_active_player = () => {
        activePlayer =  activePlayer === players[0]? players[1] : players[0];
    }
    
    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`New round; ${get_active_player().name}'s turn`);
    }

    /**
     * helper funciton to player round
     * 
     * @param r   row of the board 
     * @param c   col of the board 
     * @returns   true indicate the game ended, false indicate continue
     */
    const playRound = (r, c) => {
        console.log(`${get_active_player().name} add mark to (${r},${c})`);   
        let ret = gameBoard.placeMark(r,c, get_active_player().token);
        
        if (!ret) {
            console.log("Invalid move; please place the mark in empty space");
            return false;
        } 
        if (gameBoard.gameOver(get_active_player().token)) {
            gameBoard.printBoard();
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