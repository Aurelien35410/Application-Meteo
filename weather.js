var town = document.querySelector("#town");
var todayWeather = document.querySelector("#todayWeather");
var yesterdayWeather = document.querySelector("#yesterdayWeather");
var weekWeather = document.querySelector("#weekWeather");
var reqToday = new XMLHttpRequest();
var reqYesterday = new XMLHttpRequest();
var reqWeek = new XMLHttpRequest();
var code = localStorage.getItem("code");
var token = localStorage.getItem("token");
var requestResponse;  // A Supprimer??
var weatherDisplay = document.querySelector("#weatherDisplay");
var weatherGlobal;
var cardinalWindDirection;
var cardinalWindDirectionForWeek;
var weatherText;
var windDirectionValue;
var weatherDisplayElement;
var weatherDiv;
var weatherImage;
var weatherDescription;
var temperatureDiv;
var temperatureMaxDiv;
var temperatureMinDiv;
var windDiv;
var windDirection;
var windAverage;
var windGust;
var windGustThunderstorm;
var windProba70;
var windProba100;
var rainDiv;
var rainProba;
var rainMax;
var rainAverage;
var otherDiv;
var evapotranspiration;
var fogProba;
var frostProba;
var sunshine;


town.innerHTML = localStorage.getItem("location");

todayWeather.addEventListener('submit' , (e) => {
  weatherGlobal = ""; // Initialisation de la variable weatherGlobal
  e.preventDefault();
  alert("Demande de météo d'aujourd'hui en cours...");
  reqToday.open("GET", "https://api.meteo-concept.com/api/forecast/daily/0?token="+token+"&insee="+code, false);
  reqToday.send(null);
  weatherGlobal = JSON.parse(reqToday.responseText);
  weatherDisplay.innerHTML = "";

  createGeneralElement (); // Création de l'élément général météo (duplicable si plusieurs jours)

  createWeatherDescriptionElement ();  // Création de l'élément description (description du temps + icones);

  createTemperatureElement();  // Création de l'élément température

  createWindElement();  // Création de l'élément température

  createRainElement(); // Création de l'élément Pluie

  createOtherELement(); // Création de l'élément "autre"

  weatherTextDescription(); // Création du texte de météo et icone en fonction du code météo

  cardinalPoint(); // Calcul du point cardinal du vent en fonction de l'angle

  weatherDescription.innerHTML = "Météo du jour: "+weatherText;

  windDirection.innerHTML = "Direction du vent: "+cardinalWindDirection+" ("+weatherGlobal.forecast.dirwind10m+"°)";

});

yesterdayWeather.addEventListener('submit' , (e) => {
  weatherGlobal = ""; // Initialisation de la variable weatherGlobal
  e.preventDefault();
  alert("Demande de météo de demain en cours...");
  reqYesterday.open("GET", "https://api.meteo-concept.com/api/forecast/daily/1?token="+token+"&insee="+code, false);
  reqYesterday.send(null);
  weatherGlobal = JSON.parse(reqYesterday.responseText);
  weatherDisplay.innerHTML = "" ;
  createGeneralElement (); // Création de l'élément général météo (duplicable si plusieurs jours)

  createWeatherDescriptionElement ();  // Création de l'élément description (description du temps + icones);

  createTemperatureElement();  // Création de l'élément température

  createWindElement();  // Création de l'élément température

  createRainElement(); // Création de l'élément Pluie

  createOtherELement(); // Création de l'élément "autre"

  weatherTextDescription(); // Création du texte de météo et icone en fonction du code météo

  cardinalPoint(); // Calcul du point cardinal du vent en fonction de l'angle

  weatherDescription.innerHTML = "Météo du jour: "+weatherText;

  windDirection.innerHTML = "Direction du vent: "+cardinalWindDirection+" ("+weatherGlobal.forecast.dirwind10m+"°)";

});

