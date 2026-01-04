import React from "react";
import { Modal, Pressable, StyleSheet, View, Image, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Line } from "react-native-svg";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function InfoSheet({ visible, onClose }: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <Pressable style={styles.closeBtn} onPress={onClose}>
            <View style={styles.closeIconBox}>
              <Ionicons name="close-outline" size={20} />
            </View>
          </Pressable>

          <View style={styles.content}>
            <View style={styles.contentHeader}>
              <Svg width="100%" height={1} style={styles.contentHeaderDash}>
                <Line
                  x1="0"
                  y1="0"
                  x2="100%"
                  y2="0"
                  stroke="#D2D2D2"
                  strokeWidth={2}
                  strokeDasharray="10 4"
                />
              </Svg>

              <Image
                source={require("../../assets/images/Footprints.png")}
                style={styles.contentHeaderIcon}
                resizeMode="contain"
              />

              <View style={styles.contentHeaderRight}>
                <Text style={styles.contentHeaderTitle}>Steps to count fetal kicks</Text>
              </View>
            </View>

            <View style={styles.contentBody}>
          
              <View style={styles.contentBodyRow}>
                <View style={styles.stepRow}>
                  <Text style={styles.stepNumber}>1.</Text>
                  <Text style={styles.contentBodyRowText}>
                    Choose a <Text style={styles.contentBodyRowTextBold}>time</Text> when you are{" "}
                    <Text style={styles.contentBodyRowTextBold}>least distracted</Text>
                    {"\n"}or when you typically{" "}
                    <Text style={styles.contentBodyRowTextBold}>feel the fetus move.</Text>
                  </Text>
                </View>
              </View>

            
              <View style={styles.contentBodyRow2}>
                <View style={styles.stepRow}>
                  <Text style={styles.stepNumber}>2.</Text>
                  <Text style={styles.contentBodyRowText}>
                    Get <Text style={styles.contentBodyRowTextBold}>comfortable. Lie</Text> on your{" "}
                    <Text style={styles.contentBodyRowTextBold}>left side</Text>
                    {" or sit\n with your feet propped up."}
                  </Text>
                </View>
              </View>

            
              <View style={styles.contentBodyRow}>
                <View style={styles.stepRow}>
                  <Text style={styles.stepNumber}>3.</Text>
                  <Text style={styles.contentBodyRowText}>
                    Place your <Text style={styles.contentBodyRowTextBold}>hands on your belly.</Text>
                  </Text>
                </View>
              </View>

          
              <View style={styles.contentBodyRow2}>
                <View style={styles.stepRow}>
                  <Text style={styles.stepNumber2}>4.</Text>
                  <Text style={styles.contentBodyRowText}>
                    <Text style={styles.contentBodyRowTextBold}>Start a timer</Text> or watch the clock.
                  </Text>
                </View>
              </View>

          
              <View style={styles.contentBodyRow}>
                <View style={styles.stepRow}>
                  <Text style={styles.stepNumber2}>5.</Text>
                  <Text style={styles.contentBodyRowText}>
                    <Text style={styles.contentBodyRowTextBold}>Count</Text> each kicks. Keep counting until you get
                    {"\n"}to{" "}
                    <Text style={styles.contentBodyRowTextBold}>10 kicks/ flutters/ swishes/rolls.</Text>
                  </Text>
                </View>
              </View>

              <View style={styles.contentBodyRow2}>
                <View style={styles.stepRow}>
                  <Text style={styles.stepNumber}>6.</Text>
                  <Text style={styles.contentBodyRowText}>
                    Once you reach <Text style={styles.contentBodyRowTextBold}>10 kicks, jot down</Text> how many{" "}
                    <Text style={styles.contentBodyRowTextBold}>minutes</Text> it took.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.overlayBottomBar}>
          <View style={styles.overlayBottomHandle} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#0000004D",
    opacity: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  sheet: {
    width: 361,
    height: 548,
    marginTop: 150,
    gap: 8,
    opacity: 1,
    alignItems: "center",
  },

  closeBtn: {
    width: 44,
    height: 44,
    gap: 8,
    top: 0,
    left: 155,
    borderRadius: 22,
    borderWidth: 1,
    padding: 12,
    backgroundColor: "#FFFFFF1C",
    borderColor: "#EFEFEF33",
    opacity: 1,
  },

  closeIconBox: { position: "absolute", top: 11, left: 11 },

  content: {
    width: 361,
    height: 496,
    gap: 4,
    borderRadius: 20,
    borderWidth: 1,
    padding: 4,
    backgroundColor: "#FFFFFF1C",
    borderColor: "#EFEFEF33",
    opacity: 1,
    alignItems: "center",
  },

  contentHeader: {
    width: 350,
    height: 52,
    borderRadius: 16,
    padding: 12,
    backgroundColor: "#FFFFFF",
    opacity: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  contentHeaderDash: { position: "absolute", bottom: 0, left: 10, right: 0 },

  contentHeaderIcon: { width: 24, height: 24, opacity: 1 },

  contentHeaderRight: { width: 295, height: 28, opacity: 1, justifyContent: "center", marginLeft: 8 },

  contentHeaderTitle: {
    width: 295,
    height: 28,
    opacity: 1,
    fontFamily: "Instrument Sans",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: 20 * 1.4,
    letterSpacing: 0.2,
    color: "#121212",
    includeFontPadding: false,
  },

  contentBody: {
    width: 350,
    height: 432,
    opacity: 1,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },

  contentBodyRow: {
    width: 350,
    height: 72,
    opacity: 1,
    paddingTop: 16,
    paddingRight: 12,
    paddingBottom: 16,
    paddingLeft: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },

  contentBodyRow2: {
    width: 350,
    height: 72,
    opacity: 1,
    paddingTop: 16,
    paddingRight: 12,
    paddingBottom: 16,
    paddingLeft: 12,
    gap: 8,
    backgroundColor: "#EFEFEF",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },

  stepRow: { flexDirection: "row", gap: 8, opacity: 1, alignItems: "flex-start" },

  stepNumber: {
    opacity: 1,
    fontFamily: "Instrument Sans",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 14 * 1.2,
    letterSpacing: 0.2,
    color: "#121212",
    includeFontPadding: false,
  },

  stepNumber2: {
    opacity: 1,
    fontFamily: "Instrument Sans",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 14 * 1.2,
    letterSpacing: 0.2,
    color: "#121212",
    includeFontPadding: false,
  },

  contentBodyRowText: {
    flex: 1,
    height: 34,
    opacity: 1,
    fontFamily: "Instrument Sans",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 14 * 1.2,
    letterSpacing: 0.2,
    color: "#121212",
    includeFontPadding: false,
  },

  contentBodyRowTextBold: { fontFamily: "Instrument Sans", fontWeight: "700", color: "#121212" },

  overlayBottomBar: {
    width: 361,
    height: 34,
    opacity: 1,
    position: "absolute",
    bottom: 0,
    left: 16,
  },

  overlayBottomHandle: {
    width: 144,
    height: 5,
    opacity: 1,
    position: "absolute",
    top: 21,
    left: 90,
    borderRadius: 100,
    backgroundColor: "#FFFFFF",
  },
});