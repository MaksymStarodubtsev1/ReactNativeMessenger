import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';

export default function User({users,style,setUserSelected}) {
  return (
    <View style={style}>
      {users.map(user => {
        return (
          <View key={user.id} style={styles.user}> 
            <Button title={user.name} onPress={() => {
            setUserSelected(user.name)
            }}/>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  user: {
    padding: 1,
    marginTop: 5,
    backgroundColor: '#fff',
  }
})