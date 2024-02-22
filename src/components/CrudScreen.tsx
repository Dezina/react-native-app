import { Feather } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, Button, FlatList, StyleSheet, Alert,
    ScrollView, TouchableOpacity
} from 'react-native';

interface Item {
    id: number;
    name: string;
}

const CrudScreen: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [newItemName, setNewItemName] = useState<string>('');
    const [editingItem, setEditingItem] = useState<Item | null>(null);

    const fetchData = () => {
        const dataFromAPI: Item[] = [
            { id: 1, name: 'Item 1' },
            { id: 2, name: 'Item 2' },
        ];
        setItems(dataFromAPI);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAddItem = () => {
        const newItem: Item = {
            id: Math.random(),
            name: newItemName,
        };

        setItems((prevItems) => [...prevItems, newItem]);
        setNewItemName('');
    };

    const handleEditItem = () => {
        if (editingItem) {
            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === editingItem.id ? { ...item, name: newItemName }
                        : item
                )
            );

            setNewItemName('');
            setEditingItem(null);
        }
    };

    const handleDeleteItem = (id: number) => {
        Alert.alert('Confirm Delete', 'Are you sure you want to delete this item?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: () => {
                    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
                },
                style: 'destructive',
            },
        ]);
    };

    const handleCancelEditing = () => {
        setEditingItem(null);
        setNewItemName('');
    };

    const handleEditPress = (item: Item) => {
        setEditingItem(item);
        setNewItemName(item.name);
    };

    return (
        <View style={styles.container}>
            <Text>Add/Edit Item:</Text>
            <TextInput
                value={newItemName}
                onChangeText={(text) => setNewItemName(text)}
                placeholder="Item Name"
                style={styles.input}
            />
            <View style={styles.buttonsContainer}>
                {editingItem && (
                    <Button title="Cancel" onPress={handleCancelEditing} />
                )}
                <Button title={editingItem ? 'Save' : 'Save'}
                    onPress={editingItem ? handleEditItem : handleAddItem} />
            </View>

            <Text>Items List:</Text>
            {/* <ScrollView style={styles.scrollView}> */}
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text>{item.name}</Text>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity onPress={() => handleEditPress(item)}>
                                    <Feather name="edit" size={24} color="green" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                                    <Feather name="delete" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            {/* </ScrollView> */}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        height: 40,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    scrollView: {
        maxHeight: 'auto',
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 5,
    },
    itemText: {
        flex: 1,
        marginRight: 10,
    },
    editButton: {
        marginRight: 5,
    },
});

export default CrudScreen;