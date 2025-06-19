import { synchronize } from '@nozbe/watermelondb/sync';
import React, { useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import { database } from '..';
import { CONSTS } from '../consts';
import { supabase } from '../libs/supabase';

export const SyncView = () => {
  const [loading, setLoading] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSync = async () => {
    setLoading(true);
    setError(null);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) throw new Error('ユーザーが未認証です');

      const accessToken = session.access_token;

      await synchronize({
        database,
        pullChanges: async ({ lastPulledAt }) => {

          console.log('Pulling changes since:', lastPulledAt);

          const res = await fetch(
            `${CONSTS.API.SERVER}/${CONSTS.API.FUNCTIONS.PULL_CHANGES.FUNCTIONS_STR}/${CONSTS.API.FUNCTIONS.PULL_CHANGES.VERSION}/${CONSTS.API.FUNCTIONS.PULL_CHANGES.FUNCTION_NAME}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({ last_pulled_at: lastPulledAt, user_id: session.user.id }),
            }
          );

          console.log('pullChanges response:', res);

          if (!res.ok) throw new Error('pullChanges に失敗しました');
          return await res.json();
        },
        pushChanges: async ({ changes, lastPulledAt }) => {

          const res = await fetch(
            `${CONSTS.API.SERVER}/${CONSTS.API.FUNCTIONS.PUSH_CHANGES.FUNCTIONS_STR}/${CONSTS.API.FUNCTIONS.PUSH_CHANGES.VERSION}/${CONSTS.API.FUNCTIONS.PUSH_CHANGES.FUNCTION_NAME}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
              },
              body: JSON.stringify({ changes, lastPulledAt }),
            }
          );

          console.log('pushChanges response:', res);

          if (!res.ok) throw new Error('pushChanges に失敗しました');
        },
        sendCreatedAsUpdated: true,
      });

      setLastSyncedAt(Date.now());
    } catch (err: any) {
      console.error(err);
      setError(err.message || '同期中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>データ同期</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Button title="同期する" onPress={handleSync} />
      )}

      {lastSyncedAt && <Text style={styles.syncedAt}>最終同期: {new Date(lastSyncedAt).toLocaleString()}</Text>}
      {error && <Text style={styles.error}>{error}</Text>}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  syncedAt: {
    marginTop: 20,
    color: '#333',
    textAlign: 'center',
  },
  error: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center',
  },
});
