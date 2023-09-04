import supabase from "../models/supabaseClient.ts";
import { FreshFile } from "../models/file.ts";

const client = supabase;

export async function uploadFile(
  file: Blob,
  id: string,
  parentfolder: string,
): Promise<string | undefined> {
  const { data, error } = await client
    .storage
    .from("folders")
    .upload(parentfolder + "/" + id, file);

  if (error) {
    console.log(error);
  }

  return data?.path;
}

export async function getPublicUrl(file: FreshFile): Promise<string> {
  const { data } = await client.storage.from("folders").getPublicUrl(
    file.parentFolder + "/" + file.id,
  );

  return data.publicUrl;
}

export async function removeFile(file: FreshFile): Promise<void> {
  const { error } = await client.storage.from("folders").remove([
    file.parentFolder + "/" + file.id,
  ]);

  if (error) {
    console.log(error);
  }
}
