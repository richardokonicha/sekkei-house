import { promises as fs } from "fs"
import path from "path"

const ALLOWED_DIR = path.join(process.cwd(), "components", "bookmarks")

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const filePath = searchParams.get("path")

  if (!filePath || !filePath.startsWith("components/bookmarks/")) {
    return new Response("Invalid path", { status: 400 })
  }

  const fullPath = path.resolve(process.cwd(), filePath)
  const relative = path.relative(ALLOWED_DIR, fullPath)

  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    return new Response("Invalid path", { status: 400 })
  }

  try {
    const source = await fs.readFile(fullPath, "utf8")
    return new Response(source, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    })
  } catch {
    return new Response("Not found", { status: 404 })
  }
}
