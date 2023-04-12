import React from 'react'; 
  
  
  export function dateDiff(date1, date2){
    var diff = {}                           // Initialisation du retour
    var tmp = date2 - date1;
 
    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes
 
    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes
 
    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
     
    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
    diff.day = tmp;  
    
    tmp=  Math.floor((diff.day)/7); // Nombre de semaine restants
    diff.week=tmp;
    

    var result="il y'a ";  
    if(diff.week>1)
     return result="il y'a "+ diff.week +" semaines";
    if(diff.week>0)
     return result="il y'a "+ diff.week +" semaine";
    if(diff.day>1)
      return result= "il y'a "+ diff.day +" jours";
    if(diff.day>0)
      return result= "il y'a "+ diff.day +" jour";
    if(diff.hour>1) 
      return result= "il y'a "+ diff.hour+" heures";   
    if(diff.hour>0)
      return result= "il y'a "+ diff.hour+" heure"; 
    if(diff.min>1) 
      return result= "il y'a "+ diff.min+" minutes";   
    if(diff.min>0)
      return result= "il y'a "+ diff.min+" minutes"; 
    if(diff.sec>1) 
      return result= "il y'a "+ diff.sec+" secondes";   
    if(diff.sec>0)
      return result= "il y'a "+ diff.sec+" seconde"; 
    return result;   
}  

  