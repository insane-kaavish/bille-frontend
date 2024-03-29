import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const sampleData = [
    {
      "id": 1,
      "title": "Notification 1",
      "message": "This is the first notification."
    },
    {
      "id": 2,
      "title": "Notification 2",
      "message": "This is the second notification."
    },
    {
      "id": 3,
      "title": "Notification 3",
      "message": "This is the third notification."
    }
  ];

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            // const response = await fetch(NOTIFICATIONS_API);
            // if (!response.ok) {
            //     throw new Error('Failed to fetch notifications');
            // }
            // const data = await response.json();
            setNotifications(sampleData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderNotification = ({ item }) => {
        return (
            <View>
                <Text>{item.title}</Text>
                <Text>{item.message}</Text>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Error: {error}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Text>Notifications</Text>
            {notifications.length === 0 ? (
                <Text>No notifications</Text>
            ) : (
                <FlatList
                    data={notifications}
                    renderItem={renderNotification}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
        </View>
    );
};

export default NotificationScreen;
