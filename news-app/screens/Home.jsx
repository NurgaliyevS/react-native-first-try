import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Alert,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Post from '../components/Post';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState();

  function fetchPosts() {
    setIsLoading(true);
    axios
      .get('https://5c3755177820ff0014d92711.mockapi.io/articles')
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(fetchPosts, []);

  if (isLoading) {
    return (
      <View
        style={{
          // all width
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size='large' />
        <Text style={{ marginTop: 15 }}>Loading ...</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />
        }
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Post
              title={item.title}
              createdAt={item.createdAt}
              imageUrl={item.imageUrl}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
