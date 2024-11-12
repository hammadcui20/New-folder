import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function ImageBtn({
    source,
    alignSelf = "",
    marginTop = 0,
    marginRight = 0,
    marginLeft = 0,
    marginBottom = 0,
    imageWidth = 30,
    imageHeight = 30,
    borderColor = "#E8ECF4",
    borderWidth = 2,
    borderRadius = 20,
    padding = 10,
    margin = 2,
    onPress,
}) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                { alignSelf, marginLeft, marginTop, marginRight, marginBottom, borderColor, borderWidth, borderRadius, padding, margin }
            ]}
            onPress={onPress}
        >
            <Image
                source={source}
                style={{ width: imageWidth, height: imageHeight, resizeMode: "contain" }}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
});
