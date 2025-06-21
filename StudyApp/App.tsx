import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { sessionAtom } from './atom/sessionAtom';
import Auth from './components/Auth';
import { supabase } from './libs/supabase';
import { HomeScreen } from './screens/HomeScreen';

function App() {

  const [session, setSession] = useAtom(sessionAtom);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [session, setSession]);

  return (
    <View>
      {!session && <Auth />}
      {session && <Text>{session.user.id}</Text>}
      {session && session.user && <HomeScreen />}
    </View>
  );
}

export default App;
