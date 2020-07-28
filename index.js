var tokenForm = document.querySelector("#tokenForm");
var token = document.querySelector('input');
var reqToken = new XMLHttpRequest();


tokenForm.addEventListener('submit', (e) => {
  e.preventDefault();
  reqToken.open("GET", "https://api.meteo-concept.com/api/location/city?token="+token.value+"&insee=35238", false);
  reqToken.send(null);
  tokenChecking();
  tokenLoader();
});

function tokenChecking ()  {
  switch (reqToken.status) {
    case 403:
      alert("Numéro de Token eronné, veuillez réessayer ou consulter la page d'aide");
      break;
    case 200:
      alert("Identification OK");
      document.location.href="location.html";
      break;
  }
};

function tokenLoader () {
  if (reqToken.status == 200) {
    localStorage.removeItem("token");
    localStorage.setItem("token", token.value);
  }
}
