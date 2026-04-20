/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COLLAB?: string;
  readonly VITE_COLLAB_WS_URL?: string;
  readonly VITE_COLLAB_SIGNALING?: string;
  readonly VITE_COLLAB_ROOM?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
