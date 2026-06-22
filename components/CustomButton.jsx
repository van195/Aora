import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({title, handlePress, contentContainerStyle, isLoading, textStyle}) => {
  return (
    <TouchableOpacity
     onPress={handlePress}
     activeOpacity={0.7}
     disabled={isLoading}
     style={[{backgroundColor:'#eead20', borderRadius:'10px' , minHeight:'64px' , justifyContent:'center',alignItems:'center' },contentContainerStyle]}>
      <Text style={[{fontWeight:'bolder',color:'#000',fontSize:19},textStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton