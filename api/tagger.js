if(!_in) var _in={};
if(!_in.fiftytwodays) _in.fiftytwodays= {};
if(!_in.fiftytwodays.MALBibleTagger) _in.fiftytwodays.MALBibleTagger={};

_in.fiftytwodays.MALBibleTagger = {

    element: '',
    max_nodes: 500,
    new_window: true,
    version: 'net',
    isVisible: false,
    currentPassage: '',
    delayTimer: '',
    hideTimer: '',
    mouseEvent: '',
    mouseOnDiv: '',
    xPos: 0,
    yPos: 0,
    IE: document.all?true:false,
    IE7: (navigator.appVersion.indexOf("MSIE 7.")==-1) ? false : true,
    isTouch: !!('ontouchstart' in window) || !!('onmsgesturechange' in window),//((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) ? true : false,
    showArticlesLink: false,
    voidOnMouseOut: false,
    mouseOnDiv: false,
    skipRe: '^(script|style|textarea|h1|h2|cite|a)$',
    parseAnchors: false,
    fontSize: 'small',
    customCSS: false,
    translation: 'MAL'
};

_in.fiftytwodays.MALBibleTagger.divOnMouseOver = function(){

	_in.fiftytwodays.MALBibleTagger.mouseOnDiv = true;
};

_in.fiftytwodays.MALBibleTagger.divOnMouseOut = function(){
	_in.fiftytwodays.MALBibleTagger.hideTimer = setTimeout('_in.fiftytwodays.MALBibleTagger.handleMouseOutDelay()', 100);
	_in.fiftytwodays.MALBibleTagger.mouseOnDiv = false;
};

_in.fiftytwodays.MALBibleTagger.hideTip = function(){

	var tip = document.getElementById('nbtDiv');
	tip.style.left = "-1000px";
	tip.style.top = "-1000px";

	_in.fiftytwodays.MALBibleTagger.isVisible = false;

	clearTimeout(_in.fiftytwodays.MALBibleTagger.hideTimer);
};

_in.fiftytwodays.MALBibleTagger.loaded = function() {

	if ((_in.fiftytwodays.MALBibleTagger.IE) || (!_in.fiftytwodays.MALBibleTagger.IE)) {
     	document.getElementById('nbtLoading').style.display = "none";
		document.getElementById('verseTarget').style.display = "block";

		if (_in.fiftytwodays.MALBibleTagger.IE7) {
	   		document.getElementById('nbtCloseImage').style.position = "relative";
	   		document.getElementById('nbtCloseImage').style.top = "-13px";
	   		document.getElementById('nbtContent').style.width = document.getElementById('nbtDiv').offsetWidth+"px";
	   		document.getElementById('nbtHeader').style.width = (parseInt(document.getElementById('nbtDiv').offsetWidth)+4)+"px";
	   	}
   	}

};

_in.fiftytwodays.MALBibleTagger.getScripture = async function() {

	clearTimeout(_in.fiftytwodays.MALBibleTagger.hideTimer);
	//stop the page jumping to the top
	//e.preventDefault();
	var tip = document.getElementById('nbtDiv');
	var verseTarget = document.getElementById('verseTarget');
	verseTarget.scrollTop = 0;
	var verseTitle = document.getElementById('nbtVerseTitle');
	var NETHeader = document.getElementById('nbtHeader');
	// var loading = document.getElementById('nbtLoading');
	// loading.style.display = "block";

	verseTitle.innerHTML = _in.fiftytwodays.MALBibleTagger.currentPassage+ " ("+_in.fiftytwodays.MALBibleTagger.translation.toUpperCase()+")";

	tip.style.left=_in.fiftytwodays.MALBibleTagger.xPos+"px";
	tip.style.top=_in.fiftytwodays.MALBibleTagger.yPos+"px";
	tip.style.display="block";
	tip.style.position="absolute";
	tip.style.padding = "0";
	
	verseTarget.innerHTML = await getVerses(_in.fiftytwodays.MALBibleTagger.currentPassage);
	_in.fiftytwodays.MALBibleTagger.loaded();
	_in.fiftytwodays.MALBibleTagger.isVisible = true;
};

