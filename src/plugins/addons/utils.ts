import { promises as fs } from "fs";

export async function scanFolder(path: string): Promise<string[]> {
  try {
    const directories = await fs.readdir(path, { withFileTypes: true });
    return directories.filter((directory) => directory.isDirectory()).map((directory) => directory.name);
  } catch (err) {
    console.error("Error reading directory:", err);
    return [];
  }
}

export async function checkFileExists(file: string): Promise<boolean> {
  try {
    await fs.access(file);
    return true;
  } catch (error) {
    if (error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}
