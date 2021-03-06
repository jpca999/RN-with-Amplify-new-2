import React, { useState } from "react";
import { FlatList, View, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ListFRecords , listSelectedPriorityRecords} from '../src/graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'
import { onCreateRecord, onDeleteRecord, onUpdateRecord } from '../src/graphql/subscriptions'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';


class NewPriority extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      query: '',
      sample: 'the sample',
      fullData: [],
      posts: []
    }
  }

  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    console.log('48,', state);
    console.log('49,', props);
  };

  
  getPosts = async () => {
    const result = await API.graphql (graphqlOperation(listSelectedPriorityRecords))
    console.log(' 32- result = ', result ); 
    this.setState ({ posts: result.data.listRecords.items})

};

  componentDidMount() {
    this.getPosts()
    // this.makeRemoteRequest()
    this.createPostListener = API.graphql(graphqlOperation(onCreateRecord))
    .subscribe({
        next: postData => {
             const newPost = postData.value.data.onCreateRecord
             const prevPosts = this.state.posts.filter( post => post.id !== newPost.id)

             const updatedPosts = [newPost, ...prevPosts]

             this.setState({ posts: updatedPosts})
        }
    })

    this.deletePostListener = API.graphql(graphqlOperation(onUpdateRecord))
       .subscribe({
            next: postData => {

               const deletedPost = postData.value.data.onUpdateRecord
               const updatedPosts = this.state.posts.filter(post => post.id !== deletedPost.id)
               this.setState({posts: updatedPosts})
            }
       })

       this.updatePostListener = API.graphql(graphqlOperation(onUpdateRecord))
       .subscribe({
            next: postData => {
                 const { posts } = this.state
                //  console.log('70 - - - posts', posts);
                 const updatePost = postData.value.data.onUpdateRecord
                 console.log('72 - - - updatePost', updatePost);
                 const index = posts.findIndex(post => post.id === updatePost.id) //had forgotten to say updatePost.id!
                 const updatePosts = [
                     ...posts.slice(0, index),
                    updatePost,
                    ...posts.slice(index + 1)
                   ]

                   this.setState({ posts: updatePosts})

            }
       })
  }


  componentWillUnmount() {
    this.createPostListener.unsubscribe()
    this.deletePostListener.unsubscribe()
    this.updatePostListener.unsubscribe()
    // this.createPostCommentListener.unsubscribe()
    // this.createPostLikeListener.unsubscribe()
}

  render(props) {

    const Item = ({ item, onPress, style }) => (
      <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <View style={styles.listItem}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.companyName}</Text>
            <Text style={styles.subtitle}>{item.executiveFirstName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );

    // const [selectedId, setSelectedId] = useState(null);
    const handleSelect = (item) => {
      console.log('73--handle slected clicked  - id=', item); 
      this.props.navigation.navigate('DetailView',{item});
    }

    const renderItem = ({ item }) => {
      // const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
      return (
              <Item
                    item={item}
                    onPress={() => handleSelect(item) }
                />
        
      );
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          // extraData={selectedId}
        />
      </SafeAreaView>
    );
  }
}

export default NewPriority

// export default withNavigation(NewPriority);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#F5F5F5',
  },
  item: {
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
    // backgroundColor: '#f9c2ff'
  },
  listItem: {
    flex: 1,
    height: 75,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d6d7da',
    padding: 6,
  },
  imageWrapper: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    margin: 6,
    marginLeft: 77,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'left',
    margin: 6,
    // marginTop: 30,
    marginLeft: 80,
  },
  exname: {
    fontSize: 16,
  },
});