_in.fiftytwodays.MALBibleTagger.getBooksRegex = function(boundaryChar) {
	var booksInUnicode = [
		"\u{D09}\u{D32}\u{D4D}\u{D2A}\u{D24}\u{D4D}\u{D24}\u{D3F}",
		"\u{D2A}\u{D41}\u{D31}\u{D2A}\u{D4D}\u{D2A}\u{D3E}\u{D1F}\u{D4D}",
		"\u{D32}\u{D47}\u{D35}\u{D4D}\u{D2F}\u{D2A}\u{D41}\u{D38}\u{D4D}\u{D24}\u{D15}\u{D02}",
		"\u{D38}\u{D02}\u{D16}\u{D4D}\u{D2F}\u{D3E}\u{D2A}\u{D41}\u{D38}\u{D4D}\u{D24}\u{D15}\u{D02}",
		"\u{D06}\u{D35}\u{D7C}\u{D24}\u{D4D}\u{D24}\u{D28}\u{D02}",
		"\u{D2F}\u{D4B}\u{D36}\u{D41}\u{D35}",
		"\u{D28}\u{D4D}\u{D2F}\u{D3E}\u{D2F}\u{D3E}\u{D27}\u{D3F}\u{D2A}\u{D28}\u{D4D}\u{D2E}\u{D3E}\u{D7C}",
		"\u{D30}\u{D42}\u{D24}\u{D4D}\u{D24}\u{D4D}",
		"1 \u{D36}\u{D2E}\u{D42}\u{D35}\u{D47}\u{D7D}",
		"2 \u{D36}\u{D2E}\u{D42}\u{D35}\u{D47}\u{D7D}",
		"1 \u{D30}\u{D3E}\u{D1C}\u{D3E}\u{D15}\u{D4D}\u{D15}\u{D28}\u{D4D}\u{D2E}\u{D3E}\u{D7C}",
		"2 \u{D30}\u{D3E}\u{D1C}\u{D3E}\u{D15}\u{D4D}\u{D15}\u{D28}\u{D4D}\u{D2E}\u{D3E}\u{D7C}",
		"1 \u{D26}\u{D3F}\u{D28}\u{D35}\u{D43}\u{D24}\u{D4D}\u{D24}\u{D3E}\u{D28}\u{D4D}\u{D24}\u{D02}",
		"2 \u{D26}\u{D3F}\u{D28}\u{D35}\u{D43}\u{D24}\u{D4D}\u{D24}\u{D3E}\u{D28}\u{D4D}\u{D24}\u{D02}",
		"\u{D0E}\u{D38}\u{D4D}\u{D30}\u{D3E}",
		"\u{D28}\u{D46}\u{D39}\u{D46}\u{D2E}\u{D4D}\u{D2F}\u{D3E}\u{D35}\u{D41}",
		"\u{D0E}\u{D38}\u{D4D}\u{D25}\u{D47}\u{D7C}",
		"\u{D07}\u{D2F}\u{D4D}\u{D2F}\u{D4B}\u{D2C}\u{D4D}",
		"\u{D38}\u{D19}\u{D4D}\u{D15}\u{D40}\u{D7C}\u{D24}\u{D4D}\u{D24}\u{D28}\u{D19}\u{D4D}\u{D19}\u{D7E}",
		"\u{D38}\u{D26}\u{D43}\u{D36}\u{D4D}\u{D2F}\u{D35}\u{D3E}\u{D15}\u{D4D}\u{D2F}\u{D19}\u{D4D}\u{D19}\u{D7E}",
		"\u{D38}\u{D2D}\u{D3E}\u{D2A}\u{D4D}\u{D30}\u{D38}\u{D02}\u{D17}\u{D3F}",
		"\u{D09}\u{D24}\u{D4D}\u{D24}\u{D2E}\u{D17}\u{D40}\u{D24}\u{D02}",
		"\u{D2F}\u{D46}\u{D36}\u{D2F}\u{D4D}\u{D2F}\u{D3E}",
		"\u{D2F}\u{D3F}\u{D30}\u{D2E}\u{D4D}\u{D2F}\u{D3E}\u{D35}\u{D41}",
		"\u{D35}\u{D3F}\u{D32}\u{D3E}\u{D2A}\u{D19}\u{D4D}\u{D19}\u{D7E}",
		"\u{D2F}\u{D46}\u{D39}\u{D47}\u{D38}\u{D4D}\u{D15}\u{D47}\u{D7D}",
		"\u{D26}\u{D3E}\u{D28}\u{D40}\u{D2F}\u{D47}\u{D7D}",
		"\u{D39}\u{D4B}\u{D36}\u{D47}\u{D2F}",
		"\u{D2F}\u{D4B}\u{D35}\u{D47}\u{D7D}",
		"\u{D06}\u{D2E}\u{D4B}\u{D38}\u{D4D}",
		"\u{D13}\u{D2C}\u{D26}\u{D4D}\u{D2F}\u{D3E}\u{D35}\u{D41}",
		"\u{D2F}\u{D4B}\u{D28}\u{D3E}",
		"\u{D2E}\u{D40}\u{D16}\u{D3E}",
		"\u{D28}\u{D39}\u{D42}\u{D02}",
		"\u{D39}\u{D2C}\u{D15}\u{D4D}\u{D15}\u{D42}\u{D15}\u{D4D}\u{D15}\u{D4D}",
		"\u{D38}\u{D46}\u{D2B}\u{D28}\u{D4D}\u{D2F}\u{D3E}\u{D35}\u{D41}",
		"\u{D39}\u{D17}\u{D4D}\u{D17}\u{D3E}\u{D2F}\u{D3F}",
		"\u{D38}\u{D46}\u{D16}\u{D30}\u{D4D}\u{D2F}\u{D3E}\u{D35}\u{D41}",
		"\u{D2E}\u{D32}\u{D3E}\u{D16}\u{D3F}",
		"\u{D2E}\u{D24}\u{D4D}\u{D24}\u{D3E}\u{D2F}\u{D3F}",
		"\u{D2E}\u{D7C}\u{D15}\u{D4D}\u{D15}\u{D4A}\u{D38}\u{D4D}",
		"\u{D32}\u{D42}\u{D15}\u{D4D}\u{D15}\u{D4B}\u{D38}\u{D4D}",
		"\u{D2F}\u{D4B}\u{D39}\u{D28}\u{D4D}\u{D28}\u{D3E}\u{D7B}",
		"\u{D2A}\u{D4D}\u{D30}\u{D35}\u{D43}\u{D24}\u{D4D}\u{D24}\u{D3F}\u{D15}\u{D7E}",
		"\u{D31}\u{D4B}\u{D2E}\u{D7C}",
		"1 \u{D15}\u{D4A}\u{D30}\u{D3F}\u{D28}\u{D4D}\u{D24}\u{D4D}\u{D2F}\u{D7C}",
		"2 \u{D15}\u{D4A}\u{D30}\u{D3F}\u{D28}\u{D4D}\u{D24}\u{D4D}\u{D2F}\u{D7C}",
		"\u{D17}\u{D32}\u{D3E}\u{D24}\u{D4D}\u{D2F}\u{D7C}",
		"\u{D0E}\u{D2B}\u{D46}\u{D38}\u{D4D}\u{D2F}\u{D7C}",
		"\u{D2B}\u{D3F}\u{D32}\u{D3F}\u{D2A}\u{D4D}\u{D2A}\u{D3F}\u{D2F}\u{D7C}",
		"\u{D15}\u{D4A}\u{D32}\u{D4A}\u{D38}\u{D4D}\u{D38}\u{D4D}\u{D2F}\u{D7C}",
		"1 \u{D24}\u{D46}\u{D38}\u{D4D}\u{D38}\u{D32}\u{D4A}\u{D28}\u{D40}\u{D15}\u{D4D}\u{D2F}\u{D7C}",
		"2 \u{D24}\u{D46}\u{D38}\u{D4D}\u{D38}\u{D32}\u{D4A}\u{D28}\u{D40}\u{D15}\u{D4D}\u{D2F}\u{D7C}",
		"1 \u{D24}\u{D3F}\u{D2E}\u{D4A}\u{D25}\u{D46}\u{D2F}\u{D4A}\u{D38}\u{D4D}",
		"2 \u{D24}\u{D3F}\u{D2E}\u{D4A}\u{D25}\u{D46}\u{D2F}\u{D4A}\u{D38}\u{D4D}",
		"\u{D24}\u{D40}\u{D24}\u{D4D}\u{D24}\u{D4A}\u{D38}\u{D4D}",
		"\u{D2B}\u{D3F}\u{D32}\u{D47}\u{D2E}\u{D4B}\u{D7B}",
		"\u{D0E}\u{D2C}\u{D4D}\u{D30}\u{D3E}\u{D2F}\u{D7C}",
		"\u{D2F}\u{D3E}\u{D15}\u{D4D}\u{D15}\u{D4B}\u{D2C}\u{D4D}",
		"1 \u{D2A}\u{D24}\u{D4D}\u{D30}\u{D4A}\u{D38}\u{D4D}",
		"2 \u{D2A}\u{D24}\u{D4D}\u{D30}\u{D4A}\u{D38}\u{D4D}",
		"1 \u{D2F}\u{D4B}\u{D39}\u{D28}\u{D4D}\u{D28}\u{D3E}\u{D7B}",
		"2 \u{D2F}\u{D4B}\u{D39}\u{D28}\u{D4D}\u{D28}\u{D3E}\u{D7B}",
		"3 \u{D2F}\u{D4B}\u{D39}\u{D28}\u{D4D}\u{D28}\u{D3E}\u{D7B}",
		"\u{D2F}\u{D42}\u{D26}\u{D3E}",
		"\u{D35}\u{D46}\u{D33}\u{D3F}\u{D2A}\u{D4D}\u{D2A}\u{D3E}\u{D1F}\u{D4D}"
	];
	var malBooks = booksInUnicode.map(function(item) {
		return boundaryChar + item;
	}).join('|');
	
	return malBooks;
};

