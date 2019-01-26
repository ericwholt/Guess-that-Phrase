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

        if (this.phrase.includes(letter)) {
            return true;
        } else {
            return false;
        }
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
                letterElement.className = `show letter ${letter}`;
            }
        }
    }
}