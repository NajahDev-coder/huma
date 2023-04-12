import React ,{useEffect, useState} from 'react' ;
import {Text,StyleSheet} from 'react-native';
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Octicons,
  Fontisto,
  MaterialCommunityIcons,
  Ionicons,
  Feather,
  View  
} from '@expo/vector-icons'; 
 
import { SelectList } from 'react-native-dropdown-select-list'

import {Base_url, RequestOptionsPut, RequestOptionsGet, RequestOptionsPost} from '../utils/utils';

 const ActionOffre = ({navigation, id_annonce, id_offre, id_user_offre, id_user ,id_auteur_annonce,etat, situation,onValider,onModifier,onUpdate})=>{
  
   
  const [OffreValide, setOffreValide] = useState(0);
  const [OffreEtat, setOffreEtat] = useState(etat);


   const [Valide, setValide] = useState(situation);
const [selected, setSelected] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);  
const DataModifier=[{key:'1', value :'Modifier'}, {key:'3', value:'Retirer'}]
//modifier ou supprimer offre
  const UpdateOffreAnnonce = async ( id_offre, choix) => {
   
    if(choix==='3'){
      const fetchUrl =  `delete_offre/${id_offre}`;
      responseJson = RequestOptionsGet( fetchUrl).then((response,erro)=>{
        console.log(response.status)
        if(response.status=='suppression offre reussi!!')
        {
          onUpdate()
          setRefreshKey((oldKey) => oldKey + 1);
        } 
      });
      } 
      else {  
       onModifier();
       //setEtatDetailsOffre(id_offre)
       setRefreshKey((oldKey) => oldKey + 1);
      }
  };
  
 //valider offre
  const ValidOffreAnnonce = async (id_annonce, id_offre, etat_acc, id_user1,id_user2) => {
    //console.log('ValidOffreAnnonce eta:',etat_acc);  
    const baseUrl = Base_url + `api/api/valid_offre/${id_offre}`;
    //const baseUrl = "https://jsonplaceholder.typicode.com/posts";
    const data = await fetch(baseUrl, { 
      method: 'PUT',
       headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        etat_valid: etat_acc,
        id_annonce: id_annonce,
        id_user1:id_user1,
        id_user2:id_user2,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        
        setOffreEtat(etat_acc);
        onValider();
        setRefreshKey((oldKey) => oldKey + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return(
    <>      
 
    {(id_auteur_annonce == id_user &&  OffreEtat ==1 ) && 
    <>
                
                 <Fontisto
                     name="checkbox-active"
                    size={16}
                    style={{position:'absolute',top:0,right:0}}
                    color="#c4d63c"
                    onPress={() => {
                      ValidOffreAnnonce(
                        id_annonce,
                        id_offre,
                        0,
                        id_auteur_annonce,
                        id_user_offre,
                      );
                    }}
                  />
                  </>  
                }
                
                    
                 {/*offre validée*/}  
          
                { (OffreEtat === 2  && (id_user_offre == id_user || id_auteur_annonce == id_user ) ) && 
                 
                  <SelectList  
      setSelected={setSelected} 
      data={[{key:3,value :'Annuler'},{key:4,value:'Retirer'}]} 
      onSelect={() => {ValidOffreAnnonce(
                        id_annonce,
                        id_offre,
                        selected,
                        id_user,
                        id_auteur_annonce,
                      )}}         
      search={false}      
      arrowicon={<AntDesign name="check"  style={{position:'absolute',top:0,right:0}} size={18} color="#c4d63c" />} 
      boxStyles={{borderRadius:0, borderWidth:0,padding:0, zIndex:20}}
      inputStyles={{opacity:0}}
     // defaultOption={{ key:'2', value:' ' }}   
      dropdownStyles={{borderRadius:0,margin:0,marginTop:-15, borderWidth:1, backgroundColor:'white',padding:0}}
      dropdownItemStyles={{borderRadius:6, paddingVertical:1 }} 
    />
                } 
                { /*offre annulé*/} 
               { (OffreEtat === 3  &&  id_auteur_annonce == id_user ) &&   
               <MaterialCommunityIcons name="alert-circle-check-outline"  size={22} color="grey" 
                    style={{position:'absolute',top:0,right:0}} />
                    }
              
                { (OffreEtat === 3  && id_user_offre == id_user  ) &&   
       
                       <SelectList  
      setSelected={setSelected}   
      data= {[ {key:2,value :'Valider'} ,{key:4,value:'Retirer'}]} 
      onSelect={() => {ValidOffreAnnonce(
                        id_annonce,
                        id_offre,
                        selected,
                        id_user,
                        id_auteur_annonce,
                      )}}         
      search={false}      
      arrowicon={<MaterialCommunityIcons name="alert-circle-check-outline"  size={22} color="grey" 
                    style={{position:'absolute',top:0,right:0}} />}
      boxStyles={{borderRadius:0, borderWidth:0,padding:0}}
      inputStyles={{opacity:0}}
     // defaultOption={{ key:'2', value:' ' }}   
      dropdownStyles={{borderRadius:0,margin:0,marginTop:-15, borderWidth:1, backgroundColor:'white',padding:0}}
      dropdownItemStyles={{borderRadius:6, paddingVertical:1}} 
    />
                } 

                 { (id_auteur_annonce == id_user  && (!situation || OffreEtat != 3)  &&  OffreEtat !=1 &&  OffreEtat !=2)  &&    
                  <Fontisto
                    name="checkbox-passive"
                    size={16}
                    style={{position:'absolute',top:0,right:0}}
                    color="black"
                    onPress={() => {
                      ValidOffreAnnonce( 
                        id_annonce,
                        id_offre,
                        1,
                        id_auteur_annonce,
                        id_user_offre,
                      );
                    }}
                  />
                }
                
                 {/*offre selectionné*/}
               
                { (OffreEtat === 1  && id_user_offre == id_user ) && 
                 <SelectList  
      setSelected={setSelected} 
      data={[{key:2,value :'Valider'},{key:3,value:'Annuler'},{key:4,value:'Retirer'}]} 
      onSelect={() => {ValidOffreAnnonce(
                        id_annonce,
                        id_offre,
                        selected,
                        id_user,
                        id_auteur_annonce,
                      )}}         
      search={false}    
      arrowicon={<Ionicons name="checkmark-done" 
                    style={{position:'absolute',top:0,right:0}} size={18} color="#c4d63c" />}
      boxStyles={{borderRadius:0, borderWidth:0,padding:0}}
      inputStyles={{opacity:0}}
     // defaultOption={{ key:'2', value:' ' }}   
      dropdownStyles={{borderRadius:0,margin:0,marginTop:-15, borderWidth:1, backgroundColor:'white',padding:0}}
      dropdownItemStyles={{borderRadius:6, paddingVertical:1}} 
    />
                } 
                  {/*modifier offre */}  
   
                {(OffreEtat===0 && id_user_offre == id_user ) && (
             
             <SelectList  
      setSelected={(val) => setSelected(val) }    
      data={[{key:'1', value :'Modifier'}, {key:'3', value:'Retirer'}]}    
      onSelect={() => { UpdateOffreAnnonce(id_offre, selected)}}         
      search={false}    
      //defaultOption={{ key:'2', value:' CC' }} 
      arrowicon={<Feather name="more-vertical" size={18} style={{position:'absolute',top:0,right:0}} color="black" />}
      boxStyles={{borderRadius:0, borderWidth:0,padding:0}}   
      inputStyles={{opacity:0,padding:0,height:20,}}
      dropdownStyles={{borderWidth:0, margin:0,marginTop:-15 ,backgroundColor:'white',padding:0}}
      dropdownItemStyles={{borderRadius:6, paddingVertical:1}}
        // save="value"
    />
    )}    
               
      </>
  );   
};

export default ActionOffre;
