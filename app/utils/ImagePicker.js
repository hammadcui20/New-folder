// app/utils/imagePicker.js

import * as ImagePicker from "expo-image-picker";

/**
 * Opens the device's image library to allow the user to pick an image.
 * @returns {Promise<{uri: string} | null>} - Returns the picked image's URI or null if cancelled.
 */
export async function pickImage() {
  // Request permission to access the media library
  const permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.granted === false) {
    alert("You've denied permission to access your photos.");
    return null;
  }

  // Open the image picker
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0]; // Returns the selected image's asset (with URI, width, height, etc.)
  }

  return null;
}
