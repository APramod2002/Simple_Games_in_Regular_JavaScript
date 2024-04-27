const game = new BaseballGame();
let key = document.getElementById('key');
let guess = document.getElementById('guess');
let newbtn = document.getElementById('new');
let digitButtons = document.querySelectorAll('.digit');
let table = document.getElementById('tbody-stat');


function resetGame() {
    game.newSecretKey();
    key.textContent = game.secretKey.join(', ');
    game.yourGuess = [];
    guess.textContent = game.yourGuess.join(', ');
    table.innerHTML = '';
    digitButtons.forEach(button =>{
        button.disabled = false;
    });
    
}

digitButtons.forEach(button => {
    button.addEventListener('click', function() {
        let num = this.textContent;
        if (game.yourGuess.length < 3 && !game.yourGuess.includes(num)) {
            game.yourGuess.push(num);
            guess.textContent = game.yourGuess.join(', ');
            
            if (game.yourGuess.length === 3) {
                let result = game.makeGuess(game.yourGuess.join(''));
                
                let row = document.createElement('tr');

                row.innerHTML = `<td>${game.yourGuess.join(', ')}</td>
                                      <td>${result.balls}</td>
                                      <td>${result.strikes}</td>`;
                table.appendChild(row);
                
                if (result.strikes === 3) {
                    alert(`Strike Out---\nThe key was ${game.secretKey}\n<New> to play again.`);
                    digitButtons.forEach(button =>{
                        button.disabled = true;
                    });
                    guess.textContent="";
                    
                } else {
                    game.yourGuess = []; 
                    guess.textContent = game.yourGuess.join(', ');
                }
            }
        }
    });
});


newbtn.addEventListener('click', resetGame);