weekWeather.addEventListener('submit' , (e) => {
  weatherGlobal = ""; // Initialisation de la variable weatherGlobal
  weatherDisplay.innerHTML = "" ;
  e.preventDefault();
  alert("météo des 14 prochains jours");
  reqWeek.open("GET", "https://api.meteo-concept.com/api/forecast/daily?token="+token+"&insee="+code, false);
  reqWeek.send(null);
  weatherParsed = JSON.parse(reqWeek.responseText);
  var weatherArray = weatherParsed.forecast;
    for (var i = 0; i < weatherArray.length; i++) {
     weatherGlobal = weatherArray[i];
    windDirectionValue = weatherGlobal.dirwind10m;
    createGeneralElementForWeek (); // Création de l'élément général météo (duplicable si plusieurs jours)
    createWeatherDescriptionElementForWeek ();  // Création de l'élément description (description du temps + icones);
    createTemperatureElementForWeek ();  // Création de l'élément température
    createWindElementForWeek ();  // Création de l'élément température
    createRainElementForWeek (); // Création de l'élément Pluie
    createOtherELementForWeek (); // Création de l'élément "autre"
    weatherTextDescriptionForWeek (); // Création du texte de météo et icone en fonction du code météo
    cardinalPointForWeek (); // Calcul du point cardinal du vent en fonction de l'angle
    weatherDescription.innerHTML = "Météo du jour: "+weatherText;
    windDirection.innerHTML = "Direction du vent: "+cardinalWindDirectionForWeek+" ("+weatherGlobal.dirwind10m+"°)";
    temperatureMaxDiv.innerHTML = "Max: "+weatherGlobal.tmax+"°C";
    temperatureMinDiv.innerHTML = "Min: "+weatherGlobal.tmin+"°C";
    windAverage.innerHTML = "Vitesse moyenne du vent: "+weatherGlobal.wind10m+"km/h";
    windGust.innerHTML = "Rafale de vent: "+weatherGlobal.gust10m+"km/h";
    windGustThunderstorm.innerHTML = "Rafale de vent sous orage: "+weatherGlobal.gustx+"km/h";
    windProba70.innerHTML = "Probabilité de vent supérieur à 70km/h: "+weatherGlobal.probawind70+"%";
    windProba100.innerHTML = "Probabilité de vent supérieur à 100km: "+weatherGlobal.probawind100+"%";
    rainProba.innerHTML = "Probabilité de pluie: "+weatherGlobal.probarain+"%";
    rainMax.innerHTML = "Cumul de pluie maximal: "+weatherGlobal.rr1+"mm";
    rainAverage.innerHTML = "Cumul de pluie moyen: "+weatherGlobal.rr10+"mm";
    evapotranspiration.innerHTML = "Evapotranspiration: "+weatherGlobal.etp+"mm";
    fogProba.innerHTML = "Probabilité de brouillard: "+weatherGlobal.probafog+"%";
    frostProba.innerHTML = "Probabilité de gel: "+weatherGlobal.probafrost+"%";
    sunshine.innerHTML = "Durée d'ensoleillement: "+weatherGlobal.sun_hours+"h";
  };
});

function createGeneralElement () {
  weatherDisplayElement = document.createElement('div');  // Création de l'encadré météo global (duplicable si plusieurs jours)
  weatherDisplayElement.setAttribute("name", "weatherDisplayElement");
  weatherDisplayElement.className = "weatherDisplayElement"
  weatherDisplay.appendChild(weatherDisplayElement);
};

function createWeatherDescriptionElement () {
  weatherDiv = document.createElement('div');  // Création de l'élément météo
  weatherDiv.setAttribute("name", "weatherDiv");
  weatherDiv.className = "weatherDiv";
  weatherDisplayElement.appendChild(weatherDiv);
  weatherImage = document.createElement('img');  //  Création de l'élément image
  weatherDiv.appendChild(weatherImage);
  weatherDescription = document.createElement('div');   // Création de l'élément description
  weatherDescription.setAttribute("name", "weatherDescription");
  weatherDescription.className = "weatherDescription";
  weatherDiv.appendChild(weatherDescription);
};

function createTemperatureElement () {
  temperatureDiv = document.createElement('div');  // Création de l'élément température
  temperatureDiv.setAttribute("name", "temperatureDiv");
  temperatureDiv.className = "temperatureDiv";
  weatherDisplayElement.appendChild(temperatureDiv);
  temperatureMaxDiv = document.createElement('div');    // Création de l'élément température maximale
  temperatureMaxDiv.setAttribute("name", "temperatureMaxDiv");
  temperatureMaxDiv.className = "temperatureMaxDiv";
  temperatureDiv.appendChild(temperatureMaxDiv);
  temperatureMaxDiv.innerHTML = "Max: "+weatherGlobal.forecast.tmax+"°C";
  temperatureMinDiv = document.createElement('div');    // Création de l'élément température minimale
  temperatureMinDiv.setAttribute("name", "temperatureMinDiv");
  temperatureMinDiv.className = "temperatureMinDiv";
  temperatureDiv.appendChild(temperatureMinDiv);
  temperatureMinDiv.innerHTML = "Min: "+weatherGlobal.forecast.tmin+"°C";
};

