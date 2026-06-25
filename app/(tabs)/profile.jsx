import { View, Text, FlatList, Image, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import image from '../constants/expoer_manager'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, signOut,getLatestPost, getUserPost, searchPosts } from '@/lib/appwrite'
import VideoCard from '@/components/VideoCard'
import { router, useLocalSearchParams } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider'
import InfoBox from '@/components/infoBox'
const Profile = () => {
  const {query}=useLocalSearchParams()
  const [isLoading,setIsLoading] = useState(false);
  const [data , setData]= useState([]);
  const {user,setUser,isLoggedIn,setIsLoggedIn} = useGlobalContext();
  useEffect(()=>{
    const fetchData = async() => {
       setIsLoading(true);
      try {
        const response = await getUserPost(user?.$id);
        setData(response);
      } catch (error) {
        Alert.alert('error',error)
      }finally{
        setIsLoading(true);
      }
    }
    fetchData();
  },[user?.$id]);
  const firstLetter = user?.userName?.charAt(0)?.toUpperCase();
  const logOut = async()=>{
      await signOut();
      setUser(null);
      setIsLoggedIn(false);
      router.replace('/sign-in')
  }  
  return (
    <SafeAreaView style={{backgroundColor:'#161622', height:'100vh'}}>
      <FlatList
        data={data}
        keyExtractor={(item)=> item.$id}
        renderItem={({item})=>(
           <VideoCard video={item}/>
        )}
        ListHeaderComponent={()=>(
          <View style={{width:'100%',justifyContent:'center',alignItems:'center', marginTop:'30px', marginBottom:'40px',paddingVertical:'20px'}}>
            <TouchableOpacity 
              onPress={logOut}
              style={{width:'100%',alignItems:'flex-end',marginBottom:'10px' ,paddingHorizontal:'20px'}}
            >
             <Image
              source={image.logoutIcon}
              resizeMode='contain'
              style={{width:'30px',height:'30px'}}
             />
            </TouchableOpacity>
            <View style={{width:'70px', height:'70px', border:'1px solid #f98f3d',borderRadius:'10px',justifyContent:'center',alignItems:'center',overflow:'hidden'}}>
               <Text style={{width:'100%',height:'100%',color:'#272525',textAlign:'center',fontSize:'28px',fontWeight:700,paddingTop:'15px',backgroundColor:'#c0eae3'}}>{firstLetter}</Text>
            </View>
            <InfoBox
             title={user?.userName}
             textStyle={{fontSize:'23px', fontWeight:800}}
             containerStyle={{marginTop:'25px'}}
            />
            <View
             style={{width:'100%',marginTop:'25px',flex:1,flexDirection:'row', alignItems:'center', justifyContent:'center',gap:'30px'}}
            >
            <InfoBox
             title={data?.length || 0}
             subtitle='Posts'
             textStyle={{fontSize:'23px', fontWeight:800}}
             containerStyle={{marginRight:'10px'}}
            />
             <InfoBox
             title='1.2k'
             subtitle='Followers'
             textStyle={{fontSize:'23px', fontWeight:800}}
             
            />
            </View>
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState
           title='No videos found'
           subtitle='No video found for this search'
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile