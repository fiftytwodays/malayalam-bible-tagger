const malyalamBibleBooks = [
	"ഉല്പത്തി", "പുറപ്പാട്", "ലേവ്യപുസ്തകം", "സംഖ്യാപുസ്തകം", "ആവർത്തനം", "യോശുവ", "ന്യായാധിപന്മാർ",
	"രൂത്ത്", "1 ശമൂവേൽ", "2 ശമൂവേൽ", "1 രാജാക്കന്മാർ", "2 രാജാക്കന്മാർ", "1 ദിനവൃത്താന്തം",
	"2 ദിനവൃത്താന്തം", "എസ്രാ", "നെഹെമ്യാവു", "എസ്ഥേർ", "ഇയ്യോബ്", "സങ്കീർത്തനങ്ങൾ",
	"സദൃശ്യവാക്യങ്ങൾ", "സഭാപ്രസംഗി", "ഉത്തമഗീതം", "യെശയ്യാ", "യിരമ്യാവു", "വിലാപങ്ങൾ",
	"യെഹേസ്കേൽ", "ദാനീയേൽ", "ഹോശേയ", "യോവേൽ", "ആമോസ്", "ഓബദ്യാവു", "യോനാ",
	"മീഖാ", "നഹൂം", "ഹബക്കൂക്ക്", "സെഫന്യാവു", "ഹഗ്ഗായി", "സെഖര്യാവു", "മലാഖി", "മത്തായി",
	"മർക്കൊസ്", "ലൂക്കോസ്", "യോഹന്നാൻ", "പ്രവൃത്തികൾ", "റോമർ", "1 കൊരിന്ത്യർ", "2 കൊരിന്ത്യർ",
	"ഗലാത്യർ", "എഫെസ്യർ", "ഫിലിപ്പിയർ", "കൊലൊസ്സ്യർ", "1 തെസ്സലൊനീക്യർ", "2 തെസ്സലൊനീക്യർ",
	"1 തിമൊഥെയൊസ്", "2 തിമൊഥെയൊസ്", "തീത്തൊസ്", "ഫിലേമോൻ", "എബ്രായർ", "യാക്കോബ്",
	"1 പത്രൊസ്", "2 പത്രൊസ്", "1 യോഹന്നാൻ", "2 യോഹന്നാൻ", "3 യോഹന്നാൻ","യൂദാ", "വെളിപ്പാട്"
];

let bibleData = null;

loadBibleData = async function () {
	// Data Source: https://github.com/godlytalias/Bible-Database/tree/master/Malayalam
	try {
		const response = await fetch('https://raw.githubusercontent.com/godlytalias/Bible-Database/master/Malayalam/bible.json')
		bibleData = await response.json();
	} catch (error) {
		console.error('Error fetching JSON:', error);
	}
};

getVerses = async function (verseReference) {

    try {
        if (bibleData == null) {		
            console.log("Loading bible data");
            await loadBibleData();
            console.log("Bible data loaded");
        } 
    } catch(err) {
		console.error(err);
		return `<div style="color: red; margin-bottom: 5px;">Error while loading bible data!</div>`;
	}
	verseReference = verseReference.trim();
    let bibleReferences = parseBibleReference(verseReference);
    console.log(JSON.stringify(bibleReferences, null, 2));

    const bookObject = bibleData.Book[getNumberFromBookName(bibleReferences.book)];
	let verseContent = '';

    try {
        bibleReferences.chapters.forEach(chapter => {
            const chapterObj = bookObject.Chapter[chapter.chapter - 1];
            const verseSet = chapter.verses;
            verseSet.forEach(verseRange => {
                const verses = getVerse(verseRange, chapterObj);
                verses.forEach(verse => {
                    verseContent += `<div style="margin-bottom: 5px;"><b>${chapter.chapter}:${verse.no}</b> ${verse.verse}</div>`;
                });
            });
        });
    } catch(err) {
		console.error(err);
		verseContent += `<div style="color: red; margin-bottom: 5px;">Error while loading verse(s)!</div>`;
	}
	return verseContent;
};

function getNumberFromBookName(bookName) {
	return malyalamBibleBooks.indexOf(bookName);
}

function getVerse(verseRange, chapterObj) {
    let verses = [];
    let start = verseRange.start;
    let end = verseRange.end;
    let list = verseRange.list;
    if (end === undefined) {
        end = chapterObj.Verse.length;
    }
    if (start > 0) {
        for (let i = start-1; i < end; i++) {
            verses.push({"no": i+1, "verse": chapterObj.Verse[i].Verse});
        }
    }
    list.forEach(verseNo => {
        verses.push({"no": verseNo, "verse": chapterObj.Verse[verseNo-1].Verse});
    });
    return verses;
}