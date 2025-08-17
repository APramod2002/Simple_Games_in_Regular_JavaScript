"use strict";
/*    JavaScript 7th Edition
      Chapter 8
      Chapter case   

      Draw Poker Game using Object Oriented Programming
      Author: 
      Date:       

      Filename:       poker_game.js
 */

window.addEventListener("load", playDrawPoker);

function playDrawPoker() {
   // Reference buttons and images within the Poker Game page
   let dealButton = document.getElementById("dealB");
   let drawButton = document.getElementById("drawB");
   let standButton = document.getElementById("standB");
   let resetButton = document.getElementById("resetB");
   let statusBox = document.getElementById("status");
   let betSelection = document.getElementById("bet");
   let bankBox = document.getElementById("bank");
   let cardImages = document.querySelectorAll("img.cardImg");
   
   pokerGame.currentBank = 500;
   pokerGame.currentBet = 25;

   let deck = new pokerDeck();
   deck.shuffle();
   
   bankBox.value = pokerGame.currentBank;

   betSelection.onchange = function(){
      pokerGame.currentBet = parseInt(this.value);
   }

   let hand = new pokerHand(5);
   
      dealButton.addEventListener("click", function() {
      if (pokerGame.currentBank >= pokerGame.currentBet) {
         // Enable the Draw and Stand buttons after the initial deal
         dealButton.disabled = true;        // Turn off the Deal button
         betSelection.disabled = true;      // Turn off the Bet Selection list
         drawButton.disabled = false;       // Turn on the Draw button
         standButton.disabled = false;      // Turn on the Stand Button
         statusBox.textContent = "";        // Erase any status messages

         bankBox.value = pokerGame.placeBet();

         if(deck.cards.length < 10){
            deck = new pokerDeck();
            deck.shuffle();
         }

         deck.dealTo(hand);
         
         for(let i = 0; i < cardImages.length; i++){
            cardImages[i].src = hand.cards[i].cardImage();

            cardImages[i].onclick = function(){
               if(this.src.includes("cardback.png")) {
                  this.src = hand.cards[i].cardImage();
               }
               else{
                  this.src = "cardback.png";
               }
            }
         }

      }   

   });
   
   
   drawButton.addEventListener("click", function() {
      // Enable the Deal and Bet options when the player chooses to draw new cards
      dealButton.disabled = false;        // Turn on the Deal button
      betSelection.disabled = false;      // Turn on the Bet Selection list
      drawButton.disabled = true;         // Turn off the Draw button
      standButton.disabled = true;        // Turn off the Stand Button
      
      for(let i = 0; i < cardImages.length; i++){
         if(cardImages[i].src.includes("cardback.png")) {
            hand.replaceCard(i, deck);
            cardImages[i].src = hand.cards[i].cardImage();
         }
      }

      statusBox.textContent = hand.getHandValue();
      bankBox.value = pokerGame.payBet(statusBox.textContent);

   });
   
    
   standButton.addEventListener("click", function() {
      // Enable the Deal and Bet options when the player chooses to stand with their hand 
      dealButton.disabled = false;        // Turn on the Deal button
      betSelection.disabled = false;      // Turn on the Bet Selection list
      drawButton.disabled = true;         // Turn off the Draw button
      standButton.disabled = true;        // Turn off the Stand Button  

      statusBox.textContent = hand.getHandValue();
      bankBox.value = pokerGame.payBet(statusBox.textContent);
   });
   
   // Reload the current page when the Reset button is clicked
   resetButton.addEventListener("click", function() {
      location.reload();
   });   
}