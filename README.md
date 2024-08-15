# Malayalam Bible Tagger - Malayalam Bible reference tagging for your website
Malayalam Bible Tagger is an innovative way to quote and link to the Bible from your existing scripture references. Plain references turn into hyperlinks which create a small in-line windows (tooltips), when the user mouses over them. This tooltip displays the text in the passage(s) that were referenced.

This project is inspired by [NETBibleTagger](https://labs.bible.org/NETBibleTagger/).

Malayalam Bible Tagger makes citing Malayalam Bible references easier than ever. Simply copy the html code below and paste it into your site's template file(s). Whether you have one web page on your site or thousands, Malayalam Bible Tagger will instantly transform all current and future links, saving you the countless hours it would take to manually tag all of your verses. Should you ever decide to remove Malayalam Bible Tagger, you only have to remove the couple of lines you copied to your template files(s). There are no residual affects left behind. This is because Malayalam Bible Tagger uses Javascript and actually inserts the links after your users have downloaded the page.

## Get the code
NETBibleTagger can be used on most all websites or blogs. All you have to do is copy the below code add it inside the `<head></head>` tag in your page or template file(s).

```
<script type="text/javascript" defer="defer" src="https://fiftytwodays.github.io/malayalam-bible-tagger/api/tagger.js">
</script>
```

Please read the following sections to customize Malayalam Bible Tagger according to your needs.

## Options

### Remove the popup when the mouse leaves a link/popup
The default behavior for the popup is to stay visible on the screen until the user clicks the little 'x' in the top right corner of the popup. It doesn't care where the mouse moves to. However, if you wish for the popup to disappear whenever the mouse leaves, either the link (that was moused over) or the popup, check the box next to this option.

```
<script type="text/javascript" defer="defer" src="https://fiftytwodays.github.io/malayalam-bible-tagger/api/tagger.js">
    _in.fiftytwodays.MALBibleTagger.voidOnMouseOut = true;
</script>
```

### Make tagger work with your existing links
Many sites already have inserted links to https://net.bible.org, https://biblegateway.com, or other sites for their scripture references. By default Malayalam Bible Tagger will not alter these or any other links on your site. However, if you would like to transform your existing links to have the popup shown when the user mouses over the link and have the original link you inserted still function, enable this option.

```
<script type="text/javascript" defer="defer" src="https://fiftytwodays.github.io/malayalam-bible-tagger/api/tagger.js">
    _in.fiftytwodays.MALBibleTagger.parseAnchors = true;
</script>
```

### Override the default CSS and provide your own
Setting `_in.fiftytwodays.MALBibleTagger.customCSS = true;` will cause the default style-sheet to not get loaded. You will then need to copy the css from https://fiftytwodays.github.io/malayalam-bible-tagger/api/tagger.css into your own style-sheet, and make whatever changes you wish.

```
<script type="text/javascript" defer="defer" src="https://fiftytwodays.github.io/malayalam-bible-tagger/api/tagger.js">
    _in.fiftytwodays.MALBibleTagger.customCSS = true;
</script>
```

You can add multiple options together as shown below

```
<script type="text/javascript" defer="defer" src="https://fiftytwodays.github.io/malayalam-bible-tagger/api/tagger.js">
    _in.fiftytwodays.MALBibleTagger.voidOnMouseOut = true;
    _in.fiftytwodays.MALBibleTagger.parseAnchors = true;
</script>
```

## Configure to match your site's theme

Use the below variables to match your site's theme
```
var fontFace = 'Verdana';
var fontSize = 13;
var headerFontColor = '444444';
var contentFontColor = '000000';
var topColor = 'FFFFFF';
var bottomColor = 'D6D6D5';
var headerColor = '';
var backgroundColor = 'FFFFFF';
```

The above variables need to be inserted as below
```
<script type="text/javascript" defer="defer" src="https://fiftytwodays.github.io/malayalam-bible-tagger/api/tagger.js">
    _in.fiftytwodays.MALBibleTagger.voidOnMouseOut = true;
    _in.fiftytwodays.MALBibleTagger.parseAnchors = true;
    var fontFace = 'Verdana';
    var fontSize = 13;
    var headerFontColor = '444444';
    var contentFontColor = '000000';
    var topColor = 'FFFFFF';
    var bottomColor = 'D6D6D5';
    var headerColor = '';
    var backgroundColor = 'FFFFFF';
</script>
```

Please visit https://labs.bible.org/NETBibleTagger/configure to play around. Please note that `src` attribute and variables are different for Malayalam Bible Tagger.

## Demo
Please visit https://fiftytwodays.github.io/malayalam-bible-tagger/ for the demo. 

## Ignore verses
To prevent certain verses from being linked, place the text you want BibleTagger to ignore inside of `<cite></cite>` tags.

## Credits
[NETBibleTagger](https://labs.bible.org/NETBibleTagger/)<br/>
[Bible database](https://github.com/godlytalias/Bible-Database)<br/>
[Obeying Church](https://obeyingchur.ch/)
