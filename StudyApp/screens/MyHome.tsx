import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { database } from '..';
import Post from '../model/Post';

export function MyHome() {
  const [postData, setPostData] = useState({
    title: '',
    body: '',
    isPinned: false
  });

  const [posts, setPosts] = useState<Post[]>([]); // 一覧表示用ステート

  const handleChange = (key: 'title' | 'body' | 'isPinned', value: string) => {
    setPostData(prev => ({
      ...prev,
      [key]: value,
    }))
  };

  const handleRegister = async () => {
    try {
      await database.write(async () => {
        await database.get<Post>('posts').create(post => {
          post.title = postData.title;
          post.body = postData.body;
          post.isPinned = postData.isPinned;
        });
      });

      console.log('Post registered:', postData);
    } catch (error) {
      console.error('Error registering post:', error);
    }
  };

  const handleGetPosts = async () => {
    try {
      const allPosts = await database.get<Post>('posts').query().fetch();
      setPosts(allPosts);
      console.log('Fetched posts:', allPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="PostTitleを入力してください"
        value={postData.title}
        onChangeText={value => handleChange('title', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="PostBodyを入力してください"
        value={postData.body}
        onChangeText={value => handleChange('body', value)}
      />
      <Button title="登録" onPress={handleRegister} />
      <View style={styles.spacer} />
      <Button title="取得" onPress={handleGetPosts} />

      {/* 表示 */}
      <View style={styles.postListContainer}>
        {posts.map((post, index) => (
          <View key={post.id} style={styles.postItem}>
            <Text style={styles.postTitle}>[{index + 1}] {post.title}</Text>
            <Text>{post.body}</Text>
            <Text>{post.isPinned ? '📌 ピン留め中' : ''}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  postItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  postTitle: {
    fontWeight: 'bold',
    marginBottom: 3,
  },
  spacer: {
    height: 10,
  },
  postListContainer: {
    marginTop: 20,
    width: '100%',
  },
});
