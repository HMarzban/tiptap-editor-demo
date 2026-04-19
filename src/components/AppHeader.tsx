import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

const GITHUB_PROFILE_URL = "https://github.com/HMarzban";

export function AppHeader() {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-page-title">TipTap editor</h1>
      <nav className="flex gap-2" aria-label="App actions">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          aria-label={
            resolvedTheme === "dark"
              ? "Switch to light theme"
              : "Switch to dark theme"
          }
        >
          {resolvedTheme === "dark" ? (
            <SunIcon size={20} aria-hidden />
          ) : (
            <MoonIcon size={20} aria-hidden />
          )}
        </Button>
        <a
          href={GITHUB_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open maintainer GitHub profile in a new tab"
        >
          <Button type="button" variant="outline" size="icon">
            <FaGithub size={20} aria-hidden />
          </Button>
        </a>
      </nav>
    </header>
  );
}

export default AppHeader;
