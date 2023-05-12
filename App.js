import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeTabs from './screens/HomeTabs';
import ListarScreen from './screens/ListarScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScreen'
              screenOptions={{
                headerShown:false,
              }}>
        <Stack.Screen name='Login' component={LoginScreen} options={{title:'Momentoll', unmountOnBlur: true}}/>
        <Stack.Screen name='Register' component={RegisterScreen} options={{title:'Momentoll'}}/>
        <Stack.Screen name='HomeTabs' component={HomeTabs} options={{title:'Momentoll'}}/>
        <Stack.Screen name='Listar' component={ListarScreen} options={{title:'Momentoll'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
