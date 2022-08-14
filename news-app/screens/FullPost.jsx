import React, { useEffect, useState } from 'react';

import axios from 'axios';

import styled from 'styled-components/native';
import { View, Alert } from 'react-native';
import Loading from '../components/Loading';

const PostImage = styled.Image`
  border-radius: 10px;
  width: 100%;
  height: 250px;
  margin-bottom: 20px;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

function FullPostScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const { id, title } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title,
    });

    setIsLoading(true);
    axios
      .get('https://5c3755177820ff0014d92711.mockapi.io/articles/' + id)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Ошибка', 'Не удалось получить статью');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loading />
      </View>
    );
  }

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <PostImage source={{ uri: data?.imageUrl }} />
      <PostText>{data?.text}</PostText>
    </View>
  );
}

export default FullPostScreen;
