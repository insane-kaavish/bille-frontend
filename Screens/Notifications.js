import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet,ScrollView,TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Header from './Components/Header';
import Navbar from './Components/Navbar';

const height = Dimensions.get("window").height;

const sampleData = [
    {
      "id": 1,
      "title": "Notification 1",
      "message": "This is the first notification.",
      
        "date": "2024-03-31",
        "time": "08:00:00"
      
    },
    {
      "id": 2,
      "title": "Notification 2",
      "message": "This is the second notification.",
      
        "date": "2024-03-31",
        "time": "08:30:00"
      
    },
    {
      "id": 3,
      "title": "Notification 3",
      "message": "This is the third notification.",
      
        "date": "2024-03-31",
        "time": "09:00:00"
      
    },
    {
        "id": 4,
        "title": "Notification 1",
        "message": "This is the first notification.",
        
          "date": "2024-03-31",
          "time": "08:00:00"
        
      },
      {
        "id": 5,
        "title": "Notification 2",
        "message": "This is the second notification.",
        
          "date": "2024-03-31",
          "time": "08:30:00"
        
      },
      {
        "id": 6,
        "title": "Notification 3",
        "message": "This is the third notification.",
        
          "date": "2024-03-31",
          "time": "09:00:00"
        
      },
      {
        "id": 7,
        "title": "Notification 1",
        "message": "This is the first notification.",
        
          "date": "2024-03-31",
          "time": "08:00:00"
        
      },
      {
        "id": 8,
        "title": "Notification 2",
        "message": "This is the second notification.",
        
          "date": "2024-03-31",
          "time": "08:30:00"
        
      },
      {
        "id": 9,
        "title": "Notification 3",
        "message": "This is the third notification.",
        
          "date": "2024-03-31",
          "time": "09:00:00"
        
      },
      {
        "id": 10,
        "title": "Notification 1",
        "message": "This is the first notification.",
        
          "date": "2024-03-31",
          "time": "08:00:00"
        
      },
      {
        "id": 11,
        "title": "Notification 2",
        "message": "This is the second notification.",
        
          "date": "2024-03-31",
          "time": "08:30:00"
        
      },
      {
        "id": 13,
        "title": "Notification 3",
        "message": "This is the third notification.",
        
          "date": "2024-03-31",
          "time": "09:00:00"
        
      },
      {
        "id": 14,
        "title": "Notification 1",
        "message": "This is the first notification.",
        
          "date": "2024-03-31",
          "time": "08:00:00"
        
      },
      {
        "id": 15,
        "title": "Notification 2",
        "message": "This is the second notification.",
        
          "date": "2024-03-31",
          "time": "08:30:00"
        
      },
      {
        "id": 16,
        "title": "Notification 3",
        "message": "This is the third notification.",
        
          "date": "2024-03-31",
          "time": "09:00:00"
        
      },
      {
        "id": 17,
        "title": "Notification 1",
        "message": "This is the first notification.",
        
          "date": "2024-03-31",
          "time": "08:00:00"
        
      },
      {
        "id": 18,
        "title": "Notification 2",
        "message": "This is the second notification.",
        
          "date": "2024-03-31",
          "time": "08:30:00"
        
      },
      {
        "id": 19,
        "title": "Notification 3",
        "message": "This is the third notification.",
        
          "date": "2024-03-31",
          "time": "09:00:00"
        
      }
      
];


const NotificationScreen = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

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
            <View style={styles.flatList}>
                <Text
                style={styles.cardTitle}
                >{item.title}
                </Text>
                <Text style={styles.cardtext}>{item.message}</Text>
                <View style={styles.dateTimeContainer}>
                    <Text style={styles.datetext}>{item.date}</Text>
                    <Text style={styles.timetext}>{item.time}</Text>
            </View>
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

        <>
            <Header screenName="Notifications" navigation={navigation} />
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.card}>
                        {notifications.length === 0 ? (
                            <Text>No notifications</Text>
                        ) : (
                            <FlatList
                                // style={styles.flatList}
                                data={notifications}
                                renderItem={renderNotification}
                                keyExtractor={(item) => item.id.toString()}
                            />
                        )}
                    </View>
                </ScrollView>
                <Navbar />
            </View>
        </>
        // <View style={{ flex: 1 }}>
        //     <Text>Notifications</Text>
        //     {notifications.length === 0 ? (
        //         <Text>No notifications</Text>
        //     ) : (
        //         <FlatList
        //             data={notifications}
        //             renderItem={renderNotification}
        //             keyExtractor={(item) => item.id.toString()}
        //         />
        //     )}
        // </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
      },
        scrollContainer: {
        flex: 1,
      },
    //   card: {
    //     backgroundColor: "#fff",
    //     borderRadius: 10,
    //     padding: 10,
    //     marginVertical: 10,
    //     marginHorizontal: 5,
    //     shadowColor: "#000",
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 4,
    //     elevation: 3,
    //   },
        cardTitle: {
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 10,
        },
        flatList: {
            // flexDirection: "row",
            // alignItems: "center",
            backgroundColor: "#fff",
            borderRadius: 10,
            padding: 15,
            marginVertical: 5,
            marginHorizontal: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          },
        cardtext: {
            fontSize: 16,
            marginBottom: 10,
        },
        dateTimeContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        datetext: {
            fontSize: 14,
        },
        timetext: {
            fontSize: 14,
        },

    });

export default NotificationScreen;