_in.fiftytwodays.MALBibleTagger.getBooks = function(translation, boundaryChar) {
	// var books = "Genesis|Gen|Ge|Gn|Exodus|Ex|Exod?|Leviticus|Lev?|Lv|Levit?|Numbers|"+
    //     "Nu|Nm|Hb|Nmb|Numb?|Deuteronomy|Deut?|De|Dt|Joshua|Josh?|Jsh|Judges|Jdgs?|Judg?|Jd|Ruth|Ru|Rth|"+
    //     "Samuel|Sam?|Sml|Kings|Kngs?|Kgs|Kin?|Chronicles|Chr?|Chron|Ezra|Ez|"+
    //     "Nehemiah|Nehem?|Ne|Esther|Esth?|Es|Job|Jb|Psalms?|Psa?|Pss|Psm|Proverbs?|Prov?|Prv|Pr|"+
    //     "Ecclesiastes|Eccl?|Eccles|Ecc?|Songs?ofSolomon|Song?|So|Songs|Isaiah|Isa|Is|Jeremiah|"+
    //     "Jer?|Jr|Jerem|Lamentations|Lam|Lament?|Ezekiel|Ezek?|Ezk|Daniel|Dan?|Dn|Hosea|"+
    //     "Hos?|Joel|Jo|Amos|Am|Obadiah|Obad?|Ob|Jonah|Jon|Jnh|Micah|Mi?c|Nahum|Nah?|"+
    //     "Habakkuk|Ha?b|Habak|Zephaniah|Ze?ph?|Haggai|Ha?g|Hagg|Zechariah|Zech?|Ze?c|"+
    //     "Malachi|Malac?|Ma?l|Mat{1,2}hew|Mat?|Matt?|Mt|Mark?|Mrk?|Mk|Luke|Lu?k|Lk|John?|Jhn|Jo|Jn|"+
    //     "Acts?|Ac|Romans|Rom?|Rm|Corinthians|Cor?|Corin|Galatians|Gal?|Galat|"+
    //     "Ephesians|Eph|Ephes|Philippians|Phili?|Php|Pp|Colossians|Col?|Colos|"+
    //     "Thessalonians|Thess?|Th|Timothy|Tim?|Titus|Tts|Tit?|Philemon|Phm?|Philem|Pm|"+
    //     "Hebrews|Hebr?|James|Jam|Jms?|Jas|Peter|Pete?|Pe|Pt|Jude?|Jd|Ju|Revelations?|Rev?|"+
    //     "Revel";
	var books = _in.fiftytwodays.MALBibleTagger.getBooksRegex(boundaryChar);

    return books;
};

