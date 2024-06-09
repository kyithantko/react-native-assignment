import { useState } from "react";
import { StyleSheet, Pressable, ActivityIndicator } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "./ThemedView";

type CustomButtonProps = {
  label?: string;
  onPress: () => Promise<void>;
};

export default function CustomButton({ label, onPress }: CustomButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    try {
      setLoading(true);
      await onPress();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        {
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: loading ? "#8E8E8E" : "blue",
          width: 90,
          height: 60,
          borderRadius: 18,
        },
        pressed ? !loading && { opacity: 0.8 } : {},
      ]}
      onPress={loading ? null : handlePress}
    >
      <ThemedText
        style={{
          color: "#FEFEFE",
          fontSize: 18,
          fontWeight: 500,
        }}
      >
        {loading ? (
          <>
            <ThemedView
              style={{
                backgroundColor: "transparent",
                paddingTop: 4,
              }}
            >
              <ActivityIndicator color="#FEFEFE" size="large" />
            </ThemedView>
          </>
        ) : (
          label
        )}
      </ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
