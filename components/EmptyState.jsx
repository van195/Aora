import { View, Text, Image } from 'react-native'
import React from 'react'
import image from '../app/constants/expoer_manager'
import CustomButton from './CustomButton'
import { router } from 'expo-router'
const EmptyState = ({title, subtitle}) => {
  return (
    <View style={{justifyContent:'center',paddingHorizontal:'40px',alignItems:'center' }}>
      <Image
       source={image.emptyImage}
       style={{width:'270px',height:'215px'}}
       resizeMode='contain'
      />
        <Text style={{color:'#ffffffbb',fontSize:'18px',fontWeight:500}}>
            {title}
        </Text>
        <Text style={{color:'#ffffff',marginTop:'20px',fontSize:'20px',fontWeight:900}}>
            {subtitle}
        </Text>
        <CustomButton
          title='Create video'
          handlePress={()=>router.push('/create')}
          contentContainerStyle={{width:'100%',marginHorizontal:'50px'}}
        />
    </View>
  )
}

export default EmptyState