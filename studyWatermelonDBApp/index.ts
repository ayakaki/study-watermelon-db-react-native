import { registerRootComponent } from 'expo';

import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import App from './App';
import Post from './model/Post';
import { mySchema } from './model/schema';

const adapter = new SQLiteAdapter({
  schema: mySchema,
  onSetUpError: error => {
    console.error('WatermelonDB setup error:', error);
  }
})

const database = new Database({
  adapter,
  modelClasses: [Post],
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
