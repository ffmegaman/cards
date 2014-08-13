var score = 100;
var dealt = false;
var hand = Array.new(6);
var held = Array.new(6);
var deck = Array.new(53);

//make a filename for an image given a given Card object
function fname() {
  return "pics/" + this.num + this.suit +".gif";
}

//constructor for card object
function Card(num, suit) {
  this.num = num;
  this.suit = suit;
  this.fname = fname;
}

// Checks if the cards have been dealt. If dealt, draw, else deal.
function DealDraw() {
  if (dealt) {
    Draw();
  }
  else {
    Deal();
  }
}

function Deal () {
  // fill the deck in order for now
  for (i = 1; i < 14; i++) {
    deck[i] = new Card(i, "c");
    deck[i + 13] = new Card(i, "h");
    deck[i + 26] = new Card(i, "s");
    deck[i + 39] = new Card(i, "d");
  }
  //shuffle the deck. N is a random LARGE number. A loop will run until reaches N. Each loop, two cards will swap places
  var n = Math.floor(400 * Math.random() + 500);
  for (i = 1; i < n; i++) {
    card1 = Math.floor(52 * Math.random() + 1);
    card2 = Math.floor(52 * Math.random() + 1);
    temp = deck[card2];
    deck[card2] = deck[card1];
    deck[card1] = temp;
  }
  //Deal and display cards
  for (i = 1; i < 6; i++) {
    hand[1] = deck[i];
    document.images[i].src = hand[i].fname();
    document.images[i+5].src = "pics/hold.gif";
    held[i] = false;
  }
  dealt = true;
  score = score - 1; //deduct 1 for bet count
  document.form1.total.value = score;
  document.images[11].src = "pics/draw.gif";
  Addscore();
}

