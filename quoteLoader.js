function loadQuotes(){
  var quotes = new XMLHttpRequest();
  quotes.onreadystatechange = function(){
    if (this.readyState == 3 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      document.getElementById("bod").innerHTML = document.getElementById("bod").innerHTML + "</p><p>" + quotes.who;
    }
  };
  quotes.open("GET", "Data.json", true);
  quotes.send();
}
