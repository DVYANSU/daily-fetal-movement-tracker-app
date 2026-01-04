import React, { useCallback, useState } from "react";
import { Text, View, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Line } from "react-native-svg";
import { useRouter, useFocusEffect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { loadSessions, type DfmSession } from "../src/storage/sessions";
import {
  formatDayName,
  formatDateShort,
  formatDurationMMSS,
} from "../src/utils/format";

export default function Index() {
  const router = useRouter();
  const [sessions, setSessions] = useState<DfmSession[]>([]);

  const refresh = useCallback(() => {
    loadSessions()
      .then(setSessions)
      .catch(() => setSessions([]));
  }, []);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar} />

      <View style={styles.section}>
        <View style={styles.innerSection}>
          <View style={styles.innerLeft} />

          <View style={styles.innerMid}>
            <Text style={styles.innerMidTitle}>DFM (Kick counter)</Text>
          </View>

          <View style={styles.innerRight}>
            <View style={styles.innerRightPill}>
              <Image
                source={require("../assets/images/baby.png")}
                style={styles.icon}
                resizeMode="contain"
              />
              <Text style={styles.innerRightCount}>{sessions.length}</Text>
            </View>
          </View>
        </View>
      </View>

      <Svg width="100%" height={1}>
        <Line
          x1="0"
          y1="0"
          x2="100%"
          y2="0"
          stroke="#D2D2D2"
          strokeWidth={1}
          strokeDasharray="12 4"
        />
      </Svg>

      <View style={styles.contentBlock}>
        <View style={styles.contentBlockInner}>
          <View style={styles.imageCard}>
            <Image
              source={require("../assets/images/homePage.png")}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.imageCardTopLeft}>
              <View style={styles.topLeftInner}>
                <Image
                  source={require("../assets/images/leap.png")}
                  style={styles.topLeftInnerImage}
                  resizeMode="contain"
                />
                <View style={styles.topLeftInnerBox}>
                  <Text style={styles.topLeftInnerText}>Articles</Text>
                </View>
              </View>
            </View>

            <View style={styles.imageCardTopRight}>
              <View style={styles.topRightIcon}>
                 <Ionicons name="bookmark-outline" size={16} color="#343330" />
              </View>
              <Text style={styles.topRightSaveText}>Save</Text>
            </View>

            <View style={styles.contentBlockInnerBottom}>
              <Text style={styles.contentBlockInnerBottomTitle}>
                DFM (fetal movement)
              </Text>
            </View>
          </View>
        </View>

        <Pressable
          style={styles.primaryBigBtn}
          onPress={() => router.push("/counter")}
        >
          <Text style={styles.primaryBigBtnText}>Record fetal movement</Text>
        </Pressable>

        <View style={styles.belowButtonBlock}>
          <Text style={styles.pastRecordsTitle}>Past records</Text>

          <View style={styles.pastRecordsList}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {sessions.length === 0 ? (
                <View style={styles.emptyRow}>
                  <Text style={styles.emptyText}>No saved sessions yet.</Text>
                </View>
              ) : (
                sessions.map((s, idx) => {
                  const day = formatDayName(s.endedAtISO);
                  const date = formatDateShort(s.endedAtISO);
                  const duration = formatDurationMMSS(s.durationSec);

                  return (
                    <View
                      key={s.id}
                      style={[
                        styles.pastRecordItem,
                        idx === sessions.length - 1 && styles.pastRecordItemLast,
                      ]}
                    >
                      <View style={styles.leftDynamic}>
                        <Text style={styles.leftDay} numberOfLines={1}>
                          {day}
                        </Text>

                        <View style={styles.pastRecordBulletWrap}>
                          <View style={styles.pastRecordBulletSquare} />
                        </View>

                        <Text style={styles.leftDate} numberOfLines={1}>
                          {date}
                        </Text>
                      </View>

                      <Text style={styles.pastRecordRightText} numberOfLines={1}>
                        {duration}
                      </Text>
                    </View>
                  );
                })
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },

  topBar: { width: "100%", height: 59, backgroundColor: "#FFFFFF", gap: 6 },

  section: {
    width: "100%",
    height: 81,
    paddingTop: 20,
    paddingRight: 16,
    paddingBottom: 20,
    paddingLeft: 16,
    backgroundColor: "#FFFFFF",
    gap: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  innerSection: {
    width: "100%",
    height: 41,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  innerLeft: { width: 62, height: 20 },
  innerMid: { width: 237, height: 25, justifyContent: "center" },

  innerMidTitle: {
    width: 171,
    height: 25,
    fontFamily: "Instrument Sans",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 18 * 1.4,
    letterSpacing: 0.2,
    color: "#121212",
  },

  innerRight: {
    width: 62,
    height: 36,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 25,
  },

  innerRightPill: {
    width: 59,
    height: 36,
    paddingTop: 6,
    paddingRight: 12,
    paddingBottom: 6,
    paddingLeft: 12,
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 48,
    backgroundColor: "#FFFFFF12",
    borderWidth: 1,
    borderColor: "#EFEFEF33",
    opacity: 1,
  },

  icon: { width: 24, height: 25, opacity: 1 },

  innerRightCount: {
    fontFamily: "Instrument Sans",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 16 * 1.3,
    letterSpacing: 0.2,
    color: "#3D3D3D",
  },

  contentBlock: {
    position: "absolute",
    top: 181,
    left: 16,
    right: 16,
    gap: 32,
    opacity: 1,
  },

  contentBlockInner: { width: "100%", height: 181, opacity: 1 },

  imageCard: {
    width: "100%",
    height: 181,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },

  image: { width: "100%", height: "100%" },

  imageCardTopLeft: {
    position: "absolute",
    top: 12,
    left: 12,
    width: 337,
    height: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    opacity: 1,
  },

  imageCardTopRight: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 64,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    padding: 8,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    opacity: 1,
    borderWidth: 1,
    borderColor: "#D2D2D2",
  },

  topLeftInner: {
    width: 102,
    height: 24,
    opacity: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  topLeftInnerImage: { width: 48, height: 24, opacity: 1 },

  topLeftInnerBox: {
    width: 54,
    height: 24,
    opacity: 1,
    paddingTop: 2,
    paddingBottom: 2,
    justifyContent: "center",
  },

  topLeftInnerText: {
    width: 54,
    height: 17,
    fontFamily: "Instrument Sans",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 14 * 1.2,
    letterSpacing: 0.2,
    color: "#121212",
    opacity: 1,
  },

  topRightIcon: {
    width: 16,
    height: 16,
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
  },



  topRightSaveText: {
    width: 28,
    height: 14,
    opacity: 1,
    fontFamily: "Instrument Sans",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 12 * 1.2,
    letterSpacing: 0.2,
    color: "#121212",
    includeFontPadding: false,
  },

  contentBlockInnerBottom: {
    position: "absolute",
    top: 107,
    left: 0,
    width: 250,
    height: 53,
    padding: 16,
    opacity: 1,
  },

  contentBlockInnerBottomTitle: {
    width: 218,
    height: 21,
    opacity: 1,
    fontFamily: "Instrument Sans",
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 16 * 1.3,
    letterSpacing: 0.2,
    color: "#FFFFFF",
    includeFontPadding: false,
  },

  primaryBigBtn: {
    width: "100%",
    height: 56,
    gap: 4,
    paddingTop: 12,
    paddingRight: 16,
    paddingBottom: 12,
    paddingLeft: 16,
    borderRadius: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#121212",
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  primaryBigBtnText: {
    width: 171,
    height: 21,
    opacity: 1,
    fontFamily: "Instrument Sans",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 16 * 1.3,
    letterSpacing: 0.2,
    color: "#121212",
    includeFontPadding: false,
  },

  belowButtonBlock: { width: "100%", height: 237, gap: 10, opacity: 1 },

  pastRecordsTitle: {
    width: "100%",
    height: 21,
    opacity: 1,
    fontFamily: "Instrument Sans",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 16 * 1.3,
    letterSpacing: 0.2,
    color: "#000000",
    includeFontPadding: false,
  },

  pastRecordsList: { width: "100%", height: 206, opacity: 1 },

  pastRecordItem: {
    width: "100%",
    height: 47,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 15,
    paddingRight: 12,
    paddingBottom: 15,
    paddingLeft: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    opacity: 1,
    marginBottom: 6,
  },

  pastRecordItemLast: { marginBottom: 0 },

  leftDynamic: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
  },

  leftDay: {
    flexShrink: 1,
    minWidth: 0,
    maxWidth: 140,
    fontFamily: "Instrument Sans",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 14 * 1.2,
    color: "#121212",
    includeFontPadding: false,
  },

  pastRecordBulletWrap: {
    width: 5,
    height: 17,
    opacity: 1,
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  pastRecordBulletSquare: {
    width: 5,
    height: 5,
    backgroundColor: "#121212",
  },

  leftDate: {
    marginLeft: 4,
    flexShrink: 0,
    fontFamily: "Instrument Sans",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 14 * 1.2,
    color: "#121212",
    includeFontPadding: false,
  },

  pastRecordRightText: {
    marginLeft: 8,
    minWidth: 60,
    flexShrink: 0,
    opacity: 1,
    fontFamily: "Instrument Sans",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 14 * 1.2,
    letterSpacing: 0.2,
    color: "#121212",
    includeFontPadding: false,
    textAlign: "right",
  },

  emptyRow: {
    width: "100%",
    height: 47,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    justifyContent: "center",
    paddingHorizontal: 12,
  },

  emptyText: {
    fontFamily: "Instrument Sans",
    fontWeight: "500",
    fontSize: 14,
    color: "#3D3D3D",
  },
});