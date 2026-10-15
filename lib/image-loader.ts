export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/$/, "");
  const path =
    src.startsWith("/") && !src.startsWith("//") ? `${basePath}${src}` : src;
  return `${path}?w=${width}`;
}
