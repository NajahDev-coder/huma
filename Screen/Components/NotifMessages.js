import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getTotalMsgNnLu } from '../utils/utils';
import { AntDesign } from '@expo/vector-icons';
const NotifMessages = ({ color }) => {


  useEffect(() => {
    getTotalMsgNnLu();
    const intervalId = setInterval(() => {
      // alert('rr');
      getTotalMsgNnLu();
    }, 1000 * 5)
  }, [global.TotalMsgNonLU])

  return (
    <View style={styles.bc_notifmsg}>
      {global.TotalMsgNonLU &&
        (
          <Text style={styles.isnotif}>{global.TotalMsgNonLU}</Text>
        )}
      <AntDesign name="message1" size={24} color={color} style={{ marginTop: 3 }} />
    </View>
  );


};

const styles = StyleSheet.create({
  bc_notifmsg: {
    flexDirection: 'row',
    //padding: 10, 
    position: 'relative'
  },
  isnotif: {
    backgroundColor: 'rgb(140, 153, 44)',
    width: 22,
    height: 22,
    borderRadius: 22,
    position: 'absolute',
    top: 5,
    right: -15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    color: '#fff',
    textAlign: 'center',
    zIndex: 20
  },
});
export default NotifMessages;
