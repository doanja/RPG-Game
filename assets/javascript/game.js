// globals
const characters = []; // used to store Character objects
let kenobi, luke, sidious, maul; // characters

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
const renderCards = (parentElement, character, str) => {
  const col = $('<div>', { class: 'col-sm-12 col-md-3' });
  const card = $('<div>', {
    class: 'card player ' + character.name + '-' + str
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
    class: 'btn btn-primary w-100',
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
const initClickListeners = (character, str) => {
  $('#' + character.name + '-button-' + str).click(function() {
    $('.player').hide();
    $('.' + character.name + '-' + str).show();
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
    id: 'fight_button'
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
  const p = $('<p>', { class: 'card-text text-left' }).text('he he');

  parentElement.append(col);
  col.append(card);
  card.append(cardBody);
  cardBody.append(p);
};

/*
 * initializes four Characters and adds them to a characters array.
 * renders the elements and adds click listeners to each card
 */
const initialize = () => {
  // foor loop - go through each player jquery, go to array, set each of the elements from the array
  kenobi = new Character('kenobi', 120, 5, 7);
  luke = new Character('luke', 100, 3, 8);
  sidious = new Character('sidious', 150, 10, 3);
  maul = new Character('maul', 180, 19, 2);

  characters.push(kenobi, luke, sidious, maul);
  characters.forEach((character) => {
    renderCards($('#player_row'), character, 'player');
    initClickListeners(character, 'player');
  });

  // render defender info
  renderDefenderCard($('#defender_row'), characters[0]);
  renderFightOptions($('#defender_row'));
  renderGameStatus($('#defender_row'));
};

window.onload = () => {
  initialize();

  // $('.kenobi').on('click', function() {
  //   // character = initPlayer('fred', 100, 10, 5);
  //   $('.player').hide();
  //   $('#player_card_1').show();
  //   // $('#player_name_1').text(character.name);
  //   // $('#player_hp_1').text(character.hp + ' HP');
  // });

  // $('.kenobi').on('click', function() {
  //   $('.player').hide();
  // });

  // console.log('kenobi', $('.kenobi')[4]);
  // console.log('special', $('#special'));
};
