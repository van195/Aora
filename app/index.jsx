import {Redirect,router } from "expo-router";
import { Image, ScrollView, StatusBar, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import image from '../app/constants/expoer_manager.jsx'
import CustomButton from "@/components/CustomButton.jsx";
import {useGlobalContext} from '../context/GlobalProvider.js'

export default function Index() {
  const {isLoading, isLoggedIn,user} = useGlobalContext();
  if(!isLoading && isLoggedIn) return <Redirect href='/home'/>
  return (
    <SafeAreaView style={{backgroundColor:'#161622', height:'100vh'}}>
      <ScrollView contentContainerStyle={{height:'100%'}}>
        <View style={{width:'100%', justifyContent:'center' , alignItems:'center', height:'84vh', paddingHorizontal:4}}>
           <Image 
            source={image.logoImage}
            style={{width:'130px', height:'84px', resizeMode:'contain'}}
           />
           <Image 
            source={image.dogImage}
            style={{maxWidth:'380px',width:'100%', height:'300px', resizeMode:'contain'}}
           />
           <View style={{position:'relative', marginTop:'5px'}}>
            <Text style={{fontSize:'30px', fontWeight:'bold' ,textAlign:'center',color:'#fff'}}>
              Discover Endless Possibility with {' '}
              <Text style={{color:'#ed9522'}}>Aora</Text>
            </Text>
            <Image
             source={image.pathImage} 
             style={{width:'136px', height:'15px',position:'absolute', right:'8px',bottom:'-9px'}}
            />
           </View>
           <Text style={{color:'#c5c3c3',marginTop:'10px',padding:'0px 15px',fontSize:'14px',textAlign:'center'}}>
            Where creativity meets innovation: embark on a journey of limitless exploration with Aora
           </Text>
           <CustomButton 
            title='Continue with email'
            handlePress={()=>{router.push('/sign-in')}}
            contentContainerStyle={{width:'90%', marginTop:'27px'}}
           />
        </View>
      </ScrollView>
      <StatusBar style='light' backgroundColor='#161622'/>
    </SafeAreaView>
  );
}