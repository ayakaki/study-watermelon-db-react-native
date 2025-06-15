import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import Database from '@nozbe/watermelondb/Database';
import Comment from './model/Comment';
import migrations from './model/migrations';
import Post from './model/Post';
import { mySchema } from './model/schema';

const adapter = new SQLiteAdapter({
  schema: mySchema,
  migrations,
  dbName: 'mydb',
  jsi: true, /* Platform.OS === 'ios' */
  onSetUpError: error => {
    console.error('WatermelonDB setup error:', error);
  }
})

export const database = new Database({
  adapter,
  modelClasses: [
    Post,
    Comment
  ],
})
AppRegistry.registerComponent(appName, () => App);
