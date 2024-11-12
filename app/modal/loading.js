import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur';
export default function Loading() {
    const [modalVisible, setModalVisible] = useState(true);
    return (
        <View style={styles.centeredView}>
            <Modal
                style={{
                    borderWidth: 3,
                }}
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(true);
                }}>
                <View style={styles.centeredView}>
                    <BlurView intensity={170} style={styles.modalView}>
                        <ActivityIndicator size={60} color="#1E232C" />
                    </BlurView>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});