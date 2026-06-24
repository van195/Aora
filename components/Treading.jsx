import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { ImageBackground } from 'expo-image';
import React, { useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable';
import {zoomIn , zoomOut} from '@/app/constants/ObjectValues'
import icon from '@/app/constants/expoer_manager'
const TrendingItems = ({activeItem,item})=>{
  const [playing , setPlaying ] = useState(false);  
 
  return(
    <Animatable.View
     style={{marginRight:'25px'}}
     animation={activeItem === item.$id ? zoomIn : zoomOut}
     duration={500}
    >
     {
      playing ? (
        <Text style={{color:'#fff'}}>playing</Text>
      ):(
        <TouchableOpacity
         style={{position:'relative', alignItem:'center',justifyContent:'center' }}
         activeOpacity={0.7}
         onPress={()=> setPlaying(true)}
        >
          <ImageBackground 
           source={{uri:item.thumbnail}}
           style={{width:'170px',height:'270px',border:'1px solid #fff',borderRadius:'20px', marginVertical:'30px', overFlow:'hidden',}}
           contentFit='cover'
          />
           <Image
            source={icon.playIcon}
            resizeMode='contain'
            style={{width:'30px',height:'30px', position:'absolute', left:'60px'}}
            />
        </TouchableOpacity>
      )
     }
    </Animatable.View>
  )
}

const Treading = ({posts}) => {
  const [activeItem,setActiveItem ] = useState(posts[0]);
  const viewableItemChanged= useRef(({viewableItems})=>{
   if(viewableItems.length > 0){
    setActiveItem( viewableItems[0].key)
   }
  });
  return (
    <FlatList
      data={posts}
      keyExtractor={(item)=>item.$id}
      renderItem={({item})=>(
        <TrendingItems
          activeItem={activeItem}
          item={item}
        />
      
      )}
      onViewableItemsChanged={viewableItemChanged.current}
      viewabilityConfig={{
        itemVisiblePercentThreshold:70
      }}
      contentOffset={{x:170}} // when we apply that visiblity percentage
      horizontal
    />
  )
}

export default Treading