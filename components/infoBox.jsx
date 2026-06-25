import { View, Text } from 'react-native'
import React from 'react'

const infoBox = ({title,subtitle,containerStyle,textStyle}) => {
  return (
    <View style={containerStyle}>
      <Text style={[{color:'#fff', textAlign:'center'},textStyle]}>{title}</Text>
      <Text style={[{color:'#fff', textAlign:'center'}]}>{subtitle}</Text>
    </View>
  )
}

export default infoBox