_in.fiftytwodays.MALBibleTagger.doElement = function(elm) {

	var vols = "I+|1st|2nd|3rd|First|Second|Third|1|2|3";
	// Since \\b is used in the regex, it will not match latin characters
	var boundaryChar = "";
    var books = _in.fiftytwodays.MALBibleTagger.getBooks(_in.fiftytwodays.MALBibleTagger.translation, boundaryChar);

	var verse = "\\d+(:\\d+)?(?:\\s?[-â€“â€“&,]\\s?\\d+)*";

    var numberlist = "(\\d+(,\\s?\\d+)*)";
    var passage = "((\\d+(\\.|:)\\d+[-â€“â€“]\\d+(\\.|:)\\d+)|(\\d+(\\.|:)\\d+[-â€“â€“]\\d+)|(\\d+[-â€“â€“]\\d+)|(\\d+(\\.|:)"+numberlist+")|(\\d+))";
    var book = "((?:("+vols+")\\s?)?("+books+")\\.?\\s?)";
    var passagelist = "("+passage + "(;\\s?(?!"+book+")"+passage+")*)";

	var regex = book+passagelist;

    regex = new RegExp(regex, "um");

    var textproc = function(node) {
    	var match = regex.exec(boundaryChar + node.data);
        if (match) {
            var val = match[0];
            if (arguments[1]) {
 				return node;
 			}
 			else {	
	            var node2 = node.splitText(match.index);
	            var node3 = node2.splitText(val.length);
	            var anchor = node.ownerDocument.createElement('A');

	            if (node.parentNode.tagName != 'A') {
	            	anchor.setAttribute('href', 'javascript:{}');
	          	}

	           	anchor.onmouseover = _in.fiftytwodays.MALBibleTagger.linkOnMouseOver;
	           	anchor.onmouseout = _in.fiftytwodays.MALBibleTagger.linkOnMouseOut;
			   	anchor.alt = node2.data;
	            node.parentNode.replaceChild(anchor, node2);
	            anchor.className = 'NETBibleTagged';
	            anchor.appendChild(node2);

	            return anchor;
            }
        }
        else {
            return node;
        }
    };

    __traverseDOM(elm.childNodes[0], 1, textproc);
};

