var score = 100;
var dealt = false;
var hand = new Array(6);
var held = new Array(6);
var deck = new Array(53);



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
    hand[i] = deck[i];
    document.images[i].src = hand[i].fname();
    document.images[i+5].src = "hold.gif";
    held[i] = false;
  }
  dealt = true;
  score = score - 1; //deduct 1 for bet count
  document.form1.total.value = score;
  document.images[11].src = "draw.gif";
  Addscore();
}

// Hold or discard a card
function Hold(num) {
  if (!dealt) {
    return;
  }
  if (!held[num]) {
    held[num] = true;
    document.images[5 + num].src = "hold2.gif";
  }
  else {
    held[num] = false;
    document.images[5 + num].src = "hold.gif";
  }
}

// Draw new cards
function Draw() {
  var curcard = 6;
  for (i = 1; i < 6; i++) {
    if (!held[i]) {
      hand[i] = deck[curcard++];
      document.images[i].src = hand[i].fname();
    }
  }
  dealt = false;
  document.images[11].src = "deal.gif";
  score += Addscore();
  document.form1.total.value = score;
}

//make a filename for an image given a given Card object
function fname() {
  return this.num + this.suit + ".gif";
}

//constructor for card object
function Card(num, suit) {
  this.num = num;
  this.suit = suit;
  this.fname = fname;
}

function Numsort(a,b) { return a - b }

// Calculate score
function Addscore() {
  var straight = false;
  var flush = false;
  var pairs = 0;
  var three = false;
  var tally = new Array(14);
  //sorted array for convenience
  var nums = new Array(5);
  for (var i = 0; i < 5; i++) {
    nums[i] = hand[i+1].num;
  }
  nums.sort(Numsort);
  //flush
  if (hand[1].suit == hand[2].suit &&
      hand[2].suit == hand[3].suit &&
      hand[3].suit == hand[4].suit &&
      hand[4].suit == hand[5].suit) {
    flush = true;
  }
  // Straight Ace Low
  if (nums[0] == nums[1] - 1 &&
      nums[1] == nums[2] - 1 &&
      nums[2] == nums[3] - 1 &&
      nums[3] == nums[4] - 1) {
    straight = true;
  }
  // Straight Ace High
  if (nums[0] == 1 && nums[1] == 10 && nums[2] == 11 && nums[3] == 12 && nums[4] == 13) {
    straight = true;
  }
  //royal flush, straight flush, straight, flush
  if (straight && flush && nums[4] == 13 && nums[0] == 1) {
    document.form1.message.value = "Royal Flush";
    return 100;
  }
  if (straight && flush) {
    document.form1.message.value = "Straight Flush";
    return 50;
  }
  if (straight) {
    document.form1.message.value = "Straight";
    return 4;
  }
  if (flush) {
    document.form1.message.value = "Flush";
    return 5;
  }
  // Tally array is a count for each card value
  for (i = 1; i <14; i++) {
    tally[i] = 0;
  }
  for (i = 0; i < 5; i++) {
    tally[nums[i]] += 1;
  }
  for (i = 1; i < 14; i++) {
    if (tally[i] == 4) {
      document.form1.message.value = "Four of a kind!";
      return 25;
    }
    if (tally[i] == 3) three = true;
    if (tally[i] == 2) pairs += 1;
  }
  if (three && pairs == 1) {
    document.form1.message.value = "Full House";
    return 10;
  }
  if (pairs == 2) {
    document.form1.message.value = "Two pair";
    return 2;
  }
  if (three) {
    document.form1.message.value = "Three of a kind";
    return 3;
  }
  if (pairs == 1) {
    if (tally[1] == 2 || tally[11] == 2 || tally[12] == 2 || tally[13] == 2) {
      document.form1.message.value = "Jacks or better";
      return 1;
    }
  }
  document.form1.message.value = "No score";
  return 0;
}
