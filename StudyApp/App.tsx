import { Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Auth from './components/Auth';
import { supabase } from './libs/supabase';
import { HomeScreen } from './screens/HomeScreen';

function App() {

  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View>
      {!session && <Auth />}
      {session && <Text>{session.user.email}</Text>}
      {session && session.user && <HomeScreen />}
    </View>
  );
}

export default App;
