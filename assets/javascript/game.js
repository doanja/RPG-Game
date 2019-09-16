// globals variables
const characters = []; // array of characters
let kenobi, luke, yoda, maul; // character objects
let selectedCharacter, selectedDefender; // copies of the selected character and enemy
let canSelectEnemy; // used to determine if the player is already fighting an enemy
let enemiesRemaining; // counter for the number of enemies

/*
 * @param name, the name of the character
 * @param hp, the health points of the character
 * @param ap, the attack points of the character
 * @param cap, the counter attack points of the character
 * Constructor for a character
 */
function Character(name, hp, ap, cap, baseAp, imageSrc) {
  this.name = name;
  this.hp = hp;
  this.ap = ap;
  this.cap = cap;
  this.baseAp = baseAp;
  this.imageSrc = imageSrc;
}

/*
 * @param the parentElement, the element to append elements to
 * @param character, the character used to identify and initilize the elements
 * @param str, the string used to append extra text to the classes and IDs
 * function to render elements and append them to the parentElement
 */
const renderCards = (parentElement, character, str, buttonColor) => {
  const col = $('<div>', { class: 'col-sm-12 col-md-3' });
  const card = $('<div>', {
    class: 'card ' + str + ' ' + character.name + '-' + str
  });
  const cardBody = $('<div>', { class: 'card-body' });
  const cardTitle = $('<h5>', {
    class: 'card-title text-center'
  }).text(character.name);
  const img = $('<img>', {
    class: 'mx-auto',
    src: character.imageSrc,
    alt: 'sample image'
  });
  const p = $('<p>', { class: 'card-text ' + str + '-health' }).text(
    character.hp + ' HP'
  );
  const button = $('<button>', {
    class: 'btn btn-' + buttonColor + ' w-100',
    id: character.name + '-button-' + str
  }).text('Select');

  parentElement.append(col);
  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle);
  cardBody.append(img);
  cardBody.append(p);
  cardBody.append(button);
};

/*
 * @param character, the character used to identify and initilize the elements
 * @param str, the string used to append extra text to the classes and IDs
 * function that adds click listeners to each player card and hides
 * all the other player cards except for the one selected
 */
const onPlayerSelect = character => {
  $('#' + character.name + '-button-player').click(function() {
    $('.player').hide(); // hide all other player cards
    $('.' + character.name + '-player').show(); // display the player card

    // create a copy of the selected character
    selectedCharacter = { ...character };
  });
};

const onEnemySelect = character => {
  $('#' + character.name + '-button-enemy').click(function() {
    // check to see if an enemy has already been selected
    if (!canSelectEnemy) {
      alert('An enemy has already been selected.');
    }
    // if an enemy hasnt been selected...
    else {
      canSelectEnemy = false; // disallow player from selecting a new enemy
      enemiesRemaining--; // decrement the number of enemies
      $('.' + character.name + '-enemy').hide(); // delete the selected enemy card

      // create a copy of the selected enemy
      selectedDefender = { ...character };

      // render defender info
      renderDefenderCard($('#defender_row'), selectedDefender);
      renderFightOptions($('#defender_row'));
      renderGameStatus($('#defender_row'), selectedDefender);

      fightButtonListener(); // listen to when the player clicks the fight button
    }
  });
};

/*
 * @param the parentElement, the element to append elements to
 * @param defender, the defender used to identify and initilize the defender elements
 * function to render the defender in the defender card
 */
const renderDefenderCard = (parentElement, character) => {
  const col = $('<div>', { class: 'col-sm-12 col-md-3' });
  const card = $('<div>', {
    class: 'card-defender'
  });
  const cardBody = $('<div>', { class: 'card-body' });
  const cardTitle = $('<h5>', {
    class: 'card-title text-center defender-title'
  }).text(character.name);
  const img = $('<img>', {
    class: 'mx-auto defender-image',
    src: character.imageSrc,
    alt: 'sample image'
  });
  const p = $('<p>', {
    class: 'card-text defender-hp'
  }).text(character.hp + ' HP');

  parentElement.append(col);
  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle);
  cardBody.append(img);
  cardBody.append(p);
};

/*
 * @param the parentElement, the element to append elements to
 * function to render the fight button in the defender card
 */
