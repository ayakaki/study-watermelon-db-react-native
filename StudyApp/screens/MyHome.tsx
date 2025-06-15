import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { database } from '..';
import Comment from '../model/Comment';
import Post from '../model/Post';

export function MyHome() {
  const [postData, setPostData] = useState({
    title: '',
    subtitle: '',
    body: '',
    isPinned: false,
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>({});
  const [newComments, setNewComments] = useState<Record<string, string>>({});

  const handleChange = (key: keyof typeof postData, value: string) => {
    setPostData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      await database.write(async () => {
        await database.get<Post>('posts').create(post => {
          post.title = postData.title;
          post.subtitle = postData.subtitle;
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

      const commentsMap: Record<string, Comment[]> = {};

      for (const post of allPosts) {
        const comments = await post.comments.fetch();
        commentsMap[post.id] = Array.isArray(comments) ? comments : [comments].filter(Boolean);
      }
      setCommentsMap(commentsMap);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCommentChange = (postId: string, value: string) => {
    setNewComments(prev => ({
      ...prev,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = async (postId: string) => {
    const commentText = newComments[postId];
    if (!commentText) return;

    try {
      await database.write(async () => {
        await database.get<Comment>('comments').create(comment => {
          comment.body = commentText;
          comment.postId = postId;
        });
      });
      handleGetPosts(); // Refresh
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput style={styles.input} placeholder="PostTitle" value={postData.title} onChangeText={v => handleChange('title', v)} />
      <TextInput style={styles.input} placeholder="Subtitle" value={postData.subtitle} onChangeText={v => handleChange('subtitle', v)} />
      <TextInput style={styles.input} placeholder="PostBody" value={postData.body} onChangeText={v => handleChange('body', v)} />
      <Button title="登録" onPress={handleRegister} />
      <View style={styles.spacer} />
      <Button title="取得" onPress={handleGetPosts} />

      <View style={styles.postListContainer}>
        {posts.map((post, index) => (
          <View key={post.id} style={styles.postItem}>
            <Text style={styles.postTitle}>[{index + 1}] {post.title}</Text>
            <Text>{post.subtitle}</Text>
            <Text>{post.body}</Text>
            <Text>{post.isPinned ? '📌 ピン留め中' : ''}</Text>

            <Text style={styles.commentHeader}>コメント</Text>
            {commentsMap[post.id]?.map(comment => (
              <Text key={comment.id} style={styles.commentText}>・{comment.body}</Text>
            ))}
            <TextInput
              style={styles.input}
              placeholder="コメントを入力"
              value={newComments[post.id] || ''}
              onChangeText={value => handleCommentChange(post.id, value)}
            />
            <Button title="コメント追加" onPress={() => handleCommentSubmit(post.id)} />
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
  spacer: {
    height: 10,
  },
  postListContainer: {
    marginTop: 20,
    width: '100%',
  },
  postItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  postTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentHeader: {
    marginTop: 10,
    fontWeight: 'bold',
  },
  commentText: {
    marginLeft: 10,
    marginBottom: 2,
  },
});
