import Editor from "./components/Editor/Editor";
import {
  SAMPLE_DOCUMENT_HTML,
  APP_SHELL_PLACEHOLDER,
} from "@/config/editorDefaults";
import { AppHeader } from "./components/AppHeader";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-4xl px-4 py-8">
        <AppHeader />
        <Editor
          initialContent={SAMPLE_DOCUMENT_HTML}
          placeholder={APP_SHELL_PLACEHOLDER}
        />
      </div>
    </div>
  );
}
