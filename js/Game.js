/**
 * Class representing a the game.
 */
class Game {
    /**
     * Create a game.
     */
    constructor() {
        this.missed = 0; // Number of time player's selection was wrong
        this.phrases = ['Aye captain', 'Im ready', 'Tartar sauce', 'Sweet mother of Pearl', 'Meow', 'Is mayonnaise an instrument', 'my leg my leg']; // Phrases that can be used for the game
        this.phrasesPicked = []; // The phrase used last game or if first game it is set to length.
        this.activePhrase = this.getRandomPhrase(); //
    }

    /**
     * Start a game
     * @method startGame
     */
    startGame() {
        this.resetGame();
        document.getElementById('overlay').style.display = 'none';
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    /**
     * Get a random phrase for the phrases array
     * @return {object} Phrase - Returns a new Phrase object with a random phrase selected
     */
    getRandomPhrase() {
        let randomIndex = Math.floor(Math.random() * this.phrases.length);

        // When we start a new game make sure it isn't the same as the last one we did.
        // if first game this will never be true.
        if (this.phrasesPicked.length === this.phrases.length) {
            this.phrasesPicked = [];
        }
        while (this.phrasesPicked.includes(randomIndex)) {
            randomIndex = Math.floor(Math.random() * this.phrases.length);
        }

        this.phrasesPicked.push(randomIndex); // Track what phrase was randomly picked. 
        return new Phrase(this.phrases[randomIndex]);
    }

    /**
     * Handles the players keyboard choices. Can be from onscreen keyboard or from keydown
     * @param {object} e - Event passed from event listener 
     */
    handleInteraction(e) {
        const keys = document.getElementById('qwerty').getElementsByTagName('button');
        const isKeydownEvent = (e.type === 'keydown') ? true : false;
        let isValidKeydown = (isKeydownEvent && e.code.lastIndexOf('Key', 0) > -1) ? true : false;
        let stop = true; // Always stop unless we have a valid letter
        let letter = '';

        // set letter variable from keydown event
        if (isKeydownEvent && isValidKeydown) {
            letter = e.code.substr(3).toLowerCase();
            stop = false;
        }

        // set letter variable from click event
        if (e.type === 'click') {
            letter = e.target.textContent;
            stop = false;
        }

        // Make sure letter has been set. Checking letter using truthy. Checking letter is redundant and could be omitted.
        if (!stop && letter) {
            let button; //Intialize button so it can be set later.

            for (let key of keys) {
                //Find button that matches our letter
                if (key.textContent === letter) {
                    button = key; //set our button
                }
            }
            // When keydown is pressed if button is disabled it has already been guessed and we don't need to test it.
            if (!button.disabled) {
                if (this.activePhrase.checkLetter(letter)) {
                    // If the phrase does include the guessed letter, add the chosen CSS class to the selected letter's keyboard button, show the matched letter/s and check if win condition has been met.
                    button.className = 'chosen';
                    this.activePhrase.showMatchedLetter(letter);
                    if (this.checkForWin()) {
                        this.gameOver('win');
                    }
                } else {
                    // If the phrase does not include the guessed letter, add the wrong CSS class to the selected letter's keyboard button and call the removeLife() method.
                    button.className = 'wrong';
                    this.RemoveLife();
                }
                button.disabled = true;
            }
        }

    }

    /**
     * Check if we have missed 5 times if we have lose the game otherwise remove a try from the board by replacing image.
     */
    RemoveLife() {
        const tries = document.getElementsByClassName('tries');
        this.missed += 1;
        if (this.missed === 5) {
            this.gameOver('lose');
        } else {
            const currentLifesImage = tries[tries.length - this.missed].firstElementChild;
            animateBubble(currentLifesImage);
        }
    }

    /**
     * Check if the letter guessed was the last one left to guess.
     * @return {boolean} gameWon - Did we win either true or false
     */
    checkForWin() {
        let gameWon = true;
        const letterElements = document.getElementsByClassName('letter');

        //loop through our phrase letter elements
        for (let letterElement of letterElements) {
            // check if any of the elements are hidden and if one is then immediately end loop
            if (letterElement.classList.contains('hide')) {
                return gameWon = false;
            }
        }
        return gameWon;
    }

    /**
     * This displays overlay dynamically based on outcome.
     * @param {string} outcome - Should be either win or lose
     */
    gameOver(outcome) {
        const overlayDiv = document.getElementById('overlay');
        const gameOverMessageElement = document.getElementById('game-over-message')
        const gameOverButton = document.getElementById('btn__reset');
        const winMessage = `You guessed "${this.activePhrase.phrase}" Great job!`;
        const winButtonText = 'Play Again';
        const loseMessage = `You made 5 incorrect guesses. You had ${game.activePhrase.uniqueHiddenLettersInPhrase.length} letters left to find.`;
        const loseButtonText = 'Try Again';

        gameOverMessageElement.textContent = eval(outcome + 'Message'); // Set gameOver text dynamically based on outcome provided.
        gameOverButton.textContent = eval(outcome + 'ButtonText'); // Set gameOverButton text dynamically based on outcome provided.
        overlayDiv.className = outcome; //Set class of Overlay Div to the outcome
        document.getElementById(`${outcome}-image`).style.display = 'flex';
        overlayDiv.style.display = 'flex'; //show the start game overlay
    }

    /**
     * Reset game so we can play again.
     */
    resetGame() {
        const phrase = document.querySelector('#phrase ul');
        const tries = document.getElementsByClassName('tries');
        const keys = document.getElementById('qwerty').getElementsByTagName('button');
        this.missed = 0;

        // remove all the letters from gameboard
        while (phrase.hasChildNodes()) {
            phrase.removeChild(phrase.lastChild);
        }

        // clear the color and enable all our keys on the gameboard
        for (let key of keys) {
            key.className = 'key';
            key.disabled = false;
        }

        // add try images back to gameboard
        for (let i = 0; i < tries.length; i += 1) {
            let randomDelay = Math.floor(Math.random() * 250);
            // tries[i].firstElementChild.style.animationDelay = `${randomDelay}ms`;
            tries[i].firstElementChild.style.backgroundPosition = "0px 0px";
        }
        document.getElementById('win-image').style.display = 'none';
        document.getElementById('lose-image').style.display = 'none';
    }

}