import { Stack } from "expo-router";
import GlobalProvider from '../context/GlobalProvider'
export default function RootLayout() {
  return (
    <GlobalProvider>    
      <Stack 
        screenOptions={{
          headerStyle:{backgroundColor:'#000'},
          headerTintColor:'#fff',
          headerShown:false
        }} 
      >
      </Stack>
  </GlobalProvider>)
}
