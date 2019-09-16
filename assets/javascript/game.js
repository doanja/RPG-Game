// globals
const characters = []; // used to store Character objects
let kenobi, luke, sidious, maul; // characters
let selectedCharacter, selectedDefender;
let canSelectEnemy; // change this to false when you click on an enemy,

/*
 * @param name, the name of the character
 * @param hp, the health points of the character
 * @param ap, the attack points of the character
 * @param cap, the counter attack points of the character
 * Constructor for a character
 */
function Character(name, hp, ap, cap) {
  this.name = name;
  this.hp = hp;
  this.ap = ap;
  this.cap = cap;
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
  const p = $('<p>', { class: 'card-text' }).text(character.hp + ' HP');
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
const onPlayerSelect = (character) => {
  $('#' + character.name + '-button-player').click(function() {
    $('.player').hide();
    $('.' + character.name + '-player').show();

    updateCurrentPlayer(character); // update global selectedCharacter
  });
};

const onEnemySelect = (character) => {
  $('#' + character.name + '-button-enemy').click(function() {
    updateCurrentDefender(character);

    // render defender info
    renderDefenderCard($('#defender_row'), selectedDefender); // update this with selectedDefender
    renderFightOptions($('#defender_row'));
    renderGameStatus($('#defender_row'));

    onFight();
  });
};

const renderDefenderCard = (parentElement, character) => {
  const col = $('<div>', { class: 'col-sm-12 col-md-3 ' + character.name });
  const card = $('<div>', { class: 'card defender' + character.name });
  const cardBody = $('<div>', { class: 'card-body ' + character.name });
  const cardTitle = $('<h5>', {
    class: 'card-title text-center'
  }).text(character.name);
  const img = $('<img>', {
    class: 'mx-auto ' + character.name,
    src: 'https://picsum.photos/200',
    alt: 'sample image'
  });
  const p = $('<p>', { class: 'card-text ' + character.name }).text(
    character.hp + ' HP'
  );

  parentElement.append(col);
  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle);
  cardBody.append(img);
  cardBody.append(p);
};

const renderFightOptions = (parentElement) => {
  const col = $('<div>', { class: 'col-sm-12 col-md-3' });
  const card = $('<div>', { class: 'card defender' });
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

const renderGameStatus = (parentElement) => {
  const col = $('<div>', { class: 'col-sm-12 col-md-6' });
  const card = $('<div>', { class: 'card defender' });
  const cardBody = $('<div>', { class: 'card-body' });
  const p = $('<p>', { class: 'card-text text-left', id: 'game-status' }).text(
    'he he'
  );

  parentElement.append(col);
  col.append(card);
  card.append(cardBody);
  cardBody.append(p);
};

const onFight = () => {
  $('#fight-button').click(function() {
    // console.log('fight-button was clicked');
    // update player hp, ap
    // update defender hp
    // re-render player and defener hp
    $('#game-status').text('some text here was updated');
  });
};

/*
 * initializes four Characters and adds them to a characters array.
 * renders the elements and adds click listeners to each card
 */
const initialize = () => {
  // initialize four characters
  kenobi = new Character('Kenobi', 120, 5, 7);
  luke = new Character('Luke', 100, 3, 8);
  sidious = new Character('Sidious', 150, 10, 3);
  maul = new Character('Maul', 180, 19, 2);

  // add the four characters to the array
  characters.push(kenobi, luke, sidious, maul);

  // loop through the array and render characters and add click listeners
  characters.forEach((character) => {
    renderCards($('#player_row'), character, 'player', 'primary');
    onPlayerSelect(character);

    renderCards($('#enemy_row'), character, 'enemy', 'danger');
    onEnemySelect(character);
  });
};

const updateCurrentPlayer = (character) => {
  selectedPlayer = { ...character }; //
  console.log('selectedPlayer :', selectedPlayer);
};

const updateCurrentDefender = (character) => {
  selectedDefender = { ...character }; //
  console.log('selectedDefender :', selectedDefender);
};

window.onload = () => {
  initialize();
};
