// globals
let kenobi, luke, sidious, maul;

function Character(name, hp, ap, cap) {
  this.name = name;
  this.hp = hp;
  this.ap = ap;
  this.cap = cap;
}

const initialize = () => {
  // foor loop - go through each player jquery, go to array, set each of the elements from the array
  kenobi = new Character('kenobi', 120, 5, 7);
  luke = new Character('luke', 100, 3, 8);
  sidious = new Character('sidious', 150, 10, 3);
  maul = new Character('maul', 180, 19, 2);
};

const renderPlayerCards = (parentElement, character) => {
  const col = $('<div>', { class: 'col-sm-12 col-md-3 ' + character.name });
  const card = $('<div>', { class: 'card player' + character.name });
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
  const button = $('<button>', {
    class: 'btn btn-primary w-100 ' + character.name,
    id: 'special'
  }).text('Select');

  parentElement.append(col);
  col.append(card);
  card.append(cardBody);
  cardBody.append(cardTitle);
  cardBody.append(img);
  cardBody.append(p);
  cardBody.append(button);
};

window.onload = () => {
  initialize();

  renderPlayerCards($('#player_row'), kenobi);
  // renderPlayerCards($('#player_row'), luke);
  // renderPlayerCards($('#player_row'), sidious);
  // renderPlayerCards($('#player_row'), maul);

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

  // console.log($('.kenobi')[4]);
  console.log(
    $('#special').click(function() {
      console.log('he');
    })
  );
};
