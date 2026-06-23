import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import icon from '@/app/constants/expoer_manager';

const SearchInput = ({title, value, placeHolder, otherStyle,handleChangeText, ...props}) => {
  const [showPassword , setShowPassword]= useState(false);
  
  return (
      <View style={{width:'100%',height:'61px', paddingHorizontal:'40px',borderRadius:'18px', backgroundColor:'#232335', alignItems:'center',flexDirection:'row'}}>
        <TextInput 
          style={{flex:1, outline:'none',backgroundColor:'transparent' ,color:'#fff',marginLeft:'-40px', width:'350px',borderRadius:'20px',paddingHorizontal:'20px'}}
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        <TouchableOpacity>
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