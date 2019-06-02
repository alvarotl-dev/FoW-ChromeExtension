/*****************************************************************************************************************************************************************/
//**************************************************FUNCTIONS****************************************************************************************************/
/***************************************************************************************************************************************************************/


window.onload = function(){		//Open the extension with the text box already
	document.getElementById("searchBox").focus();
}


function parseInformation() {	//Parse the information on the checkbox to an alternate text of an HTML element

	var specialCharacters = [["æ", "ae"], ["â", "a"], ["á", "a"], ["à", "a"], ["é", "e"], ["ö", "o"], ["û", "u"], ["ú", "u"]];
	var searchText = document.getElementById("searchBox").value.toLowerCase();
	
	//Store card name in alt
	document.getElementById("searchBox").alt = searchText;

	//Replace special characters
	for(var i = 0; i < searchText.length; i++) {
		for(var n = 0; n < specialCharacters.length; n++) {
			if(searchText[i] == specialCharacters[n][0]) {
				searchText = searchText.replace(searchText[i], specialCharacters[n][1]);
			}
		}
	}
}


function displayButtons(isDisplayed){	//Display or hide the lower shop buttons
	switch(isDisplayed)
	{
		case true: //Show the shop buttons
			document.getElementById("CoolStuffButton").style.display = "inline-block";
			document.getElementById("TCGPlayerButton").style.display = "inline-block";
			document.getElementById("CardMarketButton").style.display = "inline-block";
			break;	

		case false: //Hide them if activated or do nothing
			document.getElementById("CoolStuffButton").style.display = "none";
			document.getElementById("TCGPlayerButton").style.display = "none";
			document.getElementById("CardMarketButton").style.display = "none";	
			break;	
	}
}


function isGachalog(){	//First, parse to an integer the text of the box and check if is a Number and after if that number is 8 digits long, you get that's a gachalog code.  
	return (parseInt(document.getElementById("searchBox").alt) != NaN && parseInt(document.getElementById("searchBox").alt).toString().length <= 8)
}


function checkTextBox(){	//Parse the information on the text box and then check if it's empty.
	parseInformation()
	return document.getElementById("searchBox").alt != "";
}


/*****************************************************************************************************************************************************************/
//**************************************************EVENT HANDLING***********************************************************************************************/
/***************************************************************************************************************************************************************/

//Redirect to your player dashboard on fowsystem.com
document.getElementById("playerButton").onclick = function() {
	chrome.tabs.create({ url: "https://www.fowsystem.com/es/player/dashboard"});
};


//Open the gachalog main page if texbox is empty or isn't a gachalog code
document.getElementById("gachalogButton").onclick = function() {

	parseInformation()
	
	if(document.getElementById("searchBox").alt == "" || !isGachalog())
		chrome.tabs.create({ url: "https://www.gachalog.com/"});
	else
		chrome.tabs.create({ url: "https://www.gachalog.com/list/" + document.getElementById("searchBox").alt});
};

//Redirect to CoolStuff
document.getElementById("CoolStuffButton").onclick = function() {
	chrome.tabs.create({ url: "http://www.coolstuffinc.com/main_search.php?pa=searchOnName&page=1&resultsPerPage=25&q=" + document.getElementById("searchBox").alt });
};
//Redirect to TCGPlayer
document.getElementById("TCGPlayerButton").onclick = function() {
	chrome.tabs.create({ url: "http://shop.tcgplayer.com/force-of-will/product/show?ProductName=" + document.getElementById("searchBox").alt });
};
//Redirect to CardMarket
document.getElementById("CardMarketButton").onclick = function() {
	chrome.tabs.create({ url: "https://www.cardmarket.com/es/FoW/Products/Search?searchString=" + document.getElementById("searchBox").alt });
};

document.getElementById("searchButton").onclick = function() {
	//First parse the information of the textbox.
	parseInformation()

	//If it's not empty, show the buttons.
	if(document.getElementById("searchBox").alt != "")
	{
		displayButtons(true);
	}
};

document.getElementById("searchBox").onkeypress = function(key) {
	if(key.keyCode == 13 && checkTextBox()) {

		if(isGachalog())  //If its a gachalog code, search for it.
			chrome.tabs.create({ url: "https://www.gachalog.com/list/" + document.getElementById("searchBox").alt });

		else	//If not, it means is a text, so a card, then search for it on the CardMarket (by default the most used webpage)
			chrome.tabs.create({ url: "https://www.cardmarket.com/es/FoW/Products/Search?searchString=" + document.getElementById("searchBox").alt });

	}
};

