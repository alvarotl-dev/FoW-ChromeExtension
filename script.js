var isGachalogCode;

window.onload = function() {
  document.getElementById("searchBox").focus();
};

function parseInformation() {
	var specialCharacters = [["æ", "ae"], ["â", "a"], ["á", "a"], ["à", "a"], ["é", "e"], ["ö", "o"], ["û", "u"], ["ú", "u"]];
	var cardName = document.getElementById("searchBox").value.toLowerCase();
	
	//Store card name in alt
	document.getElementById("cardImage").alt = cardName;

	//Replace special characters
	for(var i = 0; i < cardName.length; i++) {
		for(var n = 0; n < specialCharacters.length; n++) {
			if(cardName[i] == specialCharacters[n][0]) {
				cardName = cardName.replace(cardName[i], specialCharacters[n][1]);
			}
		}
	}
	
	
}

function enterPressed(){
	parseInformation();
	return (parseInt(document.getElementById("cardImage").alt) != NaN && parseInt(document.getElementById("cardImage").alt).toString().length == 8)
}

document.getElementById("playerButton").onclick = function() {
	chrome.tabs.create({ url: "https://www.fowsystem.com/es/player/dashboard"});
};

document.getElementById("gachalogButton").onclick = function() {
	isGachalogCode = true;
	parseInformation()
	chrome.tabs.create({ url: "https://www.gachalog.com/list/" + document.getElementById("cardImage").alt});
};

document.getElementById("CoolStuffButton").onclick = function() {
	chrome.tabs.create({ url: "http://www.coolstuffinc.com/main_search.php?pa=searchOnName&page=1&resultsPerPage=25&q=" + document.getElementById("cardImage").alt });
};

document.getElementById("TCGPlayerButton").onclick = function() {
	chrome.tabs.create({ url: "http://shop.tcgplayer.com/force-of-will/product/show?ProductName=" + document.getElementById("cardImage").alt });
};

document.getElementById("CardMarketButton").onclick = function() {
	chrome.tabs.create({ url: "https://www.cardmarket.com/es/FoW/Products/Search?searchString=" + document.getElementById("cardImage").alt });
};

document.getElementById("searchButton").onclick = function() {
	parseInformation()
	
	document.getElementById("CoolStuffButton").style.display = "inline-block";
	document.getElementById("TCGPlayerButton").style.display = "inline-block";
	document.getElementById("CardMarketButton").style.display = "inline-block";
	
};

document.getElementById("searchBox").onkeypress = function(key) {
	if(key.keyCode == 13) {
		if(isGachalogCode = enterPressed())
			chrome.tabs.create({ url: "https://www.gachalog.com/list/" + document.getElementById("cardImage").alt });

		else
			chrome.tabs.create({ url: "https://www.cardmarket.com/es/FoW/Products/Search?searchString=" + document.getElementById("cardImage").alt });
	}
};
