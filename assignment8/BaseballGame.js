class BaseballGame {
    constructor() {
        this.secretKey = [];
        this.yourGuess = [];
        this.newSecretKey();
    }
    
    newSecretKey() {
        this.secretKey = []; 
        while(this.secretKey.length < 3) {
            let num = Math.floor(Math.random() * 10);
            if (!this.secretKey.includes(num)) {
                this.secretKey.push(num);
            }
        }
    }
    
    makeGuess(a) {
        this.yourGuess = a.split('').map(Number);
        return this.checkGuess();
    }
    
    checkGuess() {
        let strikes = 0;
        let balls = 0;
        
        for (let i = 0; i < this.yourGuess.length; i++) {
            if (this.yourGuess[i] === this.secretKey[i]) {
                strikes++;
            } else if (this.secretKey.includes(this.yourGuess[i])) {
                balls++;
            }
        }
        
        return { strikes, balls };
    }
}
