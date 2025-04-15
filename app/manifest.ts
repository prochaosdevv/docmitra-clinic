import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DocMitr - Clinic Management System",
    short_name: "DocMitr",
    description: "A comprehensive clinic management system",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4169e1",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
