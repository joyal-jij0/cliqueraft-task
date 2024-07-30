import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { PaperProvider, Searchbar, Button, Dialog, Portal, TextInput, List, ActivityIndicator } from 'react-native-paper';
import { FIREBASE_DB } from '@/FirebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

interface BikingGroup {
  id: string;
  name: string;
  location: string;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [groups, setGroups] = useState<BikingGroup[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [newGroupName, setNewGroupName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function searchGroups() {
    setIsLoading(true);
    const bikingGroupsRef = collection(FIREBASE_DB, 'bikingGroups');
    const q = query(bikingGroupsRef, where('location', '==', searchQuery.toLowerCase()));
    try {
      const querySnapshot = await getDocs(q);
      const fetchedGroups: BikingGroup[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<BikingGroup, 'id'>)
      }));
      setGroups(fetchedGroups);
      if (fetchedGroups.length === 0) {
        setVisible(true);
      }
    } catch (error) {
      console.error("Error fetching groups:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addNewGroup() {
    setIsLoading(true);
    const bikingGroupsRef = collection(FIREBASE_DB, 'bikingGroups');
    try {
      await addDoc(bikingGroupsRef, {
        name: newGroupName,
        location: searchQuery.toLowerCase(),
      });
      setVisible(false);
      setNewGroupName('');
      searchGroups();
    } catch (error) {
      console.error("Error adding new group:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <PaperProvider>
      <View className='bg-[#1d1e24] flex-1 px-3 pt-14' >
        <Searchbar
          placeholder="Search location"
          onChangeText={setSearchQuery}
          value={searchQuery}
          onSubmitEditing={searchGroups}
          className='mb-3'
        />
        {isLoading ? (
          <View className='flex-1 justify-between items-center'>
            <ActivityIndicator animating={true} size="large" />
          </View>
        ) : (
          <FlatList
            data={groups}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <List.Item
                title={item.name}
                left={props => <List.Icon {...props} icon="bike" />}
              />
            )}
            ListEmptyComponent={
              <View className='flex-1 justify-between items-center'>
                <List.Item
                  title="No biking groups found for this location"
                  description="Search for a different location or add a new group"
                />
              </View>
            }
          />
        )}
        <Portal>
          <Dialog visible={visible} onDismiss={() => setVisible(false)}>
            <Dialog.Title>Add New Biking Group</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Group Name"
                value={newGroupName}
                onChangeText={setNewGroupName}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Cancel</Button>
              <Button onPress={addNewGroup} disabled={isLoading}>Add</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}