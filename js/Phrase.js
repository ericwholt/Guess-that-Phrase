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
            // const divCon = document.createElement('div');
            // const divPine = document.createElement('div');
            // const divLeafLeft = document.createElement('div');
            // const divLeafMiddle = document.createElement('div');
            // const divleafRight = document.createElement('div');

            // divCon.id = 'container';
            // divPine.className = "pineapple";
            // divLeafLeft.className = "leafleft";
            // divLeafMiddle.className = "leafmiddle";
            // divleafRight.className = "leafright";
            // divPine.appendChild(divLeafLeft);
            // divPine.appendChild(divLeafMiddle);
            // divPine.appendChild(divleafRight);
            // divCon.appendChild(divPine);

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
                letterElement.className = `show letter ${letter} animated rubberBand`;
            }

        }
    }

    get uniqueLettersInPhrase() {
        let uniqueLetters = "";
        for (let i = 0; i < this.phrase.length; i += 1) {

            if (uniqueLetters.indexOf(this.phrase.charAt(i)) === -1) {
                if (!(this.phrase[i] === ' ')) {
                    uniqueLetters += this.phrase[i];
                }
            }
        }
        return uniqueLetters;
    }

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