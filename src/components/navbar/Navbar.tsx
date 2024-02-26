"use client";
import React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Nav } from "./Nav";
import { Search, Home, SunMoon, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

interface NavbarProps {
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const { setTheme } = useTheme();

  const [isCollapsed, setIsCollapsed] = React.useState(
    window.innerWidth <= 650
  );

  React.useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 650);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes
            )}`;
          }}
          className="h-full max-h-[800px] items-stretch min-h-screen"
        >
          <ResizablePanel
            defaultSize={200}
            collapsedSize={5}
            collapsible={true}
            minSize={10}
            maxSize={15}
            onResize={(size) => {
              if (size > 10) setIsCollapsed(false);
              setIsCollapsed(window.innerWidth <= 650);
            }}
            onCollapse={() => {
              setIsCollapsed(true);
              document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                true
              )}`;
            }}
            className={cn(
              isCollapsed &&
                "min-w-[50px] transition-all duration-300 ease-in-out"
            )}
          >
            <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Home",
                  icon: Home,
                  href: "/",
                },
                {
                  title: "Search",
                  icon: Search,
                  href: "/search",
                },
              ]}
            />
            <div className={cn("flex items-center justify-center flex-wrap")}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-9 px-0"
                    onClick={() => setTheme("light")}
                  >
                    <SunMoon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  Light Mode
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-9 px-0"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  Dark Mode
                </TooltipContent>
              </Tooltip>
            </div>
            <Separator />
          </ResizablePanel>
          <ResizableHandle withHandle disabled={window.innerWidth <= 650} />
          {/* <ResizablePanel className="!overflow-auto">{children}</ResizablePanel> */}
          <ResizablePanel>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </>
  );
};

export default Navbar;
