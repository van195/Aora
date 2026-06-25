import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import icon from '@/app/constants/expoer_manager';
import { router, usePathname } from 'expo-router';
const SearchInput = () => {
  const pathName= usePathname(false);
  const [query, setQuery] = useState('')
  return (
      <View style={{width:'100%',height:'61px', paddingHorizontal:'40px',borderRadius:'18px', backgroundColor:'#232335', alignItems:'center',flexDirection:'row'}}>
        <TextInput 
          style={{flex:1, outline:'none',backgroundColor:'transparent' ,color:'#fff',marginLeft:'-40px', width:'350px',borderRadius:'20px',paddingHorizontal:'20px'}}
          value={query}
          placeholder='search for a video topic...'
          placeholderTextColor="#7b7b8b"
          onChangeText={(e)=> setQuery(e)}
        />
        <TouchableOpacity onPress={()=>{
          if(!query){
            return Alert.alert('Missing query','please input something to search results across database');
          }
          if(pathName.startsWith('/search')) router.setParams({query})
            else router.push(`/search/${query}`)
        }}>
            <Image
             source={icon.searchIcon}
             resizeMode='contain'
             style={{width:'25px',height:'25px'}}
            />
        </TouchableOpacity>
      </View>
  
  )
}

export default SearchInput;