function createWindElement () {
  windDiv = document.createElement('div');  //  Création de l'élément vent
  windDiv.setAttribute("name", "windDiv");
  windDiv.className = "windDiv";
  weatherDisplayElement.appendChild(windDiv);
  windDirection = document.createElement('div');    // Création de l'élément direction du vent
  windDirection.setAttribute("name", "windDirection");
  windDirection.className = "windDirection";
  windDiv.appendChild(windDirection);
  windAverage = document.createElement('div');    //Création de l'élément vitesse moyenne du vent
  windAverage.setAttribute("name", "windAverage");
  windAverage.className = "windAverage";
  windDiv.appendChild(windAverage);
  windAverage.innerHTML = "Vitesse moyenne du vent: "+weatherGlobal.forecast.wind10m+"km/h";
  windGust = document.createElement('div');   // Création de l'élément rafale de vent
  windGust.setAttribute("name", "windGust");
  windGust.className = "windGust";
  windDiv.appendChild(windGust);
  windGust.innerHTML = "Rafale de vent: "+weatherGlobal.forecast.gust10m+"km/h";
  windGustThunderstorm = document.createElement('div');   // Création de l'élément rafale de vent sous orage
  windGustThunderstorm.setAttribute("name", "windGustThunderstorm");
  windGustThunderstorm.className = "windGustThunderstorm";
  windDiv.appendChild(windGustThunderstorm);
  windGustThunderstorm.innerHTML = "Rafale de vent sous orage: "+weatherGlobal.forecast.gustx+"km/h";
  windProba70 = document.createElement('div');    // Création de l'élément probabilité de vent supérieur à 70km/h
  windProba70.setAttribute("name", "windProba70");
  windProba70.className = "windProba70";
  windDiv.appendChild(windProba70);
  windProba70.innerHTML = "Probabilité de vent supérieur à 70km/h: "+weatherGlobal.forecast.probawind70+"%";
  windProba100 = document.createElement('div');   // Création de l'élément probabilité de rafale de vent supéreieur a 100km/h
  windProba100.setAttribute("name", "windProba100");
  windProba100.className = "windProba100";
  windDiv.appendChild(windProba100);
  windProba100.innerHTML = "Probabilité de vent supérieur à 100km: "+weatherGlobal.forecast.probawind100+"%";
};

function createRainElement () {
  rainDiv = document.createElement('div');  // Création de l'élément pluie
  rainDiv.setAttribute("name", "rainDiv");
  rainDiv.className = "rainDiv";
  weatherDisplayElement.appendChild(rainDiv);
  rainProba = document.createElement('div');    // Création de l'élément probabilité de pluie
  rainProba.setAttribute("name", "rainProba");
  rainProba.className = "rainProba";
  rainDiv.appendChild(rainProba);
  rainProba.innerHTML = "Probabilité de pluie: "+weatherGlobal.forecast.probarain+"%";
  rainMax = document.createElement('div');    // Création de l'élément cumul de pluie maximale
  rainMax.setAttribute("name", "rainMax");
  rainMax.className = "rainMax";
  rainDiv.appendChild(rainMax);
  rainMax.innerHTML = "Cumul de pluie maximal: "+weatherGlobal.forecast.rr1+"mm";
  rainAverage = document.createElement('div');    // Création de l'élément moyenne de pluie sur la journée
  rainAverage.setAttribute("name", "rainAverage");
  rainAverage.className = "rainAverage";
  rainDiv.appendChild(rainAverage);
  rainAverage.innerHTML = "Cumul de pluie moyen: "+weatherGlobal.forecast.rr10+"mm";
};

function createOtherELement () {
  otherDiv =  document.createElement('div');  // Création de l'élément "autre"
  otherDiv.setAttribute("name", "otherDiv");
  otherDiv.className = "otherDiv";
  weatherDisplayElement.appendChild(otherDiv);
  evapotranspiration = document.createElement('div');   // Création de l'élément évapotranspiration
  evapotranspiration.setAttribute("name", "evapotranspiration");
  evapotranspiration.className = "evapotranspiration";
  otherDiv.appendChild(evapotranspiration);
  evapotranspiration.innerHTML = "Evapotranspiration: "+weatherGlobal.forecast.etp+"mm";
  fogProba= document.createElement('div');    // Création de l'élément probabilité de Brouillard
  fogProba.setAttribute("name", "fogProba");
  fogProba.className = "fogProba";
  otherDiv.appendChild(fogProba);
  fogProba.innerHTML = "Probabilité de brouillard: "+weatherGlobal.forecast.probafog+"%";
  frostProba = document.createElement('div');   // Création de l'élément probabilité de Gel
  frostProba.setAttribute("name", "frostProba");
  frostProba.className = "frostProba";
  otherDiv.appendChild(frostProba);
  frostProba.innerHTML = "Probabilité de gel: "+weatherGlobal.forecast.probafrost+"%";
  sunshine = document.createElement('div');   // Création de l'élément ensoleillement
  sunshine.setAttribute("name", "sunshine");
  sunshine.className = "sunshine";
  otherDiv.appendChild(sunshine);
  sunshine.innerHTML = "Durée d'ensoleillement: "+weatherGlobal.forecast.sun_hours+"h";
};

