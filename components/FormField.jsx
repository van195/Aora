import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react';
import icon from '@/app/constants/expoer_manager';

const FormField = ({title, value, placeHolder, otherStyle,handleChangeText, textStyle,...props}) => {
  const [showPassword , setShowPassword]= useState(false);
  
  return (
    <View style={otherStyle}>
      <Text style={[{color:'#fff'},textStyle]}>{title}</Text>
      <View style={{width:'100%',height:'61px', paddingHorizontal:'40px',borderRadius:'18px', backgroundColor:'#232335', alignItems:'center',flexDirection:'row'}}>
        <TextInput 
          style={{flex:1, outline:'none',backgroundColor:'transparent' ,color:'#fff',marginLeft:'-40px', width:'350px',borderRadius:'20px',paddingHorizontal:'20px'}}
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={()=>{setShowPassword(!showPassword)}}>
             <Image 
              source={!showPassword ? icon.eyeHideIcon : icon.eyeIcon}
              style={{width:'30px',height:'30px', resizeMode:'contain'}}
             />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField;