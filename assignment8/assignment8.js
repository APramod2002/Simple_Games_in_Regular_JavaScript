const game = new BaseballGame();
let key = document.getElementById('key');
let guess = document.getElementById('guess');
let newbtn = document.getElementById('new');
let digitButtons = document.querySelectorAll('.digit');
let table = document.getElementById('tbody-stat');

function updateDisplay() {
    guess.textContent = game.yourGuess.join(', ');
}

function resetGame() {
    game.newSecretKey();
    key.textContent = game.secretKey.join(', ');
    game.yourGuess = [];
    updateDisplay();
    table.innerHTML = '';
}

newbtn.addEventListener('click', resetGame);

digitButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (game.yourGuess.length < 3) {
            game.yourGuess.push(parseInt(this.textContent));
            updateDisplay();
            
            if (game.yourGuess.length === 3) {
                let result = game.makeGuess(game.yourGuess.join(''));
                
                let row = document.createElement('tr');

                row.innerHTML = `<td>${game.yourGuess.join(', ')}</td>
                                      <td>${result.balls}</td>
                                      <td>${result.strikes}</td>`;
                table.appendChild(row);
                
                if (result.strikes === 3) {
                    alert(`Strike Out---\nThe key was ${game.secretKey}\n<New> to play again.`);
                    updateDisplay();
                } else {
                    game.yourGuess = []; 
                    updateDisplay();
                }
            }
        }
    });
});


resetGame();
