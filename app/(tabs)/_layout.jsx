import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs,Redirect } from 'expo-router'
import icons from '../constants/expoer_manager.jsx'
const TabsLayouts = () => {
   
    const TabIcon = ({icon,name , focused , color})=>{
        return( 
            <View style={{flex:1, alignItems:'center', justifyContent:'center',gap:2}}>
             <Image 
              source={icon}
              resizeMode='contain'
              tintColor={color}
              style={{width:'30px',height:'30px'}}
              />
              <Text style={{color:color}}>{name}</Text>
            </View>
        )
    }
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel:false,
        tabBarActiveTintColor:'#FFA001',
        tabBarInactiveTintColor:'#CDCDE0',
        tabBarStyle:{
            backgroundColor:'#161622',
            borderTopWidth:1,
            borderTopColor:'#232533',
            height:80,
            paddingTop:12
        }
      }}
     >
        <Tabs.Screen 
            name="home"
            options={{
                title:'Home',
                headerShown:false,
                tabBarIcon:({color , focused })=>(
                    <TabIcon 
                    icon={icons.homeIcon}
                    color={color}
                    focused={focused}
                    name='Home'
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="bookMark"
            options={{
                title:'BookMark',
                headerShown:false,
                tabBarIcon:({color , focused })=>(
                    <TabIcon 
                    icon={icons.bookmarkIcon}
                    color={color}
                    focused={focused}
                    name='BookMark'
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="create"
            options={{
                title:'Create',
                headerShown:false,
                tabBarIcon:({color , focused })=>(
                    <TabIcon 
                    icon={icons.plusIcon}
                    color={color}
                    focused={focused}
                    name='Create'
                    />
                )
            }}
        />
        <Tabs.Screen 
            name="profile"
            options={{
                title:'Profile',
                headerShown:false,
                tabBarIcon:({color , focused })=>(
                    <TabIcon 
                    icon={icons.profileIcon}
                    color={color}
                    focused={focused}
                    name='Profile'
                    />
                )
            }}
        />
    </Tabs>
  )
}

export default TabsLayouts;