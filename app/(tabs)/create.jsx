import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField';
import { Video,ResizeMode } from 'expo-av';
import icons from '../../app/constants/expoer_manager'
import CustomButton from '@/components/CustomButton';
const Create = () => {
  const [uploading , setUploading] = useState(false)
  const [form ,setForm]=useState({
    title:'',
    video:null,
    thumbnail:null,
    prompt:''
  });
  const submit =()=>{

  }
  return (
    <SafeAreaView style={{height:'100vh',backgroundColor:'#161622'}}>
      <ScrollView style={{paddingHorizontal:'40px', marginVertical:'30px'}}>
        <Text style={{color:'#fff',fontSize:'20px',fontWeight:700}}>Upload video</Text>
        <FormField
         title='video title'
         value={form.title}
         placeHolder='Give your video a catch title ...'
         handleChangeText={(e)=> setForm({...form, title:e})}
         otherStyle={{marginTop:'30px'}}
         textStyle={{marginBottom:'10px'}}
        />
        <View  style={{marginTop:'40px'}}>
          <Text style={{color:'#fff',fontSize:'14px',fontWeight:400}}>Upload video</Text>
          <TouchableOpacity>
             { form.video ? (
               <Video
                 source={{uri:form.video.uri}}
                 style={{width:'100%',height:'170px',borderRadius:'20px'}}
                 useNativeControls
                 resizeMode={ResizeMode.CONTAIN}
                 isLooping
               />
             ):(
               <View style={{width:'100%', height:'170px',backgroundColor:'#232335', justifyContent:'center',alignItems:'center', borderRadius:'20px'}}>
                 <View style={{ width:'50px', height:'50px',justifyContent:'center',alignItems:'center',border:'0.4px solid #f8b33d'}}>
                    <Image
                      source={icons.uploadIcon}
                      resizeMode='contain'
                      style={{width:'25px',height:'25px'}}
                    />
                 </View>
               </View>
             )
            }
          </TouchableOpacity>
        </View>
        <View style={{marginTop:'50px', gap:'20px'}}>
          <Text style={{color:'#fff',fontSize:'14px',fontWeight:400}}>Thumbnail image</Text>
          <TouchableOpacity>
             { form.thumbnail ? (
               <Image
                source={{uri:form.thumbnail.uri}}
                resizeMode='cover'
                 style={{width:'100%',height:'170px',borderRadius:'20px'}}
               />
             ):(
               <View style={{width:'100%', height:'60px',paddingHorizontal:'40px',backgroundColor:'#232335', justifyContent:'center',alignItems:'center', borderRadius:'20px'}}>
                    <Image
                      source={icons.uploadIcon}
                      resizeMode='contain'
                      style={{width:'15px',height:'15px'}}
                    />
                    <Text style={{color:'#fff',fontSize:'14px',fontWeight:400}}>
                      chose a file
                    </Text>
               </View>
             )
            }
          </TouchableOpacity>
        </View>
        <FormField
         title='AI prompt'
         value={form.prompt}
         placeHolder='The prompt you used to create this video'
         handleChangeText={(e)=> setForm({...form, title:e})}
         otherStyle={{marginTop:'30px'}}
         textStyle={{marginBottom:'10px'}}
        />
        <CustomButton
         title='Submit & Publish'
         contentContainerStyle={{marginTop:'20px'}}
         handlePress={submit}
         isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create;