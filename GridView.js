import { Image, StyleSheet, Text, View, FlatList} from 'react-native';

// Switchable view that allows user to see images in grid format
const GridView = (props) => {

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      flex: 4,
      justifyContent: 'center',
      backgroundColor: 'white',
      width: '100%',
    },
    photo: {
      flex: 1,
      height: 50,
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
    },
    gridItem: {
      flex: 1,
      margin: 2,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#CCCCCC',
      overflow: 'hidden',
    },
    itemName: {
      textAlign: 'center',
      marginTop: 5,
      fontSize: 16,
    },
  });

  // Render function for the FlatList, which shows how we want to return an image after a snap is taken
  const renderItem = ({ item }) => {
    return (
      <View style={styles.gridItem}>
        <Image style={styles.photo} source={{ uri: item.uri }} />
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
    );
  };

  var gridView= <View style={styles.container} >
                  <FlatList 
                    data={props.photolist}
                    renderItem={renderItem}
                    numColumns={2}
                    keyExtractor={(item, index) => index} 
                  />
                </View>
    return (gridView);
};

export {GridView};