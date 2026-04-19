import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

const IntroHeader = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold ">Tiptap Editor</h1>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {resolvedTheme === "dark" ? (
            <SunIcon size={20} />
          ) : (
            <MoonIcon size={20} />
          )}
        </Button>
        <a
          href="https://github.com/HMarzban"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
        >
          <Button variant="outline" size="icon">
            <FaGithub size={20} />
          </Button>
        </a>
      </div>
    </div>
  );
};

export default IntroHeader;
