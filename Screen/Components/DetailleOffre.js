import React, {useState , useEffect} from "react";
import {Text, TextInput, StyleSheet,TouchableOpacity, View} from "react-native";
import {RequestOptionsPut} from '../utils/utils';
const DetailleOffre = ({id_offre , offre , etat }) => {
  
  const [detOffre, setDetOffre] = useState(offre) ;
  const [etatUpOffre, setEtatUpOffre] = useState(etat) ;
  //add offre
  //console.log('eeee etat',etat)  
  const handleSubmitPress = async () => {
   
    if (!detOffre) {
      alert('Veuillez saisir votre Offre');
      return;
    }
    // setLoading(true);
    let dataToSend = {
      detaille: detOffre,  
    };
    console.log('modif offre:',dataToSend)
      const fetchUrl =  `updatetext_offre/${id_offre}`;
      const responseJson = RequestOptionsPut(dataToSend, fetchUrl).then( (response,error) => {
      console.log(response)
        if (response.status=='update offre reussi!!') {
          setEtatUpOffre(0);
  
          setRefreshKey((oldKey) => oldKey + 1);
      }
       })
      
     
  };
  useEffect(()=>{
    let isMounted=true;
    if(isMounted)
    {
       if(etatUpOffre>0) console.log('etatUpOffre',etatUpOffre) 
    }  
    return ()=> isMounted=false;
  },[etatUpOffre])  

   return (   
     <>
     {(etatUpOffre > 0 && etatUpOffre == id_offre) ?        
              <View style={{ width: '97%', padding: 3, marginLeft: 4 }}>
           <TextInput  
            multiline={true}
            style={styles.inputStyle}
            onChangeText={(value) => { setDetOffre(value) }}              
            value={detOffre}
            defaultValue={detOffre}  
            placeholderTextColor="#8b9cb5"
            numberOfLines={3}
          /> 
          <TouchableOpacity
            style={{ position: 'absolute', right: 17, bottom: 10 }}
            activeOpacity={0.5}
            onPress={handleSubmitPress}>
            <Text style={styles.buttonTextStyle}>Modifier</Text>
          </TouchableOpacity>
           <TouchableOpacity
            style={{ position: 'absolute', left: 4, bottom: 10 }}
            activeOpacity={0.5} 
            onPress={()=>{setEtatUpOffre(0)}}>
            <Text style={styles.buttonTextStyle}>Annuler</Text>
          </TouchableOpacity>
        </View>
        :
        <Text style={styles.bcText}>{detOffre}</Text> 
     }
         </>
   );
  
  
};    
const styles= StyleSheet.create({
   bcText: { 
    maxWidth: '100%',
  },
  inputStyle: {
    flex: 1,
    color: '#222222',
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#dadae8',
    width: '90%',
  },
  buttonTextStyle: {
    color: '#1E90FF',
    fontSize:12,
    paddingHorizontal:15, 
    fontWeight: '600',
  },
})
export default DetailleOffre;