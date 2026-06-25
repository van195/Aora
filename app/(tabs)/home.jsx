import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import image from '../constants/expoer_manager'
import SearchInput from '@/components/SearchInput'
import Treading from '@/components/Treading'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, getLatestPost } from '@/lib/appwrite'
import VideoCard from '@/components/VideoCard'
const Home = () => {
  const [refreshing,setRefreshing]=useState(true);
  const [isLoading,setIsLoading] = useState(false);
  const [data , setData]= useState([]);
  const [latestData , setLatestData]= useState([]);
  useEffect(()=>{
    const fetchData = async() => {
       setIsLoading(true);
      try {
        const response = await getAllPosts();
        setData(response);
      } catch (error) {
        Alert.alert('error',error)
      }finally{
        setIsLoading(true);
      }
    }
    fetchData();
  },[]);
   useEffect(()=>{
    const fetchData = async() => {
       setIsLoading(true);
      try {
        const response = await getLatestPost();
        setLatestData(response);
      } catch (error) {
        Alert.alert('error',error)
      }finally{
        setIsLoading(true);
      }
    }
    fetchData();
  },[]);
  
  const onRefreshing=async()=>{
   setRefreshing(true)
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
          <View style={{marginVertical:'60px', paddingHorizontal:'30px'}}>
            <View style={{justifyContent:'space-between',alignItems:'center', flexDirection:'row', marginBottom:'60px'}}>
              <View>
                <Text style={{color:'#ffffffbb',fontSize:'18px',fontWeight:500}}>
                  welcome Back,
                </Text>
                <Text style={{color:'#ffffff',fontSize:'28px',fontWeight:900}}>
                  van
                </Text>
              </View>
              <View style={{marginTop:'1.5px'}}>
                 <Image
                  source={image.logoSmallImage}
                  resizeMode='contain'
                  style={{width:'40px', height:'50px'}}
                 />
              </View>
            </View>
            <SearchInput  />
            <View style={{width:'100%',flex:1, paddingTop:'50px', paddingBottom:'8px'}}>
               <Text style={{color:'#ffffffd3', fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif", fontSize:'20px'}}>
                 Latest Videos
               </Text>
               <Treading 
                posts={latestData ?? []}
               />
            </View>
          </View>
        )}
        ListEmptyComponent={()=>(
          <EmptyState
           title='No videos found'
           subtitle='Be the first on eto upload video'
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshing}/>}
      />
    </SafeAreaView>
  )
}

export default Home