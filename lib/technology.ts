export function technologyKey(technology: string) {
  return technology
    .toLowerCase()
    .replace(/asp\.net/g, "aspnet")
    .replace(/\.net/g, "dotnet")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
