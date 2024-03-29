import React from 'react';
import {
  AccessibilityProps,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
//import { colors } from '../colors';

type Props = AccessibilityProps & {
  title?: string | React.ReactElement;
  variant?: 'default' | 'primary';
  disabled?: boolean;
  loading?: boolean;
  onPress(): void;
};

export default function Button({
  title,
  variant = 'default',
  disabled,
  loading,
  onPress,
  ...props
}: Props) {
  const titleElement = React.isValidElement(title) ? (
    title 
  ) : (
    <Text style={[styles.text, variant === 'primary' && styles.textPrimary]}>
      {title}
    </Text>
  );
  return (
    <View style={disabled && styles.disabled}>
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.container,
          variant === 'primary' && styles.primaryContainer,
        ]}
        onPress={onPress}
        {...props}
      >
        {loading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          titleElement
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
  },
  primaryContainer: {
    backgroundColor: '#0A2540',
    alignItems: 'center',
  },
  text: {
    
    color: '#0A2540',
    fontWeight: '600',
    fontSize: 16,
  },
  textPrimary: {
    color: 'white',
  },
  disabled: {
    opacity: 0.3,
  },
});
