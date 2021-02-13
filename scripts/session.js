$(document).ready(function () {
  /*
    Setting some properties for the buttons
  */
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

  $("#startBtn").click(() => {
    updateSession();
  });

  $("#clear").click(() => {
    $("#result").empty();
  });
});

function updateSession() {
  //define session arrays
  let sessionPhrases = [];
  let sessionWords = [];

  let requiredNumberOfPhrases = $("#numberOfPhrases").val();
  let requiredNumberOfWords = $("#numberOfWords").val();
  let requiredPercentage = $("#percentage").val();

  for (let i = 0; i < phrasesArray.length; i++) {
    let phrase = phrasesArray[i];
    let newWordsInPhrase = [];

    //stop whenever first 2 criteria are met
    if (
      sessionWords.length == requiredNumberOfWords ||
      sessionPhrases.length == requiredNumberOfPhrases
    ) {
      // alert("done");
      break;
    }

    // for each phrase we get we will separate all the words
    let words = getWordsFromSentence(phrase.TargetLanguagePhrase);
    // and then we find the new words in the phrase and we count them
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

    // let flag = false;
    // for (let j = 0; j < newWordsInPhrase.length; j++) {
    //   if (!sessionWords.includes([j])) {
    //     flag = true;
    //     break;
    //   }
    // }
    if (percentageOfNewWords == requiredPercentage) {
      for (let j = 0; j < newWordsInPhrase.length; j++) {
        if (!sessionWords.includes(newWordsInPhrase[j])) {
          sessionWords.push({
            ID: "",
            Word: newWordsInPhrase[j],
            Match: "1",
          });
        }
      }
      sessionPhrases.push({
        ID: phrase.ID,
        SourceLanguagePhrase: phrase.SourceLanguagePhrase,
        TargetLanguagePhrase: phrase.TargetLanguagePhrase,
      });
    }
  }
  plotSentences(sessionPhrases, sessionWords);
}

function plotSentences(sessionPhrases, sessionWords) {
  if (sessionPhrases.length > 0) {
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

    if (sessionWords.length != 0) {
      let w = [];
      for (let j = 0; j < sessionWords.length; j++) {
        w.push(sessionWords[j].Word);
      }

      $("p").wrapInTag({
        tag: "strong",
        words: w,
      });
    }
  }
  if (sessionPhrases.length == 0) {
    $("#result").empty();
  }
}

function isWordAlreadyKnown(word) {
  for (let j = 0; j < userKnownWords.length; j++) {
    if (userKnownWords[j].Word == word) {
      return true;
    }
  }
  return false;
}
