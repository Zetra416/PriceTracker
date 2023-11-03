import { StyleSheet} from 'react-native';
import LoadFont from './LoadFont';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/Home';
import DetailScreen from './screens/Details';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <LoadFont>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} options={{headerShown: false}} />
        </Stack.Navigator>
      </LoadFont>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


