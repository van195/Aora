import { View, Text, ScrollView , Image} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import image from '../constants/expoer_manager'
import FormField from '@/components/FormField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'
const SingIn = () => {
  const [form , setForm] = useState({
    email:'',
    password:''
  })
  const [isSubmitting , setIsSubmitting] = useState(false);
  const submit = ()=>{

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
            Log in to Aroa
          </Text>
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
          <CustomButton
           title='sign in'
           handlePress={submit}
           contentContainerStyle={{marginTop:'70px'}}
           isLoading={isSubmitting}
          />
          <View style={{justifyContent:'center', paddingTop:'15px',gap:'5px', flexDirection:'row'}}>
            <Text style={{color:'#fff', fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", fontSize:'18px'}}>
                 Don't have an account ?
            </Text>
            <Link href='/sign-up' style={{color:'#e2b630', textDecoration:'underline',fontSize:'18px',fontWeight:'bolder'}}>
              Join now!
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SingIn