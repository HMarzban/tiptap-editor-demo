import Editor from "./components/Editor/Editor";
import { defaultEditorContent } from "./utils/defaultEditorContent";
import { AppHeader } from "./components/AppHeader";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-4xl px-4 py-8">
        <AppHeader />
        <Editor
          initialContent={defaultEditorContent}
          placeholder="Start writing your content…"
        />
      </div>
    </div>
  );
}
