import { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { PreviewView } from './PreviewView';
import { GridView } from './GridView'
import * as Sharing from 'expo-sharing';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "lightgrey",
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
  camera: {
    flex: 3,
    height: 100,
    width: "100%",
    padding: 5,
    borderWidth: 5,
    marginTop: '20%',
    objectFit: 'cover',
    margin: 'auto',
    marginBottom: '5%',
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
const CameraApp = () => {

  var initialPhotoList = [];
  
  //useState variables and functions
  const [hasPermission, setHasPermission] = useState(null);
  const [aphoto, setPhoto] = useState(null);
  const [photolist, setPhotoList] = useState(initialPhotoList);
  const [currView, setCurrView] = useState(true);

  useEffect(() => {

    // Determines if an image should be previewed upon render
    if (photolist.length > 0) {
      setPhoto(photolist[photolist.length - 1].uri);
    } else {
      setPhoto(null); // Set aphoto to null if the list is empty

    }

    // Asynchronous permission request logic
    (async () => {
        var { status } = await Camera.requestCameraPermissionsAsync();
                      setHasPermission(status === 'granted');
    })();
     
  }, [photolist]); // Re-render upon changes to photoList, there could exist a more efficient alternative


  // If checks to determine if our app is able to have permission to user's camera
  if (hasPermission === null) {
    var notice = <View ><Text>No Access To Cameara</Text></View>;
    return notice;
  }

  if (hasPermission === false) {
    var anotice = <View ><Text>No Access To Cameara</Text></View>;
    return anotice;
  }

  // Function to delete latest picture
  var minus = () => {
    setPhotoList(prevPhotoList => {
      var updatedPhotoList = [...prevPhotoList];
      updatedPhotoList.shift(); // Remove most recent element from list (because we add on front)
      return updatedPhotoList;
    });

    if (photolist.length > 0) {
      setPhoto(photolist[photolist.length - 1].uri);
    } else {
      setPhoto(null); // Set aphoto to null if the list is empty
    }
  };
  
  // Function to take camera picture
  var takePhoto = async () => {
    if (!this.SnapCamera) {
      console.log("Camera not available");
      return;
    }

    try {
      var options = { quality: 0.5, base64: true };
      var photo = await this.SnapCamera.takePictureAsync(options); 
      photo.name= "Photo: " + (photolist.length + 1); // Name will be used if in GridView     
      console.log("Photo taken:", photo.uri);
      setPhoto(photo.uri);
      setPhotoList([photo, ...photolist]); // Add the photo to our photoList
      console.log("Photo added to the list");
    } catch (error) {
      console.error("Error while taking photo:", error);
    }
  };


  // Function to share a photo, which also should allow the user to save the photo
  var sharePhoto = async () => {
    try {
      if (!aphoto) {
        console.log("No photo available to share");
        return;
      }

      await Sharing.shareAsync(aphoto); // This is where we make the Share call which should activate the popop on mobile device, doesn't work on web 
    } catch (error) {
      console.error("Error while sharing photo:", error);
    }
  };

  // Function to change from preview mode, to grid mode, similar to example program on class resources page
  var changeView = () => {
    setCurrView(!currView);
    console.log(currView);
  }


  const CameraComp = <Camera 
                      ref = {ref => { this.SnapCamera = ref }} 
                      style = {styles.camera} 
                      type = {Camera.Constants.Type.front} 
                    />

  var CameraView = <Text> No View Avaiable </Text>

  if (currView){
      CameraView = <View style={styles.container}>
        {CameraComp}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => takePhoto()}>
            <Text style={{ color: 'white' }}>Snap</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => minus()}>
            <Text style={{ color: 'white' }}>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress= {() => sharePhoto()}>
            <Text style={{ color: 'white' }}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => changeView()}>
            <Text style={{ color: 'white' }}>Switch</Text>
          </TouchableOpacity>
      </View>
        <PreviewView photolist={photolist} source={{uri: aphoto}} />
     </View>

  } else {
    CameraView = <View style={styles.container}>
        {CameraComp}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => takePhoto()}>
            <Text style={{ color: 'white' }}>Snap</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => minus()}>
            <Text style={{ color: 'white' }}>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress= {() => sharePhoto()}>
            <Text style={{ color: 'white' }}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => changeView()}>
            <Text style={{ color: 'white' }}>Switch</Text>
          </TouchableOpacity>
      </View>
        <GridView photolist={photolist} source={{uri: aphoto}} />
     </View>
  }



  return (CameraView)  

}

export default CameraApp;