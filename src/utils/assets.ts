export const BASE_PATH = "/AkshayKumbhar.in";

/**
 * Prepends the repository base path to asset URLs for GitHub Pages deployment.
 * Prevents duplicating the base path if it is already present.
 */
export function getAssetPath(path: string): string {
  if (!path) return "";

  // Do not touch external or special URLs
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  // If the path already has the base path, return it directly
  if (path.startsWith(BASE_PATH)) {
    return path;
  }

  // Prepend base path, ensuring consistent slashes
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${BASE_PATH}${cleanPath}`;
}
