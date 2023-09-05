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

// deno-lint-ignore no-explicit-any
export const handle: Handlers<any, State> = {
  GET(_req, ctx) {
    return ctx.render({...ctx.state});
  }
}


export const handler: Handlers < SubContent> = {
  async GET(_req, ctx) {
    if (!ctx.state.token) {
      const headers = new Headers();
      headers.set("location", `/login`);
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


    
    return ctx.render(subContent)
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
      parentFolder: 'home',
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
        <div class="flex flex-col justify-center"> 
          <TableFolder
          folders={props.data.subFolders}
          files={props.data.subFiles}
          />
        </div>
    </Layout>

  ) 
}
