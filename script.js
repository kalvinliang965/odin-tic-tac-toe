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
        let acc = 0;
        // row
        let val;
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                val = board[i][j].getValue();
                if (val === playerToken) {
                    acc++;
                } else {
                    break;
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
                if (val === playerToken) {
                    acc++;
                } else {
                    break;
                }
            }
            if (acc === 3) {
                console.log("won in col");
                return true;
            }
            acc = 0;
        }
        // major
        for (let i = 0; i < row; i++) {
            val = board[i][i].getValue();
            if (val == playerToken) {
                acc++;
            } else {
                break;
            }
            if (acc === 3) {
                console.log("won in minor");
                return true;
            }
        }
        acc = 0;
        // minor
        for (let i = row - 1; i >= 0; i--) {
            val = board[i][col - i - 1].getValue();
            if (val == playerToken) {
                acc++;
            } else {
                break;
            }
            if (acc === 3) {
                console.log("won in major");
                return true;
            }
        }
        acc = 0;
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


// this method is use to intialize and control the game flow.
function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    const playerOne_token = 1;
    const playerTwo_token = 2;
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
        get_active_player,
    };
}


function ScreenController() {
    const game = GameController();
    const firstPlayer = game.get_active_player();
    const x_mark = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="x_mark">
            <title>alpha-x-box-outline</title>
            <path d="M9,7H11L12,9.5L13,7H15L13,12L15,17H13L12,14.5L11,17H9L11,12L9,7M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3M5,5V19H19V5H5Z" />
        </svg>
    `;
    const o_mark = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="o_mark">
            <title>circle-box-outline</title>
            <path d="M19 5V19H5V5H19M19 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.9 20.11 3 19 3M12 8C9.79 8 8 9.79 8 12S9.79 16 12 16 16 14.21 16 12 14.21 8 12 8Z" />
        </svg>
    `;

    const cells = document.querySelectorAll(".cell");

    const cell_click_handler = (event) => {
        console.log("button is click")
        if (event.target.textContent != "") {
            return;
        }
        const r = event.target.dataset.row;
        const c = event.target.dataset.col;
        const currActivePlayer = game.get_active_player();
        const ret = game.playRound(r, c)
        // the mark is successfully place
        if (currActivePlayer === firstPlayer) {
            event.target.innerHTML = o_mark;
        } else {
            event.target.innerHTML = x_mark;
        }

        // game over
        if (ret) {
            // show a dialog to announce player won

            // let user give 
            cells.forEach(cell => {
                cell.removeEventListener("click", cell_click_handler);
            });
        }
       console.log("################");
    };

    cells.forEach((e) => {
                e.addEventListener("click", cell_click_handler);
            });
}

ScreenController();
