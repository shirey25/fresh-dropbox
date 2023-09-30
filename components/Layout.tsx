import type { ComponentChildren } from "preact";
import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import { Navbar } from "./Navbar.tsx";
import CreateModal from "../islands/CreateModal.tsx";
import CreateButton from "../islands/CreateButton.tsx";
import { Breadcrumb } from "./Breadcrumbs.tsx";
import { Folder } from "../models/folder.ts";
import FileUpload from "../islands/FileUpload.tsx";

interface LayoutProps {
  isloggedIn: boolean;
  folder: Folder | null;
  children: ComponentChildren;
}

export default function Layout(props: LayoutProps) {
  const createModalIsOpen = useSignal(false);

  return (
    <>
      <Head>
        <title>Fresh</title>
        <meta name="description" content="Fresh" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar loggedIn={props.isloggedIn} />

      <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 bg:black">
        <div class="mt-5">
          <CreateButton isOpen={createModalIsOpen} />
        </div>

        <FileUpload currentFolder={props.folder ? props.folder.id : "home"} />
        <Breadcrumb folder={props.folder} />
        {props.children}
      </div>

      <CreateModal isOpen={createModalIsOpen} />
    </>
  );
}
