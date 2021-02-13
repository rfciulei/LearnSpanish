function removeDuplicatesAndEmptyString(items) {
  var uniqueItems = [];
  $.each(items, function (i, el) {
    if ($.inArray(el, uniqueItems) === -1) uniqueItems.push(el);
  });

  uniqueItems = uniqueItems.filter((item) => item);

  return uniqueItems;
}

$.fn.wrapInTag = function (opts) {
  let tag = opts.tag || "strong",
    words = opts.words || [],
    regex = RegExp(words.join("|")), // case insensitive
    replacement = "<" + tag + ">$&</" + tag + ">";

  this.html(function () {
    return $(this).text().replace(regex, replacement);
  });
};

//must redo
//attention to regex for multiple languages !!
function getWordsFromSentence(sentence) {
  let words = sentence.split(new RegExp("\\s|\\?|\\.|\\!|\\,"));
  //empty spaces
  words = words.filter((word) => word);

  return words;
}
