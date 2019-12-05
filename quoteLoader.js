function loadQuotes(){
  var quotes = new XMLHttpRequest();
  quotes.onreadystatechange = function(){
    if (this.readyState == 3 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      var people = new Array();
      var currentQuotes = new Array();
      var theQuotes = new Array();
      var totalQuotes = 0;
      let correct = 0;
      let counted = 0;
      var quotesArray;
      for (var i = 0; i < myObj.who.length; i ++){
        for (var j = 0; j < myObj.quote.length; j++){
          if (myObj.quote[j].quoteBy === myObj.who[i] && !myObj.quote[j].nsfw){
            correct = 1;
            currentQuotes.push(myObj.quote[j].content)
            totalQuotes++;
          }
        }
        totalQuotes = 0;
        if (correct == 1){
          people[counted] = myObj.who[i];
          counted++;
          correct = 0;
          theQuotes.push(currentQuotes);
          console.log(theQuotes[0]);
          currentQuotes = [];
        }
      }
      for (var k = 0; k < people.length; k++){
        document.getElementById("bod").innerHTML += "<h2>" + people[k] + "</h2>";
        for (var l = 0; l < theQuotes[k].length; l++){
          document.getElementById("bod").innerHTML += "<p>" + theQuotes[k][l] + "</p>";
        }
      }
      //document.getElementById("bod").innerHTML += "</p><h2>" + counted + "</h2>";
    }
  };
  quotes.open("GET", "Data.json", true);
  quotes.send();
}
