// globals
const characters = []; // used to store Character objects
let kenobi, luke, sidious, maul; // characters
let selectedCharacter, selectedDefender;
let canSelectEnemy; // change this to false when you click on an enemy,
let enemiesRemaining;

/*
 * @param name, the name of the character
 * @param hp, the health points of the character
 * @param ap, the attack points of the character
 * @param cap, the counter attack points of the character
 * Constructor for a character
 */
function Character(name, hp, ap, cap, baseAp) {
  this.name = name;
  this.hp = hp;
  this.ap = ap;
  this.cap = cap;
  this.baseAp = baseAp;
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
    src: 'https://picsum.photos/200',
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
    $('.player').hide();
    $('.' + character.name + '-player').show();

    selectedCharacter = { ...character };
    // // console.log('selectedCharacter :', selectedCharacter);
    // updateCurrentPlayer(character); // update global selectedCharacter
  });
};

const onEnemySelect = character => {
  $('#' + character.name + '-button-enemy').click(function() {
    if (!canSelectEnemy) {
      alert('An enemy has already been selected.');
    } else {
      canSelectEnemy = false;
      enemiesRemaining--;
      $('.' + character.name + '-enemy').hide();

      selectedDefender = { ...character };
      // console.log('selectedDefender :', selectedDefender);
      // updateCurrentDefender(character);

      // render defender info
      renderDefenderCard($('#defender_row'), selectedDefender); // update this with selectedDefender
      renderFightOptions($('#defender_row'));
      renderGameStatus($('#defender_row'), selectedDefender);

      // console.log('enemy selected...');

      fightButtonListener();
    }
  });
};

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
    src: 'https://picsum.photos/200',
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

const fightButtonListener = () => {
  // console.log('fightButtonListener called...');
  // parameter for msg?
  console.log('enemiesRemaining :', enemiesRemaining);
  $('#fight-button').click(function() {
    // console.log('fight button clicked');

    /* update defender info */

    // update player hp, ap
    selectedCharacter.hp -= selectedDefender.cap; // decrease player's hp base on defender's counter attack power
    selectedDefender.hp -= selectedCharacter.ap; // decrease defender's hp base on player's attack power
    selectedCharacter.ap += selectedCharacter.baseAp; // increasse player's base attack power

    // console.log('PLAYER HP :', selectedCharacter.hp);
    // console.log('ENEMY HP :', selectedDefender.hp);
    // console.log('PLAYER ATTACK :', selectedCharacter.ap);
    // console.log('----------------------------------------------------');

    $('.player-health').text(selectedCharacter.hp + ' HP');
    $('.defender-hp').text(selectedDefender.hp + ' HP');

    // re-render player and defener hp
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
    /* check battle status */
    if (selectedCharacter.hp <= 0) {
      alert('gameover');
      location.reload();
    } else if (enemiesRemaining === 0 && selectedDefender.hp <= 0) {
      alert('u win');
      location.reload();
    } else if (selectedDefender.hp <= 0) {
      alert('defender hp under 0');
      $('.card-defender').remove();
      canSelectEnemy = true;
    }
  });
};

/*
 * initializes four Characters and adds them to a characters array.
 * renders the elements and adds click listeners to each card
 */
const initializeVariables = () => {
  canSelectEnemy = true;
  enemiesRemaining = 0;

  // initialize four characters
  kenobi = new Character('Kenobi', 120, 5, 7, 5);
  luke = new Character('Luke', 100, 3, 8, 3);
  sidious = new Character('Sidious', 150, 10, 3, 10);
  maul = new Character('Maul', 180, 19, 2, 19);

  // add the four characters to the array
  characters.push(kenobi, luke, sidious, maul);
};

const initializePage = () => {
  // loop through the array and render characters and add click listeners
  characters.forEach(character => {
    enemiesRemaining++;
    renderCards($('#player_row'), character, 'player', 'primary');
    onPlayerSelect(character);

    renderCards($('#enemy_row'), character, 'enemy', 'danger');
    onEnemySelect(character);
  });
  console.log('enemiesRemaining :', enemiesRemaining);
};

window.onload = () => {
  initializeVariables();
  initializePage();
};
