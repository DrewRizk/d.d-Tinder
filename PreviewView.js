import {useState} from 'react';
import { ImageBackground, Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
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
      marginTop: 80,
      marginRight: 20,
      borderRadius: 15, 
    },
    photo: {
      flex: 1, 
      resizeMode: 'cover', 
      width: '100%',
      height: '100%',
      justifyContent: 'flex-end',
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

    name: {
      fontSize: 30,
      color: 'white',
      fontWeight: 'bold',
    },

    bio: {
      fontSize: 18,
      color: 'white',
      lineHeight:24,
    },
     
    info: {
      padding: 10,
    }
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
  let curr = props.photolist[currentSnap];

  function next() {
    var len = props.photolist.length-1;
    if (len == currentSnap)
    {
      return; // Can't go past end of list
    }
    else
    {
      let curr = props.photolist[currentSnap].nLikes;
      curr++;
      if (curr == 2 ) 
      { 
        props.matched(currentSnap)
        props.matchView(true);
      }
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
        <ImageBackground style={styles.photo} source={asource}>
          <View style={styles.info}>
            <Text style={styles.name}>{curr.key}</Text> 
            <Text style={styles.bio}>{curr.bio}</Text> 
          </View>
        </ImageBackground>
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