function weatherTextDescription(){
  switch (weatherGlobal.forecast.weather) {
    case 0:
       weatherText = "Grand Soleil";
      weatherImage.src = "img/icones/soleil.png";
      break;
    case 1:
       weatherText = "Peu Nuageux";
      weatherImage.src = "img/icones/nuageux.png";
      break;
    case 2:
       weatherText = "Ciel voilé";
      weatherImage.src = "img/icones/nuageux.png";
    break;
    case 3:
       weatherText = "Nuageux";
      weatherImage.src = "img/icones/nuageux.png";
      break;
    case 4:
       weatherText = "Très nuageux";
      weatherImage.src = "img/icones/nuageux.png";
      break;
    case 5:
       weatherText = "Couvert";
      weatherImage.src = "img/icones/tres_nuageux.png";
      break;
    case 6:
       weatherText = "Brouillard";
      weatherImage.src = "img/icones/brouillard.png";
      break;
    case 7:
       weatherText = "Brouillard givrant";
      weatherImage.src = "img/icones/brouillard_givrant.png";
      break;
    case 10:
       weatherText = "Pluie faible";
      weatherImage.src = "img/icones/faible_averse.png";
      break;
    case 11:
       weatherText = "Pluie modérée";
      weatherImage.src = "img/icones/moyenne_averse.png";
      break;
    case 12:
       weatherText = "Pluie forte";
      weatherImage.src = "img/icones/forte_averse.png";
      break;
    case 13:
       weatherText = "Pluie faible verglaçante";
       weatherImage.src = "img/icones/pluie_faible_verglacante.png";
      break;
    case 14:
       weatherText = "Pluie modérée verglaçante";
       weatherImage.src = "img/icones/pluie_moyenne_verglacante.png";
      break;
    case 15:
       weatherText = "Pluie forte verglaçante";
       weatherImage.src = "img/icones/pluie_moyenne_verglacante.png";
      break;
    case 16:
       weatherText = "Bruine";
      break;
    case 20:
       weatherText = "Neige faible";
      break;
    case 21:
       weatherText = "Neige modérée";
      break;
    case 22:
       weatherText = "Neige forte";
      break;
    case 30:
       weatherText = "Pluie et neige mêlées faibles";
      break;
    case 31:
       weatherText = "Pluie et neige mêlées modérées";
      break;
    case 32:
       weatherText = "Pluie et neige mêlées fortes";
      break;
    case 40:
       weatherText = "Averses de pluie locales et faibles";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 41:
       weatherText = "Averses de pluie locales";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 42:
       weatherText = "Averses locales et fortes";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 43:
       weatherText = "Averses de pluie faibles";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 44:
       weatherText = "Averses de pluie";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 45:
       weatherText = "Averses de pluie fortes";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 46:
       weatherText = "Averses de pluie faibles et fréquentes";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 47:
       weatherText = "Averses de pluie fréquentes";
       weatherImage.src = "img/icones/pluie.png";
    break;
    case 48:
       weatherText = "Averses de pluie fortes et fréquentes";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 60:
       weatherText = "Averses de neige localisées et faibles";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 61:
       weatherText = "Averses de neige localisées";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 62:
       weatherText = "Averses de neige localisées et fortes";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 63:
       weatherText = "Averses de neige faibles";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 64:
       weatherText = "Averses de neige";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 65:
       weatherText = "Averses de neige fortes";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 66:
       weatherText = "Averses de neige faibles et fréquentes";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 67:
       weatherText = "Averses de neige fréquentes";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 68:
       weatherText = "Averses de neige fortes et fréquentes";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 70:
       weatherText = "Averses de pluie et neige mêlées localisées et faibles";
      break;
    case 71:
       weatherText = "Averses de pluie et neige mêlées localisées";
      break;
    case 72:
       weatherText = "Averses de pluie et neige mêlées localisées et fortes";
      break;
    case 73:
       weatherText = "Averses de pluie et neige mêlées faibles";
      break;
    case 74:
       weatherText = "Averses de pluie et neige mêlées";
      break;
    case 75:
       weatherText = "Averses de pluie et neige mêlées fortes";
      break;
    case 76:
       weatherText = "Averses de pluie et neige mêlées faibles et nombreuses";
      break;
    case 77:
       weatherText = "Averses de pluie et neige mêlées fréquentes";
      break;
    case 78:
       weatherText = "Averses de pluie et neige mêlées fortes et fréquentes";
      break;
    case 100:
       weatherText = "Orages faibles et locaux";

      break;
    case 101:
       weatherText = "Orages locaux";
      break;
    case 102:
       weatherText = "Orages fort et locaux";
      break;
    case 103:
       weatherText = "Orages faibles";
      break;
    case 104:
       weatherText = "Orages";
      break;
    case 105:
       weatherText = "Orages forts";
      break;
    case 106:
       weatherText = "Orages faibles et fréquents";
      break;
    case 107:
       weatherText = "Orages fréquents";
      break;
    case 108:
       weatherText = "Orages forts et fréquents";
      break;
    case 120:
       weatherText = "Orages faibles et locaux de neige ou grésil";
      break;
    case 121:
       weatherText = "Orages locaux de neige ou grésil";
      break;
    case 122:
       weatherText = "Orages locaux de neige ou grésil";
      break;
    case 123:
       weatherText = "Orages faibles de neige ou grésil";
      break;
    case 124:
       weatherText = "Orages de neige ou grésil";
      break;
    case 125:
       weatherText = "Orages de neige ou grésil";
      break;
    case 126:
       weatherText = "Orages faibles et fréquents de neige ou grésil";
      break;
    case 127:
       weatherText = "Orages fréquents de neige ou grésil";
      break;
    case 128:
       weatherText = "Orages fréquents de neige ou grésil";
      break;
    case 130:
       weatherText = "Orages faibles et locaux de pluie et neige mêlées ou grésil";
      break;
    case 131:
       weatherText = "Orages locaux de pluie et neige mêlées ou grésil";
      break;
    case 132:
       weatherText = "Orages fort et locaux de pluie et neige mêlées ou grésil";
      break;
    case 133:
       weatherText = "Orages faibles de pluie et neige mêlées ou grésil";
      break;
    case 134:
       weatherText = "Orages de pluie et neige mêlées ou grésil";
      break;
    case 135:
       weatherText = "Orages forts de pluie et neige mêlées ou grésil";
      break;
    case 136:
       weatherText = "Orages faibles et fréquents de pluie et neige mêlées ou grésil";
      break;
    case 137:
       weatherText = "Orages fréquents de pluie et neige mêlées ou grésil";
      break;
    case 138:
       weatherText = "Orages forts et fréquents de pluie et neige mêlées ou grésil";
      break;
    case 140:
       weatherText = "Pluies orageuses";
      break;
    case 141:
       weatherText = "Pluie et neige mêlées à caractère orageux";
      break;
    case 142:
       weatherText = "Neige à caractère orageux";
      break;
    case 210:
       weatherText = "Pluie faible intermittente";
      break;
    case 211:
       weatherText = "Pluie modérée intermittente";
      break;
    case 212:
       weatherText = "Pluie forte intermittente";
      break;
    case 220:
       weatherText = "Neige faible intermittente";
      break;
    case 221:
       weatherText = "Neige modérée intermittente";
      break;
    case 222:
       weatherText = "Neige forte intermittente";
      break;
    case 230:
       weatherText = "Pluie et neige mêlées";
      break;
    case 231:
       weatherText = "Pluie et neige mêlées";
      break;
    case 232:
       weatherText = "Pluie et neige mêlées";
      break;
    case 235:
       weatherText = "Averses de grêle";
      break;
  };
};

