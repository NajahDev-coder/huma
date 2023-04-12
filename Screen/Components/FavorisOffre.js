import React ,{useEffect, useState} from 'react'
import {
  FontAwesome,
  FontAwesome5,
  AntDesign,
  MaterialIcons,
  Octicons,
  Fontisto,
  MaterialCommunityIcons,
  Ionicons
} from '@expo/vector-icons'; 
import {Base_url} from '../utils/utils';
import SelectList from 'react-native-dropdown-select-list';

 const FavorisOffre = ({navigation, id_annonce, id_offre, id_user_offre, id_user ,id_auteur_annonce,favoris})=>{
  
    
  const [favorisOffre, setFavorisOffre] = useState(favoris);
  const [Valide, setValide] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

 //add favoris offre
  const FavorisOffreAnnonce = (fav) => {
    const fetchUrl =  `${Base_url}api/api/favoris_offre/${id_offre}`;
    //const baseUrl = "https://jsonplaceholder.typicode.com/posts";
    const data =  fetch(fetchUrl, { 
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        favoris: !fav,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
       
        setFavorisOffre(!fav) ; 
        setRefreshKey((oldKey) => oldKey + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };



  return (
    <>
   
              {favorisOffre == 0   && 
                  <MaterialIcons
                    name="favorite-border"  
                    size={24}
                    style={{ position:'absolute', right:25 }}
                    color="black"
                     onPress={() => {id_auteur_annonce == id_user &&   FavorisOffreAnnonce(favorisOffre);
                    }}
                     
                  />
                }
                {favorisOffre == 1 && 
                  <MaterialIcons
                    name="favorite"
                    size={24}
                    style={{ position:'absolute', right:25 }}
                    color="#c4d63c"
                    onPress={() => {  id_auteur_annonce == id_user &&  FavorisOffreAnnonce(favorisOffre);  }}
                    
                  />
                }
        

      </>
  );   
};

export default FavorisOffre;