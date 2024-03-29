import {useState} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

// Initial view that will allow for browsing through the gallery
const PreviewView = (props) => {

  const styles = StyleSheet.create({
    photo: {
      flex: 1,
      height: 50,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    preview: {
      flex: 6,
      height: 300,
      width: '100%',
      padding: 2,
      borderWidth: 5,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      marginTop: 20,
      justifyContent: 'top',
      margin: 'auto',
    },
    button: {
      margin: 10,
      paddingVertical: 15, 
      paddingHorizontal: 20, 
      borderRadius: 10, 
      backgroundColor: 'blue', 
    },
  });


  const [currentSnap, setCurrentSnap] = useState(0);
  const [listLength, setListLength] = useState(0);


  // Similar to class resources example, just decrements current photo index (if possible)
  function prev() {
    if (currentSnap == 0)
    {
      return; // No photos to operate on
    }
    else{
      var newPhoto = currentSnap - 1;
      setCurrentSnap(newPhoto);
    }
  }

  // Similar to class resources example, just increments current photo index (if possible)
  function next() {
    var len = props.photolist.length-1;
    if (len == currentSnap)
    {
      return; // Can't go past end of list
    }
    else
    {
      var newPhoto = currentSnap +1;
      setCurrentSnap(newPhoto);
    }
  }

// Update the source of the image based on the current photo index
const asource = props.photolist.length > 0
  ? { uri: props.photolist[currentSnap]?.uri }
  : props.source;

// Reset currentSnap and listLength if the photolist length changes
if (listLength !== props.photolist.length) {
  setListLength(props.photolist.length);
  setCurrentSnap(0);
}

var previewView= <View style={styles.preview} >
        <Image style={styles.photo} source={asource}/>
        <View style={styles.buttonContainer} >
        <TouchableOpacity style={styles.button} onPress={() => prev()}>
          <Text style={{ color: 'white' }}>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => next()}>
          <Text style={{ color: 'white' }}>Next</Text>
        </TouchableOpacity>
        </View>
        <Text> Image {currentSnap+1}/{props.photolist.length}</Text>
        </View>
   return (previewView);
};

export {PreviewView};