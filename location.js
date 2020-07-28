var locationForm = document.querySelector("#locationForm");
var locationSearch = document.querySelectorAll("input");
var reqLocation = new XMLHttpRequest();
var locationList = document.querySelector("#locationList");


locationForm.addEventListener('submit', (e) => {
  e.preventDefault();
  reqLocation.open("GET", "https://geo.api.gouv.fr/communes?nom="+locationSearch[0].value+"&codeDepartement="+locationSearch[1].value+"&fields=departement&limit=100", false);
  reqLocation.send(null);
  var locationParsed = JSON.parse(reqLocation.responseText);
  locationList.innerHTML = "";
  locationParsed.forEach((location, i) => {
    for (var i = 0; i < 1; i++) {
    var locationResult = document.createElement('button');
    locationResult.innerHTML = location.nom+" "+location.code;
    locationResult.setAttribute("value", location.code);
    locationResult.setAttribute(onclick, "mafonction");
    locationList.appendChild(locationResult);
    }



    locationResult.addEventListener('click' , function () {
      if (confirm("Vouz avez selectionné la ville de "+location.nom)) {
      localStorage.removeItem("location");
      localStorage.removeItem("code");
      localStorage.setItem("location", location.nom);
      localStorage.setItem("code", location.code);
      document.location.href="weather.html";
    }
    else {  };
  });
  });


  //  console.log(locationList);




  });
