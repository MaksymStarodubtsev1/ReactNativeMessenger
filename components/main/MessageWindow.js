import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { useState } from 'react/cjs/react.development';
import reload from './controlers/reload';
import io from 'socket.io-client';

export default function MessageWindow({userSelected}) {

const [initialData, setInitialData] = useState([])
const [messageText, setMessageText] = useState('')


let socket = io("wss://maksymmobileapp.herokuapp.com", { transports : ['websocket'] });

socket.on("connect", () => {
  console.log('hello');
})


socket.on('secondEvent', (e) => {
  socket.emit('getChatData', (res) => {
    console.log('hhh', res)
    setInitialData(Object.values(res))
  })  
  console.log('secondEvent', e)
})

socket.on('updatedMessages', (res) => {
  setInitialData( () => {
    console.log('IMPORAant', res);
    return Object.values(res)
  })
})

function click(request) {
  socket.emit('sendMessage', JSON.stringify(request))
}

//////////////////////////////

  function reloadMessages() {
    reload()
    .then(res => {
      console.log(Object.values(res))
      const result = Object.values(res)
      return setInitialData(result)
    })
    .catch((err) => {
      alert(err)
    })
    .finally(() => {
      console.log('finaly')
    })
  }

  // function click(request) {
  //   fetch('https://vue-http-demo-763e4-default-rtdb.europe-west1.firebasedatabase.app/olenamaksym.json', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(request)
  //   })
  //   .then(() => {reloadMessages()})
  // }

  useEffect(() => {
    reloadMessages()
  },[])

  const defineUser = function(user) {
    const position = user === 'Max' ? 'flex-start' : 'flex-end'
    return {
          display: 'flex',
          alignSelf: position,
          padding: 10,
          marginTop: 5,
          backgroundColor: 'lightsteelblue',
          borderRadius: 25,
    }
  }


  return (
    <View style={{height: '100%', alignContent: 'space-between'}}>
        <View style={{overflow: 'scroll', flex: 5}}>
            <ScrollView id='hello'>
                {
                    console.log(initialData) ||
                    initialData.length > 0
                        ? initialData.map((el,index) => {

                            return (
                                <View key={index} style={defineUser(el.user)}>
                                    <Text>{el.message}</Text>
                                </View>
                            )
                        })

                        : <Text>loading...</Text>
                }
            </ScrollView>
        </View>
      <View style={{paddingTop: 10, flex: 1}}>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          onChangeText={text => setMessageText(text)}
          defaultValue={messageText}
        />

        <Button onPress={() => click({message: messageText, user: userSelected})} title={`${userSelected} send`}/>
        <Button onPress={reloadMessages} title="reload the page"/>
      </View>
       {/*<script type="text/javascript">{window.scrollTo(0,document.getElementById('hello').scrollHeight)}</script>*/}
  </View>
  )
}