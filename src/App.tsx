import Editor from "./components/Editor/Editor";
import { defaultEditorContent } from "./utils/defaultEditorContent";
import IntroHeader from "./components/IntroHeader";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 dark:bg-neutral-950">
      <div className="w-full max-w-4xl">
        <IntroHeader />
        <Editor
          initialContent={defaultEditorContent}
          placeholder="Start writing your amazing content..."
        />
      </div>
    </div>
  );
};

export default App;