const renderFightOptions = parentElement => {
  const col = $('<div>', { class: 'col-sm-12 col-md-3' });
  const card = $('<div>', { class: 'card-defender' });
  const cardBody = $('<div>', { class: 'card-body' });
  const cardTitle = $('<h5>', {
    class: 'card-title text-center'
  }).text('Fight Options');
  const button = $('<button>', {
    class: 'btn btn-warning w-100',
    id: 'fight-button'
  }).text('Fight');

  parentElement.append(col);
  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle);
  cardBody.append(button);
};

/*
 * @param the parentElement, the element to append elements to
 * @param defender, the defender used to identify and initilize the defender elements
 * function to render the game status in the defender card
 */
const renderGameStatus = (parentElement, defender) => {
  const col = $('<div>', { class: 'col-sm-12 col-md-6' });
  const card = $('<div>', { class: 'card-defender' });
  const cardBody = $('<div>', { class: 'card-body' });
  const p = $('<p>', { class: 'card-text text-left', id: 'game-status' }).text(
    'Now fighting ' + defender.name + '.'
  );

  parentElement.append(col);
  col.append(card);
  card.append(cardBody);
  cardBody.append(p);
};

/*
 * function that handles what happens when you click the fight button,
 * this function updates the defender card, updates the battle status,
 * and checks for win/lose conditions.
 */
const fightButtonListener = () => {
  $('#fight-button').click(function() {
    updateDefenderCard(); // update defender card

    // when player hp reaches 0
    if (selectedCharacter.hp <= 0) {
      resetGame('YOU LOSE');
    }
    // when there are no more enemies and current defender hp raches 0
    else if (enemiesRemaining === 0 && selectedDefender.hp <= 0) {
      resetGame('YOU WIN');
    }
    // when defender's hp reaches 0
    else if (selectedDefender.hp <= 0) {
      alert('Defender died...');
      $('.card-defender').remove();
      canSelectEnemy = true;
    }
  });
};

/*
 * this function updates the player's and defender's
 * information during the battle.
 */
const updateDefenderCard = () => {
  // update player hp, ap
  selectedCharacter.hp -= selectedDefender.cap; // decrease player's hp base on defender's counter attack power
  selectedDefender.hp -= selectedCharacter.ap; // decrease defender's hp base on player's attack power
  selectedCharacter.ap += selectedCharacter.baseAp; // increasse player's base attack power

  $('.player-health').text(selectedCharacter.hp + ' HP'); // update player's hp
  $('.defender-hp').text(selectedDefender.hp + ' HP'); // update defender's hp

  // update game-status
  $('#game-status').text(
    'You attacked ' +
      selectedDefender.name +
      ' for ' +
      selectedCharacter.ap +
      ' damage. ' +
      selectedDefender.name +
      ' attacked you back for ' +
      selectedDefender.cap +
      ' damage.'
  );
};

/*
 * @param text, the text to be alerted
 * function to clear all game cards and re-initialize the game
 */
const resetGame = text => {
  alert(text);

  // clear all game cards
  $('#player_row').empty();
  $('#enemy_row').empty();
  $('#defender_row').empty();
  initializeGame();
};

/*
 * initialize four characters and adds them to the characters array
 */
const initializeCharacters = () => {
  // initialize four characters
  kenobi = new Character('Kenobi', 120, 5, 7, 5, './assets/images/kenobi.png');
  luke = new Character('Luke', 100, 3, 8, 3, './assets/images/luke.jpeg');
  yoda = new Character('Yoda', 150, 10, 3, 10, './assets/images/yoda.jpg');
  maul = new Character('Maul', 180, 19, 2, 19, './assets/images/maul.jpg');

  // add the four characters to the array
  characters.push(kenobi, luke, yoda, maul);
};

/*
 *  initialize global variables, and render game cards
 */
const initializeGame = () => {
  canSelectEnemy = true;
  enemiesRemaining = 0;
  selectedCharacter = null;
  selectedDefender = null;

  // loop through the array and render characters and add click listeners
  characters.forEach(character => {
    enemiesRemaining++;
    renderCards($('#player_row'), character, 'player', 'primary');
    onPlayerSelect(character);

    renderCards($('#enemy_row'), character, 'enemy', 'danger');
    onEnemySelect(character);
  });
};

window.onload = () => {
  initializeCharacters();
  initializeGame();
};
