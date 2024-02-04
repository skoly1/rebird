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
import {
  AlertCircle,
  Archive,
  MessagesSquare,
  Search,
  ShoppingCart,
  Users2,
  Library,
  ListMusic,
  Disc3,
  Radio,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

interface NavbarProps {
  children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { setTheme } = useTheme();

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
          className="h-full max-h-[800px] items-stretch"
        >
          <ResizablePanel
            defaultSize={265}
            collapsedSize={4}
            collapsible={true}
            minSize={15}
            maxSize={20}
            onResize={(size) => {
              if (size > 15) setIsCollapsed(false);
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
                  title: "Listen Now",
                  icon: Library,
                  variant: "default",
                },
                {
                  title: "Search",
                  icon: Search,
                  variant: "ghost",
                },
                {
                  title: "Playlists",
                  label: "",
                  icon: ListMusic,
                  variant: "ghost",
                },
                {
                  title: "Albums",
                  icon: Disc3,
                  variant: "ghost",
                },
                {
                  title: "Radio",
                  label: "",
                  icon: Radio,
                  variant: "ghost",
                },
              ]}
            />
            <Button variant="link" onClick={() => setTheme("dark")}>
              Dark
            </Button>
            <Button variant="link" onClick={() => setTheme("light")}>
              Light
            </Button>
            <Separator />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </>
  );
};

export default Navbar;

// <Link href="/">Home</Link>
//       <Link href="/profile">Profile</Link>
//       <Sheet>
//         <SheetTrigger>Open</SheetTrigger>
//         <SheetContent side="left">
//           <SheetHeader>
//             <SheetTitle>Are you absolutely sure?</SheetTitle>
//             <SheetDescription>
//               This action cannot be undone. This will permanently delete your
//               account and remove your data from our servers.
//             </SheetDescription>
//           </SheetHeader>
//         </SheetContent>
//       </Sheet>
