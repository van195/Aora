import { View, Text, FlatList, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import image from '../constants/expoer_manager'
import SearchInput from '@/components/SearchInput'
import EmptyState from '@/components/EmptyState'
import { getAllPosts, getLatestPost, searchPosts } from '@/lib/appwrite'
import VideoCard from '@/components/VideoCard'
import { useLocalSearchParams } from 'expo-router'
const Search = () => {
  const {query}=useLocalSearchParams()
  const [isLoading,setIsLoading] = useState(false);
  const [data , setData]= useState([]);
  useEffect(()=>{
    const fetchData = async() => {
       setIsLoading(true);
      try {
        const response = await searchPosts(query);
        setData(response);
      } catch (error) {
        Alert.alert('error',error)
      }finally{
        setIsLoading(true);
      }
    }
    fetchData();
  },[query]);
  console.log(query,data);
  
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
                  Search Result,
                </Text>
                <Text style={{color:'#ffffff',fontSize:'28px',fontWeight:900}}>
                  {query}
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

export default Search