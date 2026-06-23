import { View, Text, ScrollView , Image, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import image from '../constants/expoer_manager'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import {createAccount} from '../../lib/appwrite'
import {useGlobalContext} from '../../context/GlobalProvider'
const SignUp = () => {
  const [form , setForm] = useState({
    userName:'',
    email:'',
    password:''
  })
  const {isLoading,setUser,isLoggedIn} = useGlobalContext();
  const [isSubmitting , setIsSubmitting] = useState(false);
  const [fillingError , setFillingError] = useState(null);
  const submit = async()=>{
    const lengthPassword = form.password;
    if(!form.userName || !form.email || !form.password) {
      setFillingError('please fill all fields');
      return;
    }
    if(lengthPassword.length <= 7) {
      setFillingError('the password length must be at least 8 character');
      return;
    }
      setIsSubmitting(true);
      try {
          const result = await createAccount(form.email, form.password, form.userName);
          if(result){
             router.replace('/home')
          }
          setUser(result);
          isLoggedIn(true);
        } catch (error) {
        Alert.alert('Error',error.message);
        
      }finally{
        setIsSubmitting(false);
      }
  };
  return (
    <SafeAreaView style={{height:'100vh', backgroundColor:'#161622'}}>
      <ScrollView >
        <View style={{width:'100%', color:'#fff',minHeight:'85vh', paddingHorizontal:'40px',marginVertical:6, justifyContent:'center'}}>
          <Image 
           source={image.logoImage}
           style={{width:'115px',height:'35px', resizeMode:'contain'}}
          />
          <Text style={{color:'#fff', fontSize:'14px'}}>
           let us Join in to Aroa
          </Text>
          <FormField
            title='User name'
            value={form.userName}
            handleChangeText={(e) => setForm({...form, userName:e})}
            otherStyle={{marginTop:'40px',gap:'20px'}}
          />
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({...form, email:e})}
            otherStyle={{marginTop:'40px',gap:'20px'}}
          />
          <FormField
            title='Password'
            value={form.password}
            handleChangeText={(e) => setForm({...form, password:e})}
            otherStyle={{marginTop:'40px', gap:'20px'}}
          />
          <Text style={{color:'#fa8b8b', textAlign:'center', marginTop:'20px'}}>{fillingError && fillingError}</Text>
          <CustomButton
           title='Join Now!'
           handlePress={submit}
           contentContainerStyle={{marginTop:'40px'}}
           isLoading={isSubmitting}
          />
          <View style={{justifyContent:'center', paddingTop:'15px',gap:'5px', flexDirection:'row'}}>
            <Text style={{color:'#fff', fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", fontSize:'18px'}}>
                 Already have an account ?
            </Text>
            <Link href='/sign-in' style={{color:'#e2b630', textDecoration:'underline',fontSize:'18px',fontWeight:'bolder'}}>
              Log in now!
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp