import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Alert,
  View,
  FlatList,
  ActivityIndicator,
  Text,
  RefreshControl,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import Post from '../components/Post';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState();

  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      '395452257026-f7j0skb016n8ld9g7pciddfbfugrb4b6.apps.googleusercontent.com',
    iosClientId:
      '395452257026-g62220qshl1glrb9ohe4r1jqarcqugnv.apps.googleusercontent.com',
    webClientId:
      '395452257026-g62220qshl1glrb9ohe4r1jqarcqugnv.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      setAccessToken(response.authentication.accessToken);
    }
  }, [response]);

  async function getUserData() {
    let userInfoResponse = await fetch(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
  }

  function showUserInfo() {
    if (userInfo) {
      return (
        <View style={{ backgroundColor: 'green' }}>
          <Image source={{ uri: userInfo.picture }} />
          <Text>Welcome {userInfo.name}</Text>
        </View>
      );
    }
  }

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
          <TouchableOpacity
            onPress={({}) => {
              navigation.navigate('FullPost', {
                id: item?.id,
                title: item?.title,
              });
            }}
          >
            <Post
              title={item.title}
              createdAt={item.createdAt}
              imageUrl={item.imageUrl}
            />
          </TouchableOpacity>
        )}
      />
      {showUserInfo()}
      <Button
        title={accessToken ? 'Get User data' : 'Login'}
        onPress={
          accessToken
            ? getUserData
            : () => {
                promptAsync({ showInRecents: true });
              }
        }
      />
    </View>
  );
}
