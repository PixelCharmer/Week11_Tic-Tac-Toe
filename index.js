// the main JavaScript block that gets the game code to run when the DOM content is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    // grabbing elements from the DOM and assigning variables for code readability 
    const boxes = Array.from(document.querySelectorAll('.box'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    // these variables represent the main actions of the game 
    // the array of the game board
    let board = ['', '', '', '', '', '', '', '', ''];
    // populates the line that indicates the who's turn it is
    let currentPlayer = 'X';
    // identifies if the game is still active 
    let isGameActive = true;

    // these variables are called based on the outcome of the game
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';
    /*
        the array index represented within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    // this array defines all possible winning combinations within the game
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // this function checks if the current move results in a win or a tie
    // checks each winning condition to see if a player has won and updates the game state. If the game is won or tied, it calls the announce function
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }

    // announce the winner or a tie under the game board
    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won !!!';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won !!!';
                break;
            case TIE:
                announcer.innerText = 'It\'s a Tie!!';
        }
        announcer.classList.remove('hide');
    };

    // helper function that checks if a move is valid in the current game state
    const isValidAction = (box) => {
        if (box.innerText === 'X' || box.innerText === 'O'){
            return false;
        }

        return true;
    };

    // helper function that updates the game board with the current player's move
    const updateBoard =  (index) => {
        board[index] = currentPlayer;
    }

    // helper function switches the current player after a valid move
    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer === 'X' ? 'X' : 'O';
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    // handles the user's move by updating the board, checking for a win or tie, changing the player, and updating the UI
    const userAction = (box, index) => {
        if(isValidAction(box) && isGameActive) {
            box.innerText = currentPlayer;
            box.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }
    
    // the actions that occur when the reset button is clicked
    // it resets the game state, clears the board, and clears the announcement message for a new game
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        boxes.forEach(box => {
            box.innerText = '';
            box.classList.remove('playerX');
            box.classList.remove('playerO');
        });
    }

    boxes.forEach( (box, index) => {
        box.addEventListener('click', () => userAction(box, index));
    });

    resetButton.addEventListener('click', resetBoard);
});