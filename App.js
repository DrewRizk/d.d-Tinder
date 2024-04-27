import { useState, useEffect } from 'react';
import { Image, TouchableOpacity, FlatList, StyleSheet, Text, View } from 'react-native';
import { Camera } from 'expo-camera';
import { PreviewView } from './PreviewView';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Sharing from 'expo-sharing';
import profiles from './profiles/profiles';
import personal from './profiles/personal';
import { loadList, saveList } from './remoteAccess';
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
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0, 
    zIndex: 1,
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
    height: '100%',
  },
  profileButton: {
    backgroundColor: 'pink',

  },
  chatButton: {
    backgroundColor: 'pink',
    right: 0,
    
  },
  messageContainer: {
    flex: 1,
    backgroundColor: 'pink',
  },
  backButton: {
    top: 20,
    left: 20,
    zIndex: 2,
    marginTop: 30,
    marginBottom: 5,
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50, 
  },
  chatBox: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    marginLeft: 20, 
    marginRight: 20,
    borderRadius: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  chatText: {
    fontSize: 16,
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: 'white', // Add a white border around the circle
    marginTop: '70%',
    marginLeft: 85,
  },
  characterImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  matchMessage: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  DMHeaders: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: 'pink',
  },
  profileScreen: {
    backgroundColor: 'pink',
    height: '100%'
  },
  chatName: {
    marginLeft:25,
    marginTop:10
  },
  DMHeadersText: {
    height: "10%",
    padding: 20,
    fontWeight: "bold",
  },
});



//This is the main function we will run to render the UI. At the end of it, we can see that we render the Camera, toolbar, and then the photo list view.
const TinderApp = () => {


  var initialPhotoList = profiles;
  var personalPic = personal;
  
  //useState variables and functions
  const [aPhotoUri, setPhotoUri] = useState(null);
  const [photolist, setPhotoList] = useState(initialPhotoList);
  const [matched, setMatched] = useState(-1);
  const [messageView, setMessageView] = useState(false);
  const [matchView, setMatchView] = useState(false);
  const [profileView, setProfileView] = useState(false);


  useEffect(() => {

    // Determines if an image should be previewed upon render
    if (photolist.length > 0) {
      setPhotoUri(photolist[photolist.length - 1].uri);
    } else {
      setPhotoUri(null); // Set aphoto to null if the list is empty
    }
     
  }, [photolist]); // Re-render upon changes to photoList, there could exist a more efficient alternative

  useEffect(() => {
    loadList(photolist, setPhotoList);
  }, []);

  let messageList = [
    {name: "Dragon", message: "U up?"},
    {name: "Elf", message: "Wyd??"},
    {name: "Monster", message: "Yoo u up?"},
    {name: "Sorcerer", message: "Im bored, u up?"},
    {name: "Wicked Elf", message: "Hey wyd"},
    {name: "Ogre", message: "Im sorryyyyy"},
    {name: "Troll", message: "Dudeee didn't mean it like that"},
    {name: "Fairy", message: "Whatever "},
    {name: "Human", message: "Kick rocks"}
  ];
  
  const chatButtonNavigator = () => {
    setMessageView(!messageView);
  };

  const matchNavigator = () => {
    setMatchView(!matchView);
  };

  const profileNavigator = () => {
    setProfileView(!profileView);
    console.log(profileView);
  };


  const renderItem = ({ item }) => {
    return(
      <>
        <View style={styles.chatItem}>
          <Text style={styles.chatName}>{item.name}</Text>
          <View style={styles.chatBox}>
            <Text style={styles.chatText}>
              {item.message}   
            </Text>   
          </View> 
        </View>
      </>
    )
  };

  TinderView = 
    <>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.profileButton]} onPress={profileNavigator}>
          <Icon name="user" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.chatButton]} onPress={chatButtonNavigator}>
          <Icon name="comment-o" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <PreviewView photolist={photolist} source={{ uri: aPhotoUri }} matched={setMatched} matchView={setMatchView} />
      </View>
    </>

  if (matched != -1 && matchView) {
    console.log("matched="+matched);
    console.log("uri="+photolist[matched]?.uri)
    return(

      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={matchNavigator}>
          <Icon name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
      {/* Character Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: photolist[matched]?.uri }} style={styles.characterImage} />
      </View>

      {/* Match Message */}
      <Text style={styles.matchMessage}>Congratulations! You've matched with {photolist[matched]?.name}!</Text>
    </View>
    )
  }else if (messageView){
    return (
      <>
      <View style={styles.DMHeaders}>
          <TouchableOpacity style={styles.backButton} onPress={chatButtonNavigator}>
            <Icon name="arrow-left" size={30} color="white" />
          </TouchableOpacity>
        <Text style={styles.DMHeadersText}>User's Name</Text>
        <Text style={styles.DMHeadersText}>Messages</Text>
        <FlatList style={styles.messageContainer}
          data={messageList}
          renderItem={renderItem}
        />
      </View>
      {}
    </>
    );
  }else if (profileView){
    return (
      <>
      <View style={styles.profileScreen}>
          <TouchableOpacity style={styles.backButton} onPress={profileNavigator}>
            <Icon name="arrow-left" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.matchMessage}> Welcome to your profile page!</Text>
          <View style={styles.imageContainer}>
            <Image source={{ uri: personal[0]?.uri }} style={styles.characterImage} />
          </View>
          <Text style={styles.matchMessage}> Name: {personal[0]?.name}</Text>
          <Text style={styles.matchMessage}> Bio: {personal[0]?.bio}</Text>
      </View>
      {}
    </>
    );
  }
  else {
    return (TinderView)  
  }

}

export default TinderApp;