import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserName } from '@/lib/appwrite'
import icon from '../app/constants/expoer_manager'
import {Video,ResizeMode} from 'expo-av'

const VideoCard = ({video:{title,thumbnail,video,users}}) => {
  const [Name , setName] = useState('');
  const [play , setPlay] = useState(false);
  useEffect(()=>{
    const fetchUserName =async()=>{
      try {
        const res = await getUserName(users);
        setName(res);
      } catch (error) {
        console.error(error);
      }
      
    }
    fetchUserName();
  },[])
  const firstLetter = Name?.userName?.charAt(0)?.toUpperCase();
  
  return (
    <View style={{flexDirection:'column', alignItems:'center',paddingHorizontal:'40px', marginBottom:'14px'}}>
        <View style={{flexDirection:'row', gap:'10px',alignItems:'flex-start'}}>
          <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',flex:1}}>
             <View style={{width:'400px',flexDirection:'row', justifyContent:'flex-start', gap:'20px',alignItems:'center',padding:'5.5px'}}>
               <Text style={{color:'#0b0a0a',fontWeight:700,padding:'15px',borderRadius:'15px',backgroundColor:'#c0eae3',border:'2px solid #fba63fc1'}}>{firstLetter}</Text>
               <Text style={{color:'#fff',fontSize:'14px'}}>{title}</Text>
             </View>
          </View>
          <View style={{paddingTop:'20px'}}>
            <Image
             source={icon.menuIcon}
             resizeMode='contain'
             style={{width:'20px',height:'20px'}}
            />
          </View>
        </View>
         {play ? (
          <Video
          source={{uri:video}}
          resizeMode={ResizeMode.CONTAIN}
          style={{width:'100%',height:'270px',marginTop:'60px',backgroundColor:'#000'}}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status)=>{
            if(status.didJustFinish){
              setPlay(false);
            }
          }}
          onError={(e) => console.log("VIDEO ERROR:", e)}
        />
         ):(
          <TouchableOpacity
           activeOpacity={0.7}
           onPress={()=> setPlay(true)}
           style={{width:'100%',height:'240px',marginTop:'10px', position:'relative',justifyContent:'center',alignItems:'center'}}>
            <Image
             source={{uri:thumbnail}}
             resizeMode='contain'
             style={{width:'100%',height:'100%', marginTop:'30px',borderRadius:'10px'}}
            />
           
           
          </TouchableOpacity>
         )}
    </View>
  )
}

export default VideoCard;