import { useState, useEffect } from 'react';
import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { PreviewView } from './PreviewView';
import * as Sharing from 'expo-sharing';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "pink",
    padding: 5,
  },
  buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      marginTop: 20,
      justifyContent: 'top',
      margin: 'auto',
  },
  input: {
    height: 40,
    margin: 15,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    
  },
  button: {
    margin: 10,
    paddingVertical: 15, 
    paddingHorizontal: 10, 
    borderRadius: 10, 
    backgroundColor: 'blue', 
  },
  photo: {
    flex: 1, 
    resizeMode: 'cover', 
    width: '100%',
    height: '100%'
  }
});


//This is the main function we will run to render the UI. At the end of it, we can see that we render the Camera, toolbar, and then the photo list view.
const TinderApp = () => {

  var initialPhotoList = [
    {key: "Mr. Froggy", uri:"https://i.pinimg.com/originals/0f/19/a4/0f19a41875f8162fad5f658dc427a47d.png", nLikes: 0},
    {key: "Hooded Sword Girl", uri:"https://i.pinimg.com/originals/72/72/11/727211b148f69c5723190ded58755ce0.png", nLikes: 1},
    {key: "Mrs. Puff", uri:"https://i.pinimg.com/originals/72/8a/c4/728ac41f011836125b37157d3e582616.png", nLikes: 1},
    {key: "Ruma-dum-dum", uri:"https://i.pinimg.com/originals/24/e6/8c/24e68cefced1031c34df80f232a10601.png", nLikes: 0},
    {key: "Morning Vibes", uri:"https://i.pinimg.com/originals/00/28/5d/00285dd455af6037dfd4aa9006bba242.png", nLikes: 0},
    {key: "Elf Boy", uri:"https://i.pinimg.com/originals/88/3e/92/883e923bffdc6cc9b4f94a1e7c2a1fd6.png", nLikes: 1}
  ];


  //useState variables and functions
  const [aPhotoUri, setPhotoUri] = useState(null);
  const [photolist, setPhotoList] = useState(initialPhotoList);
  const [matched, setMatched] = useState(-1);
  useEffect(() => {

    // Determines if an image should be previewed upon render
    if (photolist.length > 0) {
      setPhotoUri(photolist[photolist.length - 1].uri);
    } else {
      setPhotoUri(null); // Set aphoto to null if the list is empty
    }
     
  }, [photolist]); // Re-render upon changes to photoList, there could exist a more efficient alternative

  TinderView = <View style={styles.container}>
    <PreviewView photolist={photolist} source={{uri: aPhotoUri}} matched={setMatched} />
  </View>

  if (matched != -1 ) {
    console.log("matched="+matched);
    console.log("uri="+photolist[matched]?.uri)
    return(
      <>
        <Image style={styles.photo} source={{uri: photolist[matched]?.uri}} />
        <Text>Yay you matched!</Text>
      </>
    )
  }
  else {
    return (TinderView)  
  }

}

export default TinderApp;