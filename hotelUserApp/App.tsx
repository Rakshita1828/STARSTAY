import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; // Import NavigationContainer
import StackNavigator from './src/navigation/StackNavigator';  // Import your StackNavigator

function App(): React.JSX.Element {
  return (
    <NavigationContainer>  {/* Wrap StackNavigator in NavigationContainer */}
      <StackNavigator />  {/* Use StackNavigator to handle app navigation */}
    </NavigationContainer>
  );
}

export default App;
