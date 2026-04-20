/** Stable name + color for collaboration carets (Yjs awareness). */

export type CollabUserIdentity = {
  name: string;
  color: string;
};

const CARET_COLORS = [
  "#E57373",
  "#F06292",
  "#BA68C8",
  "#64B5F6",
  "#4DB6AC",
  "#81C784",
  "#FFB74D",
  "#A1887F",
] as const;

const STORAGE_KEY = "tiptap-editor-demo-collab-user";

const ADJECTIVES = [
  "Bold",
  "Bright",
  "Calm",
  "Clever",
  "Curious",
  "Gentle",
  "Happy",
  "Keen",
  "Lively",
  "Quick",
  "Swift",
  "Wise",
] as const;

const ANIMALS = [
  "Crane",
  "Dolphin",
  "Eagle",
  "Falcon",
  "Fox",
  "Hawk",
  "Koala",
  "Lion",
  "Otter",
  "Owl",
  "Panda",
  "Raven",
  "Swan",
  "Tiger",
  "Wolf",
] as const;

function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function randomIdentity(): CollabUserIdentity {
  return {
    name: `${randomItem(ADJECTIVES)} ${randomItem(ANIMALS)}`,
    color: randomItem(CARET_COLORS),
  };
}

export function getCollabUserIdentity(): CollabUserIdentity {
  if (typeof window === "undefined") {
    return randomIdentity();
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as CollabUserIdentity;
      if (typeof parsed.name === "string" && typeof parsed.color === "string") {
        return parsed;
      }
    } catch {
      /* fall through */
    }
  }

  const identity = randomIdentity();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(identity));
  return identity;
}