function cardinalPoint () {
  if (weatherGlobal.forecast.dirwind10m>23 && weatherGlobal.forecast.dirwind10m <= 68) {
     cardinalWindDirection = "N.E.";
  } else if (weatherGlobal.forecast.dirwind10m>68 && weatherGlobal.forecast.dirwind10m <= 113) {
     cardinalWindDirection = "E";
  } else if (weatherGlobal.forecast.dirwind10m>113 && weatherGlobal.forecast.dirwind10m <= 158) {
     cardinalWindDirection = "S.E.";
  } else if (weatherGlobal.forecast.dirwind10m>158 && weatherGlobal.forecast.dirwind10m <= 213) {
     cardinalWindDirection = "S";
  } else if (weatherGlobal.forecast.dirwind10m>213 && weatherGlobal.forecast.dirwind10m <= 248) {
     cardinalWindDirection = "S.O.";
  } else if (weatherGlobal.forecast.dirwind10m>248 && weatherGlobal.forecast.dirwind10m <= 293) {
     cardinalWindDirection = "O";
  } else if (weatherGlobal.forecast.dirwind10m>293 && weatherGlobal.forecast.dirwind10m <= 338) {
     cardinalWindDirection = "N.O.";
  } else if ((weatherGlobal.forecast.dirwind10m>338 && weatherGlobal.forecast.dirwind10m <= 360) ||(weatherGlobal.forecast.dirwind10m>=0 && weatherGlobal.forecast.dirwind10m <= 23))  {
     cardinalWindDirection = "N";
  };
};

function createGeneralElementForWeek () {
  weatherDisplayElement = document.createElement('div');  // Création de l'encadré météo global (duplicable si plusieurs jours)
  weatherDisplayElement.setAttribute("name", "weatherDisplayElement");
  weatherDisplayElement.className = "weatherDisplayElement";
  weatherDisplay.appendChild(weatherDisplayElement);
};

