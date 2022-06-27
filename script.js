function levenshtein(str1 = "",str2 = ""){
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1)
         .fill(null)
        );
  for(let i = 0 ; i <= str1.length ; i += 1){
    track[0][i] = i;
  }
  for(let j = 0 ; j <= str2.length ; j += 1){
    track[j][0] = j;
  }
  for(let j = 1 ; j <= str2.length ; j += 1){
    for(let i = 1 ; i <= str1.length ; i += 1){
      const indicator = str1[i-1] === str2[j-1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i-1] + 1,
        track[j-1][i] +1,
        track[j-1][i-1] + indicator
      );
    }
  }
  return track[str2.length][str1.length];
}

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

var n_letter = 1;
var currentName = "";

function addLetter(element){
  formData = new FormData(element);
  newLetter = formData.get("letterInput");
  element.reset();
  if(newLetter.length===1){
    currentName += newLetter.toUpperCase();
    n_letter += 1;
    document.getElementById("formText").innerHTML="Entrez la "+n_letter+"e lettre de votre prénom :";
    document.getElementById("dynamicDisplay").innerHTML=currentName;
  }
  return false;
}

function endForm(element){
  element.reset();
  element.hidden=true;
  document.getElementById("formText").hidden=true;
  document.getElementById("displayText").hidden=true;
    
  dist = levenshtein("EMILE",currentName);
  value = 2*(1 - sigmoid(dist/5));
    
  content = document.getElementById("content");
    
  announcementP = document.createElement('p');
  announcementP.innerHTML = "Votre prénom vaut :";
  content.appendChild(announcementP);
    
  results = document.createElement('p');
  results.innerHTML = Math.floor(100*value) + " POINTS";
  results.setAttribute("style","color: rgb("+Math.floor((1-value)*255)+","+Math.floor(value*255)+",0)")
  content.appendChild(results);
  
  return false;
}
