// $(document).onready(() => {});

$(document).ready(function () {
  // $(document).keyup(function (event) {
  //   if (
  //     event.keyCode === 13 &&
  //     $(':input[type="button"]').attr("disabled") != false
  //   ) {
  //     getResult();
  //   }
  // });

  $(':input[type="button"]').prop("disabled", true);

  $("#numberOfPhrases").bind("change paste keyup", function () {
    if ($("#numberOfWords").val() != "") {
      $(':input[type="button"]').prop("disabled", false);
    }

    if ($(this).val() == "") {
      $(':input[type="button"]').prop("disabled", true);
    }
  });

  $("#numberOfWords").bind("change paste keyup", function () {
    if ($("#numberOfPhrases").val() != "") {
      $(':input[type="button"]').prop("disabled", false);
    }

    if ($(this).val() == "") {
      $(':input[type="button"]').prop("disabled", true);
    }
  });
});

$("#startBtn").click(() => {
  getResult();
});
/*
  Observation:
    For the specified desired output, a general list of words is not needed.
    Simply, the words the user already knows and enough phrases.
*/
function getResult() {
  //take input from user
  let requiredNumberOfPhrases = $("#numberOfPhrases").val();
  let requiredNumberOfWords = $("#numberOfWords").val();
  let requiredPercentage = $("#percentage").val();
  //define session arrays
  let sessionPhrases = new Array();
  let sessionWords = new Array();

  for (let i = 0; i < phrasesArray.length; i++) {
    let newWordsInPhrase = [];
    let phrase = phrasesArray[i];

    if (
      sessionWords.length == requiredNumberOfWords ||
      sessionPhrases.length == requiredNumberOfPhrases
    ) {
      // alert("done");
      break;
    }
    let words = getWordsFromSentence(phrase.TargetLanguagePhrase);

    let numberOfNewWordsInPhrase = 0;
    words.forEach((word) => {
      if (isWordAlreadyKnown(word)) {
        numberOfNewWordsInPhrase++;
        newWordsInPhrase = newWordsInPhrase.concat(word);
      }
    });
    // we calculate percentage of new words in phrase
    percentageOfNewWords = (numberOfNewWordsInPhrase / words.length) * 100;

    //it's possible the same new word is present multiple time in a sentence
    newWordsInPhrase = newWordsInPhrase.filter((item) => item);

    let flag = false;
    for (let j = 0; j < newWordsInPhrase.length; j++) {
      if (!sessionWords.includes([j])) {
        flag = true;
        break;
      }
    }
    if (percentageOfNewWords == requiredPercentage && flag == true) {
      console.log(sessionWords);
      for (let j = 0; j < newWordsInPhrase.length; j++) {
        if (!sessionWords.includes(newWordsInPhrase[j])) {
          sessionWords.push({
            ID: "",
            Word: newWordsInPhrase[j],
            Match: "",
          });
        }
      }
      sessionPhrases.push({
        ID: phrase.ID,
        SourceLanguagePhrase: phrase.SourceLanguagePhrase,
        TargetLanguagePhrase: phrase.TargetLanguagePhrase,
      });
    }

    $("#result").empty();
    sessionPhrases.forEach((p) => {
      var $e = $(
        "<p>" +
          // p.SourceLanguagePhrase +
          // "<br>" +
          p.TargetLanguagePhrase +
          "<br>" +
          "</p>",
        {}
      );
      $e.addClass("sentence");
      $("#result").append($e);
    });
  }

  //highlight all session words
  for (let i = 0; i < sessionWords.length; i++) {
    $("p").wrapInTag({
      tag: "strong",
      words: [sessionWords[i].Word],
    });
  }
}

$.fn.wrapInTag = function (opts) {
  var tag = opts.tag || "strong",
    words = opts.words || [],
    regex = RegExp(words.join("|"), "gi"), // case insensitive
    replacement = "<" + tag + ">$&</" + tag + ">";

  return this.html(function () {
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

function isWordAlreadyKnown(word) {
  for (let j = 0; j < userKnownWords.length; j++) {
    if (userKnownWords[j].Word == word) {
      return true;
    }
  }
  return false;
}

function removeDuplicatesAndEmptyString(items) {
  var uniqueItems = [];
  $.each(items, function (i, el) {
    if ($.inArray(el, uniqueItems) === -1) uniqueItems.push(el);
  });

  uniqueItems = uniqueItems.filter((item) => item);

  return uniqueItems;
}
