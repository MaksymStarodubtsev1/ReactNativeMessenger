import React, {useState, useMemo} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MessageWindow from './components/main/MessageWindow.js';
import Users from './components/Users.js'

export default function App() {
  const users = [
    {
      id:0,
      name: 'Olena',
    },
    {
      id:1,
      name: 'Max',
    },
    {
      id:2,
      name: 'Olya',
    },
    {
      id:3,
      name: 'Mariya',
    },
  ]

  const [userSelected, setUserSelected] = useState(0)

  return (
    <View style={styles.container}>
      <Users style={styles.sideBar} users={users}  setUserSelected={setUserSelected}/>
      <View style={styles.main}>
        <MessageWindow userSelected={userSelected}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cbcbcb',
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 30,
  },
  sideBar: {
    minWidth: 70,
    backgroundColor: 'white',
  },
  main: {
    padding: 10,
    backgroundColor: '#f6f8ff',
    flex: 1,
  }
});