function dataproc(node) {
    var regex = new RegExp("Bible:(.*)", "m");

    var matches = regex.exec(node.getAttribute('ref'));

    var anchor = node.ownerDocument.createElement('A');
    anchor.setAttribute('href', 'javascript:{}');
   	// anchor.onmouseover = getScripture(true);
   	anchor.onmouseover = _in.fiftytwodays.MALBibleTagger.linkOnMouseOver;
   	anchor.onmouseout = _in.fiftytwodays.MALBibleTagger.linkOnMouseOut;
   	anchor.className = 'NETBibleTagged';
   	anchor.appendChild(node.firstChild);
   	anchor.alt = matches[1];
   	//anchor.innerHTML = node.title;
   	node.parentNode.replaceChild(anchor, node);
   //	anchor.appendChild(node.firstChild);
   //	node.appendChild(anchor);
   return anchor;

}

function spanproc(node) {
	if (node.title)	{
		var anchor = node.ownerDocument.createElement('A');
	    anchor.setAttribute('href', 'javascript:{}');
	   	// anchor.onmouseover = getScripture(true);
	   	anchor.onmouseover = _in.fiftytwodays.MALBibleTagger.linkOnMouseOver;
	   	anchor.onmouseout = _in.fiftytwodays.MALBibleTagger.linkOnMouseOut;
	   	anchor.className = 'NETBibleTagged';
	   	anchor.appendChild(node.firstChild);
	   	anchor.alt = node.title;
	   	//anchor.innerHTML = node.title;
	   	node.parentNode.replaceChild(anchor, node);
	   //	anchor.appendChild(node.firstChild);
	   //	node.appendChild(anchor);
	   return anchor;
	}
	else {
		return node;
	}
}

_in.fiftytwodays.MALBibleTagger.doDocument = function() {
    if ((_in.fiftytwodays.MALBibleTagger.element
		&& (e = document.getElementById(_in.fiftytwodays.MALBibleTagger.element)))
		|| (e = document.body)) {
		_in.fiftytwodays.MALBibleTagger.doElement(e);
    }
};

_in.fiftytwodays.MALBibleTagger.init = function() {
	 var onload = 1;
    return onload;
};