function createWeatherDescriptionElementForWeek () {
  weatherDiv = document.createElement('div');  // Création de l'élément météo
  weatherDiv.setAttribute("name", "weatherDiv");
  weatherDiv.className = "weatherDiv";
  weatherDisplayElement.appendChild(weatherDiv);
  weatherImage = document.createElement('img');  //  Création de l'élément image
  weatherDiv.appendChild(weatherImage);
  weatherDescription = document.createElement('div');   // Création de l'élément description
  weatherDescription.setAttribute("name", "weatherDescription");
  weatherDescription.className = "weatherDescription";
  weatherDiv.appendChild(weatherDescription);
};

function createTemperatureElementForWeek () {
  temperatureDiv = document.createElement('div');  // Création de l'élément température
  temperatureDiv.setAttribute("name", "temperatureDiv");
  temperatureDiv.className = "temperatureDiv";
  weatherDisplayElement.appendChild(temperatureDiv);
  temperatureMaxDiv = document.createElement('div');    // Création de l'élément température maximale
  temperatureMaxDiv.setAttribute("name", "temperatureMaxDiv");
  temperatureMaxDiv.className = "temperatureMaxDiv";
  temperatureDiv.appendChild(temperatureMaxDiv);
  temperatureMinDiv = document.createElement('div');    // Création de l'élément température minimale
  temperatureMinDiv.setAttribute("name", "temperatureMinDiv");
  temperatureMinDiv.className = "temperatureMinDiv";
  temperatureDiv.appendChild(temperatureMinDiv);
};

function createWindElementForWeek () {
  windDiv = document.createElement('div');  //  Création de l'élément vent
  windDiv.setAttribute("name", "windDiv");
  windDiv.className = "windDiv";
  weatherDisplayElement.appendChild(windDiv);
  windDirection = document.createElement('div');    // Création de l'élément direction du vent
  windDirection.setAttribute("name", "windDirection");
  windDirection.className = "windDirection";
  windDiv.appendChild(windDirection);
  windAverage = document.createElement('div');    //Création de l'élément vitesse moyenne du vent
  windAverage.setAttribute("name", "windAverage");
  windAverage.className = "windAverage";
  windDiv.appendChild(windAverage);
  windGust = document.createElement('div');   // Création de l'élément rafale de vent
  windGust.setAttribute("name", "windGust");
  windGust.className = "windGust";
  windDiv.appendChild(windGust);
  windGustThunderstorm = document.createElement('div');   // Création de l'élément rafale de vent sous orage
  windGustThunderstorm.setAttribute("name", "windGustThunderstorm");
  windGustThunderstorm.className = "windGustThunderstorm";
  windDiv.appendChild(windGustThunderstorm);
  windProba70 = document.createElement('div');    // Création de l'élément probabilité de vent supérieur à 70km/h
  windProba70.setAttribute("name", "windProba70");
  windProba70.className = "windProba70";
  windDiv.appendChild(windProba70);
  windProba100 = document.createElement('div');   // Création de l'élément probabilité de rafale de vent supéreieur a 100km/h
  windProba100.setAttribute("name", "windProba100");
  windProba100.className = "windProba100";
  windDiv.appendChild(windProba100);
};

function createRainElementForWeek () {
  rainDiv = document.createElement('div');  // Création de l'élément pluie
  rainDiv.setAttribute("name", "rainDiv");
  rainDiv.className = "rainDiv";
  weatherDisplayElement.appendChild(rainDiv);
  rainProba = document.createElement('div');    // Création de l'élément probabilité de pluie
  rainProba.setAttribute("name", "rainProba");
  rainProba.className = "rainProba";
  rainDiv.appendChild(rainProba);
  rainMax = document.createElement('div');    // Création de l'élément cumul de pluie maximale
  rainMax.setAttribute("name", "rainMax");
  rainMax.className = "rainMax";
  rainDiv.appendChild(rainMax);
  rainAverage = document.createElement('div');    // Création de l'élément moyenne de pluie sur la journée
  rainAverage.setAttribute("name", "rainAverage");
  rainAverage.className = "rainAverage";
  rainDiv.appendChild(rainAverage);
};

function createOtherELementForWeek () {
  otherDiv =  document.createElement('div');  // Création de l'élément "autre"
  otherDiv.setAttribute("name", "otherDiv");
  otherDiv.className = "otherDiv";
  weatherDisplayElement.appendChild(otherDiv);
  evapotranspiration = document.createElement('div');   // Création de l'élément évapotranspiration
  evapotranspiration.setAttribute("name", "evapotranspiration");
  evapotranspiration.className = "evapotranspiration";
  otherDiv.appendChild(evapotranspiration);
  fogProba= document.createElement('div');    // Création de l'élément probabilité de Brouillard
  fogProba.setAttribute("name", "fogProba");
  fogProba.className = "fogProba";
  otherDiv.appendChild(fogProba);
  frostProba = document.createElement('div');   // Création de l'élément probabilité de Gel
  frostProba.setAttribute("name", "frostProba");
  frostProba.className = "frostProba";
  otherDiv.appendChild(frostProba);
  sunshine = document.createElement('div');   // Création de l'élément ensoleillement
  sunshine.setAttribute("name", "sunshine");
  sunshine.className = "sunshine";
  otherDiv.appendChild(sunshine);
};

