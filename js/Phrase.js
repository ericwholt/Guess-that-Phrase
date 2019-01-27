/**
 * Class representing a phrase.
 */
class Phrase {
    /**
     * @param {string} phrase - The phrase choosen and passed to the new Phrase class.
     */
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }

    /**
     * Adds letter placeholders to the display when the game starts.
     * @method addPhraseToDisplay
     */
    addPhraseToDisplay() {

        const phraseUl = document.querySelector('#phrase ul');

        for (let letter of this.phrase) {
            const li = document.createElement('li');

            if (letter !== ' ') {
                // li.appendChild(divCon);
                // console.log(li);
                li.className = `hide letter ${letter}`;
                li.textContent = `${letter}`
                phraseUl.appendChild(li);
            } else {
                li.className = 'space';
                li.textContent = ' ';
                phraseUl.appendChild(li);
            }
        }

    }

    /**
     * Checks if the player's selection matches letter(s) from the phrase
     * @method checkLetter
     * @param {string} letter Should recieve a single alpha character.
     * @return {boolean} Return true if phrase contains the letter or false if it does not contain letter
     */
    checkLetter(letter) {
        return (this.phrase.includes(letter)) ? true : false;
    }

    /**
     * Reveals the letter(s) on the board that matches the player's selection.
     * @method showMatchedLetter
     * @param {string} letter Should recieve a single alpha character.
     */
    showMatchedLetter(letter) {
        const letterElements = document.getElementsByClassName('letter');

        for (let letterElement of letterElements) {
            if (letterElement.textContent === letter) {
                letterElement.className = `show letter ${letter} animated rubberBand`;
            }

        }
    }

    /**
     * Get all the unique letters in the phrase
     */
    get uniqueLettersInPhrase() {
        let uniqueLetters = "";

        for (let letter of this.phrase) {
            if (uniqueLetters.indexOf(this.phrase) === -1 && letter !== ' ') {
                uniqueLetters += letter;
            }
        }

        return uniqueLetters;
    }

    /**
     * Get all the unique letters that are hidden
     */
    get uniqueHiddenLettersInPhrase() {
        const letterElements = document.getElementsByClassName('letter');
        let uniqueHiddenLetters = '';

        for (let letterElement of letterElements) {
            if (uniqueHiddenLetters.indexOf(letterElement.textContent) === -1 && letterElement.classList.contains('hide')) {
                uniqueHiddenLetters += letterElement.textContent;
            }
        }
        return uniqueHiddenLetters;
    }
}