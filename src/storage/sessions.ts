import AsyncStorage from "@react-native-async-storage/async-storage";

export type DfmSession = {
  id: string;
  startedAtISO: string;
  endedAtISO: string;
  durationSec: number;
  kicks: number;
};

const KEY = "dfm_sessions_v1";

function safeParse(raw: string | null): DfmSession[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x: any) => {
      return (
        x &&
        typeof x.id === "string" &&
        typeof x.startedAtISO === "string" &&
        typeof x.endedAtISO === "string" &&
        typeof x.durationSec === "number" &&
        typeof x.kicks === "number"
      );
    });
  } catch {
    return [];
  }
}

export async function loadSessions(): Promise<DfmSession[]> {
  const raw = await AsyncStorage.getItem(KEY);
  const sessions = safeParse(raw);

  sessions.sort((a, b) => Date.parse(b.endedAtISO) - Date.parse(a.endedAtISO));
  return sessions;
}

export async function addSession(session: DfmSession): Promise<void> {
  const existing = await loadSessions();
  const next = [session, ...existing];
  next.sort((a, b) => Date.parse(b.endedAtISO) - Date.parse(a.endedAtISO));
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
}