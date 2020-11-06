//------------
//System Vars
//------------
var stage = document.getElementById("gameCanvas");
stage.width = STAGE_WIDTH;
stage.height = STAGE_HEIGHT;
var ctx = stage.getContext("2d");
ctx.fillStyle = "#000";
ctx.font = GAME_FONTS;

var gameloop = setInterval(update, TIME_PER_FRAME);
var counter = 0;
var selected_card_index = -1;


var deck_of_cards = [];
for (var i=0; i < 4; i++)
{
	for (var j=0; j < 13; j++)
	{
		deck_of_cards.push(new Card(i, j, 1));
	}
}

function swap(index1, index2, deck_of_cards)
{
	temp_card = deck_of_cards[index1];
	deck_of_cards[index1] = deck_of_cards[index2];
	deck_of_cards[index2] = temp_card;
	deck_of_cards[index2].x = 50;
	deck_of_cards[index2].y = 200;
	deck_of_cards[index2].updown = 0;
	deck_of_cards[index1].x = 50;
	deck_of_cards[index1].y = 200;
	deck_of_cards[index1].updown = 0;

}

function shuffle(deck_of_cards, n)
{
	for (var i = 0; i < n; i++)
	{
		index1 = Math.floor(Math.random() * deck_of_cards.length);
		index2 = Math.floor(Math.random() * deck_of_cards.length);
		swap(index1, index2, deck_of_cards);
	}
}

//-----------------
//Browser Detection
//-----------------
navigator.sayswho= (function(){
    var N= navigator.appName, ua= navigator.userAgent, tem;
    var M= ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
    if(M && (tem= ua.match(/version\/([\.\d]+)/i))!= null) M[2]= tem[1];
    M= M? [M[1], M[2]]: [N, navigator.appVersion, '-?'];

    return M;
})();

var browser;
if (navigator.sayswho[0] == "Firefox")
	browser="f";
else if (navigator.sayswho[0] == "Chrome")
	browser="c";
else if (navigator.sayswho[0] == "Safari")
	browser="s";
else  if (navigator.sayswho[0] == "Microsoft")
	browser="m";
else
	browser="f";


var gameloop, mouseX, mouseY;
mouseX = 300; //default values
mouseY = 300; //default values

gameloop = setInterval(update, TIME_PER_FRAME);			
stage.addEventListener("click", canvasClick, false);


function card_click_detection(x, y, deck_of_cards)
{
	var overlapping = []
	for (card in deck_of_cards)
	{
		var cardy = deck_of_cards[card];
		if (x > cardy.x && x <= cardy.x + GRID_W &&
			y > cardy.y && y <= cardy.y + GRID_H)
		{
			overlapping.push(card);
		}
	}
	if (overlapping.length != 0)
	{
		return overlapping[overlapping.length - 1 ];
	}
	else 
	{
		return -1;
	}
}

function canvasClick(event)
{	
	if (browser == "f" || browser == "m")
	{
		mouseX = event.clientX - stage.offsetLeft + document.documentElement.scrollLeft;
		mouseY = event.clientY - stage.offsetTop + document.documentElement.scrollTop;
	}
	else //"s" or "c"
	{
		mouseX = event.clientX - stage.offsetLeft + document.body.scrollLeft;
		mouseY = event.clientY - stage.offsetTop + document.body.scrollTop;
	}

	console.log(selected_card_index);
	if (selected_card_index != -1)
	{
		var temp_card = deck_of_cards[selected_card_index];
		deck_of_cards.splice(selected_card_index, 1);
		deck_of_cards.push(temp_card);
		temp_card.x = mouseX-GRID_W/2;
		temp_card.y = mouseY-GRID_H/2;
		selected_card_index = -1;
	}
	else
	{
		cardyy = card_click_detection(mouseX, mouseY, deck_of_cards);
		if (cardyy != -1 && selected_card_index == -1)
		{
			selected_card_index = cardyy;
		}
	}
	console.log(selected_card_index);
	console.log(deck_of_cards);

}	

//------------
//Key Handlers
//------------
function keyDownHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);

	if (keyPressed == "F")
	{		
		if(selected_card_index != -1)
		{
			deck_of_cards[selected_card_index].updown = !deck_of_cards[selected_card_index].updown;
			selected_card_index = -1;
		}
	}
	if (keyPressed == "Q")
	{		
		shuffle(deck_of_cards, 10000);
	}
	if (keyPressed == "D")
	{		
		selected_card_index = -1;
	}

}

function keyUpHandler(event)
{
	var keyPressed = String.fromCharCode(event.keyCode);
}



//---------------
//Preloading ...
//---------------
//Preload Art Assets
// - Sprite Sheet
var charImage = new Image();
charImage.ready = false;
charImage.onload = setAssetReady;
charImage.src = PATH_CHAR;

function setAssetReady()
{
	this.ready = true;
}
//Display Preloading
ctx.fillRect(0,0,stage.width,stage.height);
ctx.fillStyle = "#000";
ctx.fillText(TEXT_PRELOADING, TEXT_PRELOADING_X, TEXT_PRELOADING_Y);
var preloader = setInterval(preloading, TIME_PER_FRAME);
var gameloop, currX, currY;

function preloading()
{	
	if (charImage.ready)
	{
		clearInterval(preloader);
		document.addEventListener("keydown",keyDownHandler, false);
		document.addEventListener("keyup",keyUpHandler, false);	
		gameloop = setInterval(update, TIME_PER_FRAME);
	}
}

//------------
//Game Loop
//------------


function update()
{		
	
	//Clear Canvas
	ctx.fillStyle = "grey";
	ctx.fillRect(0, 0, stage.width, stage.height);
		

	for (var card in deck_of_cards)
	{
		deck_of_cards[card].render2(charImage);
	}



	
	ctx.fillStyle = "black";
	ctx.beginPath();
	ctx.arc(mouseX, mouseY, RADIUS, 0 , 2 * Math.PI, false);
	ctx.fillStyle = 'white';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#003300';
	ctx.stroke();

	if (selected_card_index != -1)
	{
		deck_of_cards[selected_card_index].render3(charImage);

	}
}


