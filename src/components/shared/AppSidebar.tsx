"use client";

import {
  FileText,
  Folder,
  FolderArchive,
  FolderOpen,
  Search,
  StarIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { api } from "~/trpc/react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import AlertDeleteFolder from "./AlertDeleteFolder";
import CreateFolderModal from "./CreateFolderModal";
import { ToggleTheme } from "./ToggleTheme";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import ModalNewNote from "./ModalNewNote";

const recents = [
  { title: "Reflections on June", url: "#", icon: FileText },
  { title: "Project Proposal", url: "#", icon: FileText },
  { title: "Travel Itinerary", url: "#", icon: FileText },
];

const mores = [
  { title: "Favorites", url: "/favorites", icon: StarIcon },
  { title: "Trash", url: "/trash", icon: Trash2Icon },
  { title: "Archive Notes", url: "/archive", icon: FolderArchive },
];

export function AppSidebar() {
  const { isLoading, data } = api.folder.getAllFolders.useQuery();


  const pathname = usePathname();
  const {isSignedIn} = useUser()


  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href={"/"} className="text-xl font-bold">
            Nowted
          </Link>
          <ModalNewNote/>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Recents */}
        <SidebarGroup>
          <SidebarGroupLabel>Recents</SidebarGroupLabel>
          <Separator className="my-1" />
          <SidebarGroupContent>
            <SidebarMenu>
              {recents.map((recent) => (
                <SidebarMenuItem key={recent.title}>
                  <SidebarMenuButton asChild>
                    <Link href={recent.url}>
                      <recent.icon />
                      <span>{recent.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Folders */}
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <SidebarGroupLabel>Folders</SidebarGroupLabel>
            <CreateFolderModal />
          </div>
          <Separator className="mt-2 mb-1" />
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading && <p className="px-4 text-sm">Loading...</p>}
              {data?.map((folder) => {
                const pathnameEncoded = encodeURI(pathname);
                const active = folder.name === pathnameEncoded.split("/")[1];
                const Icon = active ? FolderOpen : Folder;
                return (
                  <SidebarMenuItem
                    className="flex items-center justify-between"
                    key={folder.id}
                  >
                    <SidebarMenuButton isActive={active} asChild>
                      <Link href={`/${folder.name}`}>
                        <Icon />
                        <span>{folder.name}</span>
                      </Link>
                    </SidebarMenuButton>
                    <AlertDeleteFolder folder={folder} />
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* More */}
        <SidebarGroup>
          <SidebarGroupLabel>More</SidebarGroupLabel>
          <Separator className="my-1" />
          <SidebarGroupContent>
            <SidebarMenu>
              {mores.map((more) => (
                <SidebarMenuItem key={more.title}>
                  <SidebarMenuButton asChild>
                    <Link href={more.url}>
                      <more.icon />
                      <span>{more.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center justify-between px-4 py-3">
          <ToggleTheme />

          <span className="text-muted-foreground text-sm">
            {isSignedIn ? <UserButton /> : <SignInButton />}
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
