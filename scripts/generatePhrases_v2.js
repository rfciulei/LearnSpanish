$("#generateBtn").click(function () {
  /*
    Step 1:
  */
  //take input from user
  let inputPhrasesToStudy = $("#phrasesToStudy").val();
  let inputWordsToStudy = $("#wordsToStudy").val();
  let inputPercentageOfNewWords = $("#percentageOfNewWords").val();
  //define session arrays
  let currentSessionPhrases = new Array();
  let currentSessionWords = new Array();

  /*
    Step 2:
  */
  for (let i = 0; i < dataPhrases_Append_List.length; i++) {
    let tempListOfOPhrases = [];
    let tempListOfWords = [];

    if (currentSessionWords.length == inputWordsToStudy) {
      //you are done
      window.alert("You have all the words you need");
      break;
    } else if (currentSessionPhrases.length == inputPhrasesToStudy) {
      // you are done
      window.alert("You have all the phrases you need");
      break;
    } else {
      //Step A
      tempListOfOPhrases.push({
        ID: dataPhrases_Append_List[i].ID,
        SourceLanguagePhrase: dataPhrases_Append_List[i].SourceLanguagePhrase,
        TargetLanguagePhrase: dataPhrases_Append_List[i].TargetLanguagePhrase,
      });

      console.log(tempListOfOPhrases);

      //Step B
      for (let j = 0; j < currentSessionPhrases.length; j++) {
        //step C
        if (
          tempListOfOPhrases.TargetLanguagePhrase !==
          currentSessionPhrases[j].TargetLanguagePhrase
        ) {
          //Step 3
          for (let k = 0; k < tempListOfOPhrases.length; k++) {
            let wordsFromPhrase = tempListOfOPhrases[
              k
            ].TargetLanguagePhrase.split(new RegExp("\\s"));
            wordsFromPhrase.forEach((currWord) => {
              tempListOfWords.push({
                ID: tempListOfOPhrases[k].TargetLanguagePhrase,
                Word: currWord,
                Match: "0",
              });
            });
            // console.log(wordsFromPhrase);
          }
          //Step 4
          let tempNoMatchWords;
          let tempMatchWords;
          let tempTotalWords;

          tempListOfWords.forEach((element) => {
            for (let z = 0; z < dataWordsArr.length; z++) {
              if (element.Word === dataWordsArr.Word[z]) {
                element.Match = "1";
              }
            }
          });

          tempTotalWords = tempListOfWords.length;
          tempListOfWords.forEach((element) => {
            if (element.Match == "1") {
              tempMatchWords++;
            }
            if (element.Match == "0") {
              tempNoMatchWords++;
            }
            tempTotalWords++;
          });

          if (tempNoMatchWords == 0) {
            tempListOfWords = [];
            tempListOfOPhrases.splice(i, 1);
            tempTotalWords = 0;
          } else {
            let tempPercentageOfNewsWords =
              (tempNoMatchWords / tempTotalWords) * 100;
            if (tempPercentageOfNewsWords >= inputPercentageOfNewWords) {
              currentSessionPhrases.push({
                ID: dataPhrases_Append_List[i].ID,
                SourceLanguagePhrase:
                  dataPhrases_Append_List[i].SourceLanguagePhrase,
                TargetLanguagePhrase:
                  dataPhrases_Append_List[i].TargetLanguagePhrase,
              });
            } else {
              console.log("TO-DO later");
            }
            tempListOfWords.forEach((element) => {
              currentSessionWords.push({
                ID: element.ID,
                Word: element.Word,
                Match: element.Match,
              });
            });
            currentSessionWords = currentSessionWords.filter(
              (value, index) => words.indexOf(value) === index
            );

            tempListOfOPhrases = [];
            tempListOfWords = [];
          }
        }
      }
    }
  }
});
