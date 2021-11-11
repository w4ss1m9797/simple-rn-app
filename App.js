import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Image } from 'react-native';
import axios from 'axios';


export default function App() {

  //SATE LIST
  const [coffeList, setCoffeList] = useState([]); //ARRAY OF OBJECT CONTAIN IMAGE LINK AND TEXT ENTRED BY USER
  const [text, setText] = useState(''); // SATE OF INPUTTEXT VALUE TO USE IT LATER TO CLEAR TEXT AND SET IT INTO ARRAY


  // BUTTON CLICK ACTION
  const bTnClick = (val) => {
    axios.get('https://coffee.alexflipnote.dev/random.json')//IVE USED AXIOS TO GET THE JSON OBJECT
      .then(function (response) {
        //console.warn(response.data.file);
        setCoffeList(coffeList => [{ text: text, imgSrc: response.data.file }, ...coffeList]); // SET OBJECT IN THE FIRST TO BE DISPLAYED FIRST ON SCREEN
        setText(''); // CLEARING TEXT AFTER VALIDATING
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.inputText}
          value={text}
          placeholder='Quoi de neuf ?'
          onChangeText={text => setText(text)}
        />
        <View style={styles.bTn}>

          <Button

            color="#FFED4E"
            title='Publier'
            onPress={bTnClick}
          >
          </Button>
        </View>
      </View>

      <ScrollView style={styles.ScrollView}>
        {coffeList.map((item, i) => {
          return (
            <View key={i} style={styles.itemCss}>
              <Text style={styles.textItem}>{item.text}</Text>
              <Image style={styles.logo}
                source={{
                  uri: item.imgSrc,
                }} />
            </View>
          )
        })}
      </ScrollView>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'relative',// RESOLVED THE PROBLEM WHEN OPEN KEYBOARD IT PUSHES ALL COMPONENTS TO THE TOP
    marginTop: 40,
  },
  inputText: {
    width: 350,
    height: 50,
    backgroundColor: "#FAFAFA",
    borderRadius: 10
  },
  logo: {
    width: 350,
    height: 250,
  },
  bTn: {
    width: 100,
    alignSelf: 'flex-end',
    borderRadius: 100,
    margin: 10
  },
  ScrollView: {
    marginTop: 10
  },

  textItem: {
    marginBottom: 10,
    alignItems: 'flex-start'
  },
  itemCss: {
    margin: 10
  }
});
