import { FreshFile } from "../models/file.ts";
import { Folder } from "../models/folder.ts";

interface DeleteButtonProps {
  file: FreshFile | null;
  folder: Folder | null;
}

export default function DeleteButton({ file, folder }: DeleteButtonProps) {
  const onDeleteFile = async (file: FreshFile) => {
  const url = "/api/file";
  const response = await fetch(url, { method: "DELETE", credentials: "same-origin", body: JSON.stringify(file) })

  if (response.status === 200) {
    console.log("File deleted successfully");
    window.location.reload();
  } else {
    console.log("Failed to delete file");
  }

  const onDeleteFolder = async (folder: Folder) => {
  const url = "/api/folder";
  const response = await fetch(url, { method: "DELETE", credentials: "same-origin" ,body: JSON.stringify(folder) })

  if (response.status === 200) {
    console.log("Folder deleted successfully")
    window.location.reload();
  } else {
    console.log("Failed to delete folder");
  }

  return (
    <button onClick={() => (file) ? onDeleteFile(file) : onDeleteFolder(folder!)} class="text-red-500 hover:text-red-700"></button>
    ); 

  }
}