_in.fiftytwodays.MALBibleTagger.linkOnMouseOver = function(ev) {
	if (!ev) var ev = window.event;
	var verse = this.alt;//this.childNodes[0].data;			//get the verse text that was moused over

	verse = verse.replace(/â€“/, '-');				//Marc doesn't handle mdashes, replace them
	verse = verse.replace('&nbsp;', " ");
	verse = verse.replace(/\xC2/g, "");
	verse = verse.replace(/\x0A/g, " ");
	verse = verse.replace(/\xA0/g, " ");

	var tip = document.getElementById('nbtDiv');

	if (_in.fiftytwodays.MALBibleTagger.IE) {
		_in.fiftytwodays.MALBibleTagger.xPos = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		_in.fiftytwodays.MALBibleTagger.yPos = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;

		//_in.fiftytwodays.MALBibleTagger.xScreen = document.body.offsetWidth;
		//_in.fiftytwodays.MALBibleTagger.yScreen = document.body.offsetHeight;

		_in.fiftytwodays.MALBibleTagger.xScreen = document.documentElement.clientWidth + document.documentElement.scrollLeft;
		_in.fiftytwodays.MALBibleTagger.yScreen = document.documentElement.clientHeight + document.documentElement.scrollTop;
	}
	else {
		_in.fiftytwodays.MALBibleTagger.xPos = ev.pageX;
		_in.fiftytwodays.MALBibleTagger.yPos = ev.pageY;
		_in.fiftytwodays.MALBibleTagger.xScreen = window.innerWidth-16;
		_in.fiftytwodays.MALBibleTagger.yScreen = window.innerHeight-16+window.pageYOffset;
	}

 	if (tip.offsetWidth != 0 && ((_in.fiftytwodays.MALBibleTagger.xPos+tip.offsetWidth) > _in.fiftytwodays.MALBibleTagger.xScreen)) {
		_in.fiftytwodays.MALBibleTagger.xPos = _in.fiftytwodays.MALBibleTagger.xPos - ((_in.fiftytwodays.MALBibleTagger.xPos + tip.offsetWidth)-_in.fiftytwodays.MALBibleTagger.xScreen);
	}
	if (tip.offsetHeight != 0
		&& ((_in.fiftytwodays.MALBibleTagger.yPos+tip.offsetHeight) > _in.fiftytwodays.MALBibleTagger.yScreen)) {
		_in.fiftytwodays.MALBibleTagger.yPos = _in.fiftytwodays.MALBibleTagger.yPos - ((_in.fiftytwodays.MALBibleTagger.yPos + tip.offsetHeight)-_in.fiftytwodays.MALBibleTagger.yScreen);
	}

	if (_in.fiftytwodays.MALBibleTagger.currentPassage != verse) {
		_in.fiftytwodays.MALBibleTagger.currentPassage = verse;
		_in.fiftytwodays.MALBibleTagger.delayTimer = setTimeout('_in.fiftytwodays.MALBibleTagger.getScripture()', 500);
	}
	else if(_in.fiftytwodays.MALBibleTagger.isVisible
		&& (_in.fiftytwodays.MALBibleTagger.currentPassage == verse)) {
	}
   	else {
		_in.fiftytwodays.MALBibleTagger.currentPassage = verse;
		_in.fiftytwodays.MALBibleTagger.delayTimer = setTimeout('_in.fiftytwodays.MALBibleTagger.getScripture()', 500);
    }
    return false;
};

_in.fiftytwodays.MALBibleTagger.linkOnMouseOut = function(ev) {
	if (!_in.fiftytwodays.MALBibleTagger.isVisible)	{
		clearTimeout(_in.fiftytwodays.MALBibleTagger.delayTimer);
	}
	else if(_in.fiftytwodays.MALBibleTagger.voidOnMouseOut
		&& _in.fiftytwodays.MALBibleTagger.isVisible) {
		_in.fiftytwodays.MALBibleTagger.hideTimer = setTimeout('_in.fiftytwodays.MALBibleTagger.handleMouseOutDelay()', 100);
	}
   	else {
   	}
    return false;
};

_in.fiftytwodays.MALBibleTagger.handleMouseOutDelay = function() {
	if (_in.fiftytwodays.MALBibleTagger.mouseOnDiv == false
		&& _in.fiftytwodays.MALBibleTagger.voidOnMouseOut == true) {
		_in.fiftytwodays.MALBibleTagger.hideTip();
	}
};

