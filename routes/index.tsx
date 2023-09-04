import { Handlers, PageProps } from "$fresh/server.ts";
import Layout from "../components/Layout.tsx";
import { TableFolder } from "../components/TableFolder.tsx";
import { Folder, SubContent } from "../models/folder.ts";
import { State } from "./_middleware.ts"
import {
  getFilesByParentId,
  getFoldersByParentId,
  saveFolder,
} from "../utils/db.ts";
import supabaseClient from "../models/supabaseClient.ts"; // import supabase client

export const handler: Handlers<SubContent> = {
  async GET(_req, ctx) {
    const user = supabaseClient.auth.user();


    if (user) {
      const headers = new Headers();
      headers.set("location", `/signup`);
      return new Response(null, {
        status: 303,
        headers,
      });
    }

    const subFolders = await getFoldersByParentId("home");
    const subFiles = await getFilesByParentId("home");

    const subContent: SubContent = {
      subFolders,
      subFiles,
    };
    return ctx.render(subContent);
  },

  async POST(req, _ctx) {
    const form = await req.formData();
    const folder = form.get("folder") as string;

    if (folder.length === 0) {
      return new Response("Invalid Content", { status: 400 });
    }

    const newFolder: Folder = {
      id: crypto.randomUUID(),
      name: folder,
      parentFolder: "home",
    };
    await saveFolder(newFolder);

    // Redirect user to folder id page.
    const headers = new Headers();
    headers.set("location", `/folder/${newFolder.id}`);
    return new Response(null, {
      status: 303,
      headers,
    });
  },
};

export default function Home(props: PageProps) {
  return (
    <Layout isloggedIn={props.data.token} folder={null}>
      (
        <div class="mx-auto text-center">
              <h1 class="text-2xl font-bold mb-5">Nice you're logged In!</h1>
              <a href="/auth/secret" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Secret</a>
            </div>
          ) :
          (
            <div class="mx-auto text-center">
              <h1 class="text-2xl font-bold mb-5">Login to access all pages</h1>
              <a href="/login" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</a>
            </div>
          )
      <TableFolder
        folders={props.data.subFolders}
        files={props.data.subFiles}
      />
    </Layout>
  );
}
