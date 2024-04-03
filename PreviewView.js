import {useState} from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


// Initial view that will allow for browsing through the gallery
const PreviewView = (props) => {
  const styles = StyleSheet.create({
    photoContainer: {
      flex: 1,
      height: 50,
      maxWidth: '100%', 
      overflow: 'hidden', 
      borderWidth: 2,
      marginTop: 25,
      marginRight: 20,
      borderRadius: 15, 
    },
    photo: {
      flex: 1, 
      resizeMode: 'cover', 
    },
    preview: {
      flex: 6,
      height: 300,
      width: '100%',
      padding: 2,
      borderRadius: 15,
      margin: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      marginTop: 10,
      justifyContent: 'center', 
    },
    button: {
      margin: 10, 
      padding: 15, 
      borderRadius: 100, 
      backgroundColor: 'blue',
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    dislikeButton: {
      backgroundColor: 'red', 
    },
    likeButton: {
      backgroundColor: 'green',
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

var previewView= 
                <View style={styles.preview}>
                  <View style={styles.photoContainer}>
                    <Image style={styles.photo} source={asource}/>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.dislikeButton]} onPress={() => prev()}>
                      <Icon name="thumbs-down" size={30} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.likeButton]} onPress={() => next()}>
                      <Icon name="thumbs-up" size={30} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>

   return (previewView);
};

export {PreviewView};