_in.fiftytwodays.MALBibleTagger.applyCSS = function() {
	var width, fontFace, fontSize, headerFontColor, contentFontColor, topColor, bottomColor, backgroundColor, headerColor;

	var isSet = function(thing)	{
		if (typeof thing != "null" && thing)
		{
			return true;
		}
		return false;
	};

	var scripts = document.getElementsByTagName("script");
	var cntr = scripts.length;
	while (cntr) {
		var curScript = scripts[cntr-1];
		if (curScript.src.indexOf("tagger.js") != -1) {
			eval(curScript.innerHTML);
			break;
		}
		cntr--;
	}

	var css = '#nbtDiv {';

	if (isSet(width)) {
		css += 'width:'+width+'px;';
	}
	if (isSet(fontFace)) {
		css += 'font-family:"'+fontFace+'";';
	}

	css += '}';

	css += '#verseTarget, #nbtPoweredBy{';

	if (isSet(fontSize)) {
		css += 'font-size:'+fontSize+'px;';
	}
	if (isSet(backgroundColor))	{
		css += 'background-color:#'+backgroundColor+';';
	}
	if (isSet(contentFontColor)) {
		css += 'color: #'+contentFontColor+';';
	}

	css += '}';

	css += '#nbtHeader {';

	if (isSet(headerColor)) {
		css += 'background-color: #'+headerColor+';';
		css += 'background-image: none;';
	}
	else if (isSet(topColor) && isSet(bottomColor)) {
		css += 'background-image: -ms-linear-gradient(top, #'+topColor+' 0%, #'+bottomColor+' 100%);';
		css += 'background-image: -moz-linear-gradient(top, #'+topColor+' 0%, #'+bottomColor+' 100%);';
		css += 'background-image: -o-linear-gradient(top, #'+topColor+' 0%, #'+bottomColor+' 100%);';
		css += 'background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #'+topColor+'), color-stop(1, #'+bottomColor+'));';
		css += 'background-image: -webkit-linear-gradient(top, #'+topColor+' 0%, #'+bottomColor+' 100%);';
		css += 'background-image: linear-gradient(to bottom, #'+topColor+' 0%, #'+bottomColor+' 100%);';
	}

	css += '}';

	css += '#nbtVerseTitle {';

	if (isSet(headerFontColor))	{
		css += 'color: #'+headerFontColor+';';
	}

	css += '}';

	var styleElement = document.getElementById("netbible-netbibletagger-dynamic-style");

	if (navigator.userAgent.match(/MSIE/)) {
		styleElement.styleSheet.cssText = css;
	}
	else {
		styleElement.innerHTML = css;
	}
};

function __decodeQS(qs) {
    var k, v, i1, i2, r = {};
    i1 = qs.indexOf('?');
    i1 = i1 < 0 ? 0 : i1 + 1;
    while ((i1 >= 0) && ((i2 = qs.indexOf('=', i1)) >= 0)) {
        k = qs.substring(i1, i2);
        i1 = qs.indexOf('&', i2);
        v = i1 < 0 ? qs.substring(i2+1) : qs.substring(i2+1, i1++);
        r[unescape(k)] = unescape(v);
    }
    return r;
}

function __traverseDOM(node, depth, textproc) {
    if (_in.fiftytwodays.MALBibleTagger.parseAnchors) {
   		_in.fiftytwodays.MALBibleTagger.skipRe = _in.fiftytwodays.MALBibleTagger.skipRe.replace("|a", '');
    }
    var skipre = new RegExp(_in.fiftytwodays.MALBibleTagger.skipRe, "i");
    var count = 0;
    while (node && depth > 0) {
        count ++;
        if (count >= _in.fiftytwodays.MALBibleTagger.max_nodes) {
            var handler = function() {
                __traverseDOM(node, depth, textproc);
            };
            setTimeout(handler, 50);
            return;
        }

        switch (node.nodeType) {
            case 1: // ELEMENT_NODE
            	if (node.id == 'nbtDiv' || node.id == 'currentBookChapterHolder' || node.classList == 'title-desc-wrapper')
                {
	                break;
                }
            	if ((node.tagName == 'SPAN' || node.tagName == 'CITE') && node.className == 'bibleref')
                {
                	node = spanproc(node);
                	break;
                }
                if (node.tagName == 'DATA' && node.hasAttribute('ref') && node.getAttribute('ref').match(/^Bible:/))
                {
                	node = dataproc(node);
                	break;
                }

                if (node.tagName == 'H2' && node.childNodes.length > 0)
                {
	                textproc(node.childNodes[0], true);
                }

                if (!skipre.test(node.tagName) && node.childNodes.length > 0) {
                    node = node.childNodes[0];
                    depth ++;
                    continue;
                }


                break;
            case 3: // TEXT_NODE
            case 4: // CDATA_SECTION_NODE
                node = textproc(node);
                break;
        }

	    if (node.nextSibling) {
	        node = node.nextSibling;
	    }
	    else {
	        while (depth > 0) {
	        	try {
	            	node = node.parentNode;
	            	depth --;

		            if (node.nextSibling)
		            {
		                node = node.nextSibling;
		                break;
		            }
	            }
	            catch(err) {
  					break;
  				}
	        }
	    }
    }
}

