import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Treading = ({posts}) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item)=>item.$id}
      renderItem={({item})=>(
       <Text style={{color:'#f8f1f1'}}>{item.id}</Text>
      )}
      horizontal
    />
  )
}

export default Treading