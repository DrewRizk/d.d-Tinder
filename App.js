import { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
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
});


//This is the main function we will run to render the UI. At the end of it, we can see that we render the Camera, toolbar, and then the photo list view.
const TinderApp = () => {

  var initialPhotoList = [];
  
  //useState variables and functions
  const [aphoto, setPhoto] = useState(null);
  const [photolist, setPhotoList] = useState(initialPhotoList);

  useEffect(() => {

    // Determines if an image should be previewed upon render
    if (photolist.length > 0) {
      setPhoto(photolist[photolist.length - 1].uri);
    } else {
      setPhoto(null); // Set aphoto to null if the list is empty

    }
     
  }, [photolist]); // Re-render upon changes to photoList, there could exist a more efficient alternative


  TinderView = <View style={styles.container}>
    <PreviewView photolist={photolist} source={{uri: aphoto}} />
  </View>


  return (TinderView)  

}

export default TinderApp;