function weatherTextDescriptionForWeek (){
  switch (weatherGlobal.weather) {
    case 0:
       weatherText = "Grand Soleil";
      weatherImage.src = "img/icones/soleil.png";
      break;
    case 1:
       weatherText = "Peu Nuageux";
      weatherImage.src = "img/icones/nuageux.png";
      break;
    case 2:
       weatherText = "Ciel voilé";
      weatherImage.src = "img/icones/nuageux.png";
    break;
    case 3:
       weatherText = "Nuageux";
      weatherImage.src = "img/icones/nuageux.png";
      break;
    case 4:
       weatherText = "Très nuageux";
      weatherImage.src = "img/icones/nuageux.png";
      break;
    case 5:
       weatherText = "Couvert";
      weatherImage.src = "img/icones/tres_nuageux.png";
      break;
    case 6:
       weatherText = "Brouillard";
      weatherImage.src = "img/icones/brouillard.png";
      break;
    case 7:
       weatherText = "Brouillard givrant";
      weatherImage.src = "img/icones/brouillard_givrant.png";
      break;
    case 10:
       weatherText = "Pluie faible";
      weatherImage.src = "img/icones/faible_averse.png";
      break;
    case 11:
       weatherText = "Pluie modérée";
      weatherImage.src = "img/icones/moyenne_averse.png";
      break;
    case 12:
       weatherText = "Pluie forte";
      weatherImage.src = "img/icones/forte_averse.png";
      break;
    case 13:
       weatherText = "Pluie faible verglaçante";
       weatherImage.src = "img/icones/pluie_faible_verglacante.png";
      break;
    case 14:
       weatherText = "Pluie modérée verglaçante";
       weatherImage.src = "img/icones/pluie_moyenne_verglacante.png";
      break;
    case 15:
       weatherText = "Pluie forte verglaçante";
       weatherImage.src = "img/icones/pluie_moyenne_verglacante.png";
      break;
    case 16:
       weatherText = "Bruine";
      break;
    case 20:
       weatherText = "Neige faible";
      break;
    case 21:
       weatherText = "Neige modérée";
      break;
    case 22:
       weatherText = "Neige forte";
      break;
    case 30:
       weatherText = "Pluie et neige mêlées faibles";
      break;
    case 31:
       weatherText = "Pluie et neige mêlées modérées";
      break;
    case 32:
       weatherText = "Pluie et neige mêlées fortes";
      break;
    case 40:
       weatherText = "Averses de pluie locales et faibles";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 41:
       weatherText = "Averses de pluie locales";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 42:
       weatherText = "Averses locales et fortes";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 43:
       weatherText = "Averses de pluie faibles";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 44:
       weatherText = "Averses de pluie";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 45:
       weatherText = "Averses de pluie fortes";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 46:
       weatherText = "Averses de pluie faibles et fréquentes";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 47:
       weatherText = "Averses de pluie fréquentes";
       weatherImage.src = "img/icones/pluie.png";
    break;
    case 48:
       weatherText = "Averses de pluie fortes et fréquentes";
       weatherImage.src = "img/icones/pluie.png";
      break;
    case 60:
       weatherText = "Averses de neige localisées et faibles";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 61:
       weatherText = "Averses de neige localisées";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 62:
       weatherText = "Averses de neige localisées et fortes";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 63:
       weatherText = "Averses de neige faibles";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 64:
       weatherText = "Averses de neige";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 65:
       weatherText = "Averses de neige fortes";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 66:
       weatherText = "Averses de neige faibles et fréquentes";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 67:
       weatherText = "Averses de neige fréquentes";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 68:
       weatherText = "Averses de neige fortes et fréquentes";
       weatherImage.src = "img/icones/neige.png";
      break;
    case 70:
       weatherText = "Averses de pluie et neige mêlées localisées et faibles";
      break;
    case 71:
       weatherText = "Averses de pluie et neige mêlées localisées";
      break;
    case 72:
       weatherText = "Averses de pluie et neige mêlées localisées et fortes";
      break;
    case 73:
       weatherText = "Averses de pluie et neige mêlées faibles";
      break;
    case 74:
       weatherText = "Averses de pluie et neige mêlées";
      break;
    case 75:
       weatherText = "Averses de pluie et neige mêlées fortes";
      break;
    case 76:
       weatherText = "Averses de pluie et neige mêlées faibles et nombreuses";
      break;
    case 77:
       weatherText = "Averses de pluie et neige mêlées fréquentes";
      break;
    case 78:
       weatherText = "Averses de pluie et neige mêlées fortes et fréquentes";
      break;
    case 100:
       weatherText = "Orages faibles et locaux";

      break;
    case 101:
       weatherText = "Orages locaux";
      break;
    case 102:
       weatherText = "Orages fort et locaux";
      break;
    case 103:
       weatherText = "Orages faibles";
      break;
    case 104:
       weatherText = "Orages";
      break;
    case 105:
       weatherText = "Orages forts";
      break;
    case 106:
       weatherText = "Orages faibles et fréquents";
      break;
    case 107:
       weatherText = "Orages fréquents";
      break;
    case 108:
       weatherText = "Orages forts et fréquents";
      break;
    case 120:
       weatherText = "Orages faibles et locaux de neige ou grésil";
      break;
    case 121:
       weatherText = "Orages locaux de neige ou grésil";
      break;
    case 122:
       weatherText = "Orages locaux de neige ou grésil";
      break;
    case 123:
       weatherText = "Orages faibles de neige ou grésil";
      break;
    case 124:
       weatherText = "Orages de neige ou grésil";
      break;
    case 125:
       weatherText = "Orages de neige ou grésil";
      break;
    case 126:
       weatherText = "Orages faibles et fréquents de neige ou grésil";
      break;
    case 127:
       weatherText = "Orages fréquents de neige ou grésil";
      break;
    case 128:
       weatherText = "Orages fréquents de neige ou grésil";
      break;
    case 130:
       weatherText = "Orages faibles et locaux de pluie et neige mêlées ou grésil";
      break;
    case 131:
       weatherText = "Orages locaux de pluie et neige mêlées ou grésil";
      break;
    case 132:
       weatherText = "Orages fort et locaux de pluie et neige mêlées ou grésil";
      break;
    case 133:
       weatherText = "Orages faibles de pluie et neige mêlées ou grésil";
      break;
    case 134:
       weatherText = "Orages de pluie et neige mêlées ou grésil";
      break;
    case 135:
       weatherText = "Orages forts de pluie et neige mêlées ou grésil";
      break;
    case 136:
       weatherText = "Orages faibles et fréquents de pluie et neige mêlées ou grésil";
      break;
    case 137:
       weatherText = "Orages fréquents de pluie et neige mêlées ou grésil";
      break;
    case 138:
       weatherText = "Orages forts et fréquents de pluie et neige mêlées ou grésil";
      break;
    case 140:
       weatherText = "Pluies orageuses";
      break;
    case 141:
       weatherText = "Pluie et neige mêlées à caractère orageux";
      break;
    case 142:
       weatherText = "Neige à caractère orageux";
      break;
    case 210:
       weatherText = "Pluie faible intermittente";
      break;
    case 211:
       weatherText = "Pluie modérée intermittente";
      break;
    case 212:
       weatherText = "Pluie forte intermittente";
      break;
    case 220:
       weatherText = "Neige faible intermittente";
      break;
    case 221:
       weatherText = "Neige modérée intermittente";
      break;
    case 222:
       weatherText = "Neige forte intermittente";
      break;
    case 230:
       weatherText = "Pluie et neige mêlées";
      break;
    case 231:
       weatherText = "Pluie et neige mêlées";
      break;
    case 232:
       weatherText = "Pluie et neige mêlées";
      break;
    case 235:
       weatherText = "Averses de grêle";
      break;
  };
};

function cardinalPointForWeek () {
  if (windDirectionValue>23 && windDirectionValue <= 68) {
     cardinalWindDirectionForWeek = "N.E.";
  } else if (windDirectionValue>68 && windDirectionValue <= 113) {
     cardinalWindDirectionForWeek = "E";
  } else if (windDirectionValue>113 && windDirectionValue <= 158) {
     cardinalWindDirectionForWeek = "S.E.";
  } else if (windDirectionValue>158 && windDirectionValue <= 213) {
     cardinalWindDirectionForWeek = "S";
  } else if (windDirectionValue>213 && windDirectionValue <= 248) {
     cardinalWindDirectionForWeek = "S.O.";
  } else if (windDirectionValue>248 && windDirectionValue <= 293) {
     cardinalWindDirectionForWeek = "O";
  } else if (windDirectionValue>293 && windDirectionValue <= 338) {
     cardinalWindDirectionForWeek = "N.O.";
  } else if ((windDirectionValue>338 && windDirectionValue <= 360) ||(windDirectionValue>=0 && windDirectionValue <= 23))  {
     cardinalWindDirectionForWeek = "N";
  };
};
