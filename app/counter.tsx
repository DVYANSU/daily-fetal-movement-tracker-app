import { useEffect, useMemo, useRef, useState } from "react";
import { View, StyleSheet, Pressable, Image, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Line } from "react-native-svg";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import InfoSheet from "../src/components/infoSheet";
import { addSession } from "../src/storage/sessions";

function formatMMSS(totalSec: number) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
const makeId = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

export default function Counter() {
  const router = useRouter();

  const [infoOpen, setInfoOpen] = useState(false);

  const [elapsedSec, setElapsedSec] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [kicks, setKicks] = useState(0);
  const [saving, setSaving] = useState(false);

  const startedAtISORef = useRef<string | null>(null);

  const timerLabel = useMemo(() => formatMMSS(elapsedSec), [elapsedSec]);

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(() => setElapsedSec((p) => p + 1), 1000);
    return () => clearInterval(id);
  }, [isRunning]);

  const onKickPress = () => {
    if (kicks >= 10) return;

    if (kicks === 0) {
      startedAtISORef.current = new Date().toISOString();
      setIsRunning(true);
    }

    setKicks((k) => {
      const next = Math.min(10, k + 1);
      if (next >= 10) setIsRunning(false);
      return next;
    });
  };

  const onSave = async () => {
    if (saving) return;
    if (kicks < 10) return;

    setSaving(true);
    try {
      const startedAtISO = startedAtISORef.current ?? new Date().toISOString();
      const endedAtISO = new Date().toISOString();

      await addSession({
        id: makeId(),
        startedAtISO,
        endedAtISO,
        durationSec: elapsedSec,
        kicks: 10,
      });

      router.back( ); 
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar} />

      <View style={styles.headerSection}>
        <View style={styles.headerContent}>
          <Pressable style={styles.backBtn} onPress={() => router.back()} accessibilityRole="button">
            <View style={styles.backIconBox}>
              <Ionicons name="arrow-back-outline" size={20} color="#121212" />
            </View>
          </Pressable>

          <View style={styles.headerTitleBox} pointerEvents="none">
            <Text style={styles.headerTitle}>Record DFM</Text>
          </View>

          <Pressable style={styles.headerRightIconBtn} onPress={() => setInfoOpen(true)}>
            <Image
              source={require("../assets/images/Info.png")}
              style={styles.headerRightIconImg}
              resizeMode="contain"
            />
          </Pressable>

          <InfoSheet visible={infoOpen} onClose={() => setInfoOpen(false)} />
        </View>
      </View>

      <Svg width="100%" height={1}>
        <Line x1="0" y1="0" x2="100%" y2="0" stroke="#D2D2D2" strokeWidth={1} strokeDasharray="12 4" />
      </Svg>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={["#FDF7FF", "#FFF3F8", "#FFEAF3"]} locations={[0, 0.5, 1]} style={styles.gradient}>
          <View style={styles.belowSvgCard}>
            <Text style={styles.belowSvgText}>{"Stop recording after\n10 kicks"}</Text>
          </View>

          <Image source={require("../assets/images/Polygon.png")} style={styles.belowCardNotchImg} resizeMode="contain" />

          <View style={styles.belowBlock}>
            <View style={styles.belowBlockInner}>
              <View style={styles.belowBlockInnerMost}>
                <Text style={styles.timerText}>{timerLabel}</Text>
              </View>
            </View>
          </View>

          <Pressable
            style={styles.circleButton}
            onPress={onKickPress}
            disabled={kicks >= 10}
            accessibilityRole="button"
          >
            <View style={styles.circleInner40}>
              <View style={styles.stopIconBox}>
                <Ionicons
  name={isRunning ? "stop" : "play"}
  size={27.5}
  color="#121212"
/>
              </View>
            </View>
          </Pressable>

          <View style={styles.bottomSection}>
            <Pressable style={styles.bottomBtn} onPress={onSave} disabled={kicks < 10 || saving}>
              <Text style={styles.saveBtnText}>{saving ? "Saving..." : "Save"}</Text>
            </Pressable>

            <Pressable style={{ alignSelf: "center" }}>
              <Text style={styles.bottomHelpText}>{"What if I am not getting\nenough kicks?"}</Text>
            </Pressable>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },

  topBar: { width: "100%", height: 59, opacity: 1, top: 0 },

  headerSection: {
    width: "100%",
    height: 81,
    paddingTop: 20,
    paddingRight: 16,
    paddingBottom: 20,
    paddingLeft: 16,
    gap: 16,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    opacity: 1,
  },

  headerContent: {
    width: "100%",
    height: 41,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    opacity: 1,
    position: "relative",
  },

  backBtn: { width: 32, height: 20, flexDirection: "row", alignItems: "center", gap: 8, opacity: 1 },
  backIconBox: { width: 20, height: 20, position: "relative" },

  headerTitleBox: {
    width: 297,
    height: 25,
    gap: 4,
    opacity: 1,
    position: "absolute",
    left: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  headerTitle: {
    width: 107,
    height: 25,
    opacity: 1,
    fontFamily: "Instrument Sans",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 18 * 1.4,
    letterSpacing: 0.2,
    color: "#121212",
  },

  headerRightIconBtn: { width: 32, height: 32, opacity: 1, position: "relative" },
  headerRightIconImg: { width: 24, height: 24, opacity: 1, position: "absolute", top: 4, left: 4 },

  scrollContent: { flexGrow: 1 },

  gradient: { width: "100%", height: 712, position: "relative" },

  belowSvgCard: {
    width: 282,
    height: 100,
    position: "absolute",
    top: 70,
    left: 38,
    borderRadius: 16,
    padding: 16,
    gap: 8,
    backgroundColor: "#FFFFFF",
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  belowSvgText: {
    width: 250,
    height: 68,
    opacity: 1,
    fontFamily: "Instrument Sans",
    fontWeight: "600",
    fontSize: 24,
    lineHeight: 24 * 1.4,
    letterSpacing: 0.2,
    color: "#121212",
    textAlign: "center",
    includeFontPadding: false,
  },

  belowCardNotchImg: { position: "absolute", top: 170, left: 170 },

  belowBlock: {
    width: 268,
    height: 160,
    position: "absolute",
    top: 200,
    left: 44,
    opacity: 1,
    borderRadius: 72,
    backgroundColor: "#FFFFFF66",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },

  belowBlockInner: {
    width: 234,
    height: 140,
    position: "absolute",
    top: 7,
    left: 14,
    opacity: 1,
    borderRadius: 72,
    backgroundColor: "#FFFFFF66",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },

  belowBlockInnerMost: {
    width: 190,
    height: 114,
    position: "absolute",
    top: 10,
    left: 19,
    opacity: 1,
    borderRadius: 72,
    backgroundColor: "#FFFFFF66",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },

  timerText: {
    width: 122,
    height: 56,
    position: "absolute",
    top: 25,
    left: 42,
    opacity: 1,
    fontFamily: "Instrument Sans",
    fontWeight: "700",
    fontSize: 40,
    lineHeight: 40 * 1.4,
    letterSpacing: 0.2,
    color: "#EC523D",
    includeFontPadding: false,
  },

  circleButton: {
    width: 72,
    height: 72,
    position: "absolute",
    top: 400,
    left: 145,
    opacity: 1,
    borderRadius: 40,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  circleInner40: {
    width: 40,
    height: 40,
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  stopIconBox: {
    width: 40,
    height: 40,
    opacity: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  bottomSection: {
    width: 361,
    height: 122,
    position: "absolute",
    top: 512,
    left: 16,
    gap: 16,
    opacity: 1,
  },

  bottomBtn: {
    width: 329,
    height: 56,
    opacity: 1,
    borderRadius: 48,
    gap: 4,
    borderWidth: 1,
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    backgroundColor: "#FFFFFF",
    borderColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },

  saveBtnText: {
    width: 60,
    height: 21,
    opacity: 1,
    fontFamily: "Instrument Sans",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 16 * 1.3,
    letterSpacing: 0.2,
    color: "#121212",
    textAlign: "center",
    includeFontPadding: false,
  },

  bottomHelpText: {
    width: 213,
    height: 50,
    opacity: 1,
    fontFamily: "Instrument Sans",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 18 * 1.4,
    letterSpacing: 0.2,
    color: "#121212",
    textAlign: "center",
    textDecorationLine: "underline",
    includeFontPadding: false,
  },
});