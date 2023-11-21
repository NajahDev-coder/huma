import { initStripe } from '@stripe/stripe-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text } from 'react-native';
//import { colors } from '../colors';
//import { fetchPublishableKey } from '../helpers';
//import { PublishableKeyStripe } from '@env';
import { RequestOptionsPost, fetchPublishableKey, Base_url } from '../utils/utils';
interface Props {
  paymentMethod?: string;
}

const PaymentScreen: React.FC<Props> = ({ paymentMethod, children, amount }) => {
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    async function initialize() {
      console.log('children::', amount)
      const publishableKey = await fetchPublishableKey(amount, paymentMethod);
      console.log('publishableKey:::', publishableKey);
      if (publishableKey) {
        const response = await initStripe({
          publishableKey,
          merchantIdentifier: 'merchant.com.HüMA'
        });
        console.log('response stripe:', response)
        setLoading(false);
      }
    }
    //initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setLoading(false)
  }, []);

  return loading ? (
    <ActivityIndicator size="large" style={StyleSheet.absoluteFill} />
  ) : (
    <ScrollView
      accessibilityLabel="payment-screen"
      //style={styles.container}
      keyboardShouldPersistTaps="handled">
      {children}
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <Text style={{ opacity: 0 }}>appium fix</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingHorizontal: 16,
  },
});

export default PaymentScreen;
