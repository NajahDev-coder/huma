import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import App from './App';
/*import { LogBox } from 'react-native';
// Ignore log notification by message:
LogBox.ignoreLogs([
    "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

// Ignore all log notifications:
LogBox.ignoreAllLogs();
console.reportErrorsAsExceptions = false;*/


// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
