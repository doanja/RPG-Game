// globals
let kenobi, luke, sidious, maul;

function Character(name, healthPts, attackPts, counterPts) {
  this.name = name;
  this.hp = healthPts;
  this.ap = attackPts;
  this.cap = counterPts;
}

const initPlayer = (name, hp, ap, cap) => {
  let character = new Character(name, hp, ap, cap);
  return character;
};

const initialize = () => {
  // foor loop - go through each player jquery, go to array, set each of the elements from the array
  kenobi = new Character(kenobi, 120, 5, 7);
  luke = new Character(luke, 100, 3, 8);
  sidious = new Character(sidious, 150, 10, 3);
  maul = new Character(maul, 180, 19, 2);
};

window.onload = () => {
  $('#select_player_1').on('click', function() {
    character = initPlayer('fred', 100, 10, 5);
    $('.player').hide();
    $('#player_card_1').show();
    $('#player_name_1').text(character.name);
    $('#player_hp_1').text(character.hp + ' HP');
  });

  $('#select_player_2').on('click', function() {
    character = initPlayer('bob', 200, 5, 7);
    $('.player').hide();
    $('#player_card_2').show();
  });
};
