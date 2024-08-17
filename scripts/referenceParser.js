function getChapterVerseRanges (verseSegment) {
    const index = verseSegment.indexOf(':');
    if (index !== -1) {
        const chapter = verseSegment.slice(0, index);
        const verseRange = verseSegment.slice(index + 1);
        return [chapter, verseRange];
    } else {
        return([verseSegment]);
    }                                                                                                                                                                 
}

function pushVerseRange (startVerse, endVerse, verses) {
    for (let i = startVerse; i <= endVerse; i++) {
        verses.push({verseNo: i, verseIndex: i-1});
    }
}

function setMultipleChapterVerseRange(result, chapterStart, chapterEnd, verseStart, verseEnd, verses) {
    for (let i = chapterStart; i <= chapterEnd; i++) {
        if (i === chapterStart) {
            result.chapters.push({
                chapter: i,
                verses: [{ start: verseStart, end: i === chapterEnd ? verseEnd : undefined, list: verses }]
            });
        } else if (i === chapterEnd) {
            result.chapters.push({
                chapter: i,
                verses: [{ start: 1, end: verseEnd, list: verses }]
            });
        } else {
            result.chapters.push({
                chapter: i,
                verses: [{ start: 1, end: undefined, list: verses }]
            });
        }
    }
}

function parseBibleReference(reference) {    
    reference = combineSpaces(reference);
    console.log("Reference: ", reference);
    const [bookName, verseSegmentsStr] = splitBookNameAndRest(reference);
    console.log("Book name: ", bookName);
    const result = {
        book: bookName,
        chapters: []
    };

    // Split the reference by semicolon to handle different chapter and verse segments
    const verseSegments = verseSegmentsStr.split(';').map(verseSegment => verseSegment.trim());
    verseSegments.forEach(verseSegment => {
        const chapterVerseRanges = getChapterVerseRanges(verseSegment);

        let chapterStart = parseInt(chapterVerseRanges[0].trim(), 10);

        let verseStart = 0;
        let chapterEnd = 0;
        let verseEnd = 0;
        let verses = [];
        
        // No verse range is present, ex: John 3
        if (chapterVerseRanges.length === 1) {
            chapterEnd = chapterStart;
            verseStart = 1;
            verseEnd = undefined;
        } else if (chapterVerseRanges.length === 2) { // Verse range present, ex: John 3:16
            
            const verseRange = chapterVerseRanges[1].split('-');
            let leftPart = verseRange[0].trim();
            // John 1:2,3,5-7
            if (leftPart.includes(',')) {
                let commaSplit = leftPart.split(',').map(verse => parseInt(verse.trim(), 10));
                if (verseRange.length === 1) {
                    verses = commaSplit;
                } else {
                    verseStart = commaSplit.pop();
                    verses = commaSplit;
                }
            } else {
                verseStart = parseInt(leftPart, 10);
            }                

            // Determine if there is a end verse. For example: 16-18 or 16:18-17:5
            if (verseRange.length === 2) {
                // Determine if the range spans multiple chapters. ex: 16:18-17:5
                const endPart = verseRange[1].split(':');
                if (endPart.length === 2) {
                    chapterEnd = parseInt(endPart[0].trim(), 10);
                    let rightPart = endPart[1].trim();
                    if (rightPart.includes(',')) {
                        let commaSplit = rightPart.split(',').map(verse => parseInt(verse.trim(), 10));
                        verseEnd = commaSplit.shift();
                        verses = verses.concat(commaSplit);
                    } else {
                        verseEnd = parseInt(rightPart, 10);
                    }
                } else {
                    chapterEnd = chapterStart;
                    let rightPart = verseRange[1].trim();
                    if (rightPart.includes(',')) {
                        let commaSplit = rightPart.split(',').map(verse => parseInt(verse.trim(), 10));
                        verseEnd = commaSplit.shift();
                        verses = verses.concat(commaSplit);
                    } else {
                        verseEnd = parseInt(rightPart, 10);
                    }
                }
            } else {
                chapterEnd = chapterStart;
                verseEnd = verseStart;
            }
        }

        if (chapterStart === chapterEnd) {
            result.chapters.push({
                chapter: chapterStart,
                verses: [{start: verseStart, end: verseEnd, list: verses}]
            });
        } else {
            setMultipleChapterVerseRange(result, chapterStart, chapterEnd, verseStart, verseEnd, verses);
        }
    });

    return result;
}

function splitBookNameAndRest(reference) {
	// For reference with spaces in book name, example: 1 John, 2 John etc.
	if (startsWithDigit(reference)) {
		return splitFromNthSpace(reference, 2);
	} else {				
		return splitFromNthSpace(reference, 1);
	} 
}

function splitFromNthSpace(inputString, n) {
    let currentIndex = -1;
    
    for (let i = 0; i < n; i++) {
        currentIndex = inputString.indexOf(' ', currentIndex + 1);
        
        // If the desired space does not exist, return the original string
        if (currentIndex === -1) {
            return [inputString];
        }
    }

    // Split the string at the nth space
    const firstPart = inputString.slice(0, currentIndex);
    const secondPart = inputString.slice(currentIndex + 1);

    return [firstPart, secondPart];
}

function startsWithDigit(inputString) {
	return /^\d/.test(inputString);
}

function combineSpaces(inputString) {
	// Use a regular expression to replace multiple spaces with a single space
	return inputString.replace(/\s+/g, ' ');
}