var scripts = document.getElementsByTagName("script");
var cntr = scripts.length;

while (cntr) {
	var curScript = scripts[cntr-1];
	if (curScript.src.indexOf("tagger.js") != -1) {
		eval(curScript.innerHTML);
		break;
	}
	cntr--;
}

var headID = document.getElementsByTagName("head")[0];

if (_in.fiftytwodays.MALBibleTagger.customCSS == false) {
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = 'api/tagger.css';
	cssNode.media = 'screen';
	headID.appendChild(cssNode);
}

var scriptNode = document.createElement('script');
scriptNode.type = 'text/javascript';
scriptNode.src = 'scripts/referenceParser.js';
headID.appendChild(scriptNode);

scriptNode = document.createElement('script');
scriptNode.type = 'text/javascript';
scriptNode.src = 'scripts/scriptureFetcher.js';
headID.appendChild(scriptNode);

var cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.id = 'netbible-netbibletagger-dynamic-style';
headID.appendChild(cssNode);

var NETDiv = document.createElement('div');
NETDiv.id = "nbtDiv";

document.getElementsByTagName('body')[0].appendChild(NETDiv);

NETDiv.innerHTML = '<div id="nbtHeader" class="nbtWidth">'+
                       '<span id="nbtVerseTitle"></span>'+
                       '<a id="nbtClose" href="javascript:{}" onclick="_in.fiftytwodays.MALBibleTagger.hideTip();">'+
				          '<img id="nbtCloseImage" src="https://labs.bible.org/api/NETBibleTagger/v2/images/closeBig.png" style="" title="close" />'+
			           '</a>'+
			        '</div>'+
			        '<div id="nbtContent" class="nbtWidth">'+
                       '<img id="nbtLoading" src="https://labs.bible.org/api/NETBibleTagger/v2/images/loading.gif" style="" />'+
                       '<div id="verseTarget"></div>'+
                    '</div><div id="nbtPoweredBy"><a href="https://github.com/godlytalias/Bible-Database" target="_blank">Bible database</a>, '+ 'Provided by' +' <a href="https://github.com/fiftytwodays">fiftytwodays.in</a></div>';

NETDiv.style.display = 'block';
NETDiv.style.left = "-1000px";
NETDiv.style.top = "-1000px";
NETDiv.style.position="absolute";


NETDiv.onmouseover = _in.fiftytwodays.MALBibleTagger.divOnMouseOver;
NETDiv.onmouseout = _in.fiftytwodays.MALBibleTagger.divOnMouseOut;

if (_in.fiftytwodays.MALBibleTagger.isTouch) {
	var nbtContent = document.getElementById('verseTarget');
	var height = 0;
	var cpos = nbtContent.scrollTop;
	nbtContent.scrollTop = 100000;
	height = nbtContent.scrollTop;
	nbtContent.scrollTop = cpos;
	var fullheight = height + nbtContent.outerHeight;
	var scrollbarV_length = nbtContent.innerHeight*(nbtContent.innerHeight/fullheight)+2;

	var width = 0;
	var lpos = nbtContent.scrollLeft;
	//cont.scrollLeft(100000);
	width = nbtContent.scrollLeft;
	nbtContent.scrollLeft= lpos;

	var nbtHandleTouch = function(e) {
		cpos = nbtContent.scrollTop;
		e = e.touches[0];

		var sY = e.pageY;
		var sX = e.pageX;

		var nbtHandleTouchMove = function(ev) {
			ev.preventDefault();
			ev = ev.touches[0];

			var top = cpos-(ev.pageY-sY);
			var left =  lpos-(ev.pageX-sX);

			nbtContent.scrollTop = top;
			cpos = nbtContent.scrollTop;
			sY = ev.pageY;

			nbtContent.scrollLeft = left;
			lpos = nbtContent.scrollLeft;
			sX = ev.pageX;
		};

		var nbtHandleTouchEnd = function(ev) {
			nbtContent.removeEventListener('touchmove', nbtHandleTouchMove,false);
			nbtContent.removeEventListener('touchend', nbtHandleTouchEnd,false);
		};

		nbtContent.addEventListener('touchmove', nbtHandleTouchMove,false);
		nbtContent.addEventListener('touchend', nbtHandleTouchEnd,false);
	};

	nbtContent.addEventListener('touchstart', nbtHandleTouch,false);
}

_in.fiftytwodays.MALBibleTagger.applyCSS();
_in.fiftytwodays.MALBibleTagger.doDocument();