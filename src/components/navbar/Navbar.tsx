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
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Nav } from "./Nav";
import { Search, Home } from "lucide-react";
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
            <Button variant="link" onClick={() => setTheme("dark")}>
              Dark
            </Button>
            <Button variant="link" onClick={() => setTheme("light")}>
              Light
            </Button>
            <Button variant="link" onClick={() => setTheme("yellow")}>
              Light
            </Button>
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
