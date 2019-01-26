const game = new Game();
const startGameButton = document.getElementById('btn__reset');
const onScreenKeyboard = document.querySelector('#qwerty');

startGameButton.addEventListener('click', () => {
    game.startGame();
});

/**
 * Click Event Listener for on screen keyboard
 */
onScreenKeyboard.addEventListener('click', e => {
    // Make sure a button was click and not a space around the buttons.
    if (e.target.className === 'key') {
        game.handleInteraction(e);
    }
});

/**
 * Keydown Event Listener.
 */
document.addEventListener("keydown", e => {
    //Before we handle the event make sure the game is in a ready for input
    if (document.getElementById('overlay').style.display === 'none') {
        game.handleInteraction(e);
    }
});