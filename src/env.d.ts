/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** App/brand name shown across the UI (Header, Footer, page titles, etc.). */
  readonly APP_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
