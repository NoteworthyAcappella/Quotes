/*
I see you've found the source code for the Noteworthy quotes page. Good for you, I guess. 
This parses the quotes found at https://www.noteworthylhs.ml/Quotes/Data.json
As new people join, add them to the array on line 2 of that file.
New quotes should have the following format:

  {
    "quoteBy":[name of person quoted, matching their name in the array],[endline character optional]
    "content":[the quote]
    "nsfw":[boolean value, true if an NSFW quote that shouldn't be on easy-to-find page.]
  },

Feel free to make edits to this code. If something breaks, I will keep a copy of a working version of this page. However, I recommend
If something breaks, contact 312wls@gmail.com and I can send you the original file.
PLEASE DO NOT DELETE OLD QUOTES!!! If people join who share the same name, I can help code something to differentiate between them.

*/

function loadQuotes(){
  var quotes = new XMLHttpRequest();
  quotes.onreadystatechange = function(){
    if (this.readyState == 3 && this.status == 200) {
      var myObj = JSON.parse(this.responseText); // js object with quotes
      var people = new Array(); // array to be filled with only the people who have quotes
      var currentQuotes = new Array(); // array to be filled with quotes by only a single person before being erased
      var theQuotes = new Array(); // array to become 2d by pushing each currentQuotes array into the same index as that person in people
      let correct = 0; // gets set to 1 if someone has a quote
      let counted = 0; //counts the number of people who have quotes. Used for indexing people.
      for (var i = 0; i < myObj.who.length; i ++){ // index through people
        for (var j = 0; j < myObj.quote.length; j++){ // index through quotes
          if (myObj.quote[j].quoteBy === myObj.who[i] && !myObj.quote[j].nsfw){ // checks who said quote at the index and to see that it's not marked as NSFW
            correct = 1; // acknowledges that the person at myObj.who[i] has quotes
            currentQuotes.push(myObj.quote[j].content) // add quote to current quotes array
          }
        }
        if (correct == 1){ // checks if the person in position j has quotes
          people[counted] = myObj.who[i]; // this should just be people.push() but oh well I guess
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
      document.getElementById("bod").innerHTML += "<div class=\"home\"><a href=\"https://www.noteworthylhs.ml/\"><img src=\"https://www.noteworthylhs.ml/nworth-n-w-background.png\"; hight=100px; width=100px; alt=\"home\"></img></a></div>"
    }
  };
  quotes.open("GET", "Data.json", true);
  quotes.send();
}

function loadQuotesNsfw(){ //same as other function, except
  var quotes = new XMLHttpRequest();
  quotes.onreadystatechange = function(){
    if (this.readyState == 3 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      var people = new Array();
      var currentQuotes = new Array();
      var theQuotes = new Array();
      let correct = 0;
      let counted = 0;
      for (var i = 0; i < myObj.who.length; i ++){
        for (var j = 0; j < myObj.quote.length; j++){
          if (myObj.quote[j].quoteBy === myObj.who[i]){ // checks who said quote at the index but this time not to see that it's not marked as NSFW
            correct = 1;
            currentQuotes.push(myObj.quote[j].content)
          }
        }
        if (correct == 1){ // checks if the person in position j has quotes
          people[counted] = myObj.who[i]; // this should just be people.push() but oh well I guess
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
      document.getElementById("bod").innerHTML += "<div class=\"home\"><a href=\"https://www.noteworthylhs.ml/\"><img src=\"https://www.noteworthylhs.ml/nworth-n-w-background.png\"; hight=100px; width=100px; alt=\"home\"></img></a></div>"
    }
  };
  quotes.open("GET", "Data.json", true);
  quotes.send();
}
