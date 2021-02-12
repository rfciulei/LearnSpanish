// $(document).onready(() => {});

$(document).ready(function () {
  $(document).keyup(function (event) {
    if (
      event.keyCode === 13 &&
      $(':input[type="button"]').attr("disabled") != false
    ) {
      $("#startBtn").click();
    }
  });

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

function getResult() {
  console.clear();
  //take input from user
  let requiredNumberOfPhrases = $("#numberOfPhrases").val();
  let requiredNumberOfWords = $("#numberOfWords").val();
  let requiredPercentage = $("#percentage").val();
  //define session arrays
  let sessionPhrases = new Array();
  let sessionWords = new Array();
  // console.log(requiredNumberOfWords + " " + requiredNumberOfWords + " " + requiredPercentage + "%");

  let tempPhrases = [];
  let tempNewWords = [];

  phrasesArray.forEach((phrase) => {
    if (
      tempNewWords.length == requiredNumberOfWords ||
      tempPhrases.length == requiredNumberOfPhrases
    ) {
      // alert("done.");
      return false;
    }

    let words = phrase.TargetLanguagePhrase.split(
      new RegExp("\\s|\\?|\\.|\\!|,")
    );
    //remove empty words
    words.forEach((word) => {
      if (word == "") {
        words.splice(words.indexOf(word), 1);
      }
    });

    let newWordsInPhrase = 0;
    words.forEach((word) => {
      for (let j = 0; j < userKnownWords.length; j++) {
        if (userKnownWords[j].Word == word) {
          newWordsInPhrase++;
          tempNewWords.concat(word);
        }
      }
    });
    // remove duplicates from phrase (if any)
    words.filter((word, index) => {
      words.indexOf(word) === index;
    });
    // then we calculate percentage of new words in phrase
    percentageOfNewWords = (newWordsInPhrase / words.length) * 100;

    // remove duplicates from all found new words
    tempNewWords.filter((tempNewWords, index) => {
      tempNewWords.indexOf(tempNewWords) === index;
    });

    if (percentageOfNewWords == requiredPercentage) {
      tempPhrases.push({
        ID: phrase.ID,
        SourceLanguagePhrase: phrase.SourceLanguagePhrase,
        TargetLanguagePhrase: phrase.TargetLanguagePhrase,
      });
      console.log(
        "phrase: " +
          phrase.TargetLanguagePhrase +
          "\n" +
          "words: " +
          words +
          "\nnew words: " +
          tempNewWords +
          "\npercentage of new words: " +
          percentageOfNewWords
      );
    }
  });
  console.log(tempPhrases);
}
