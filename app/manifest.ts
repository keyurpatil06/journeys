import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "90 Days",
        short_name: "90 Days",
        description: "Explore and share travel journeys.",
        start_url: "/",
        display: "standalone",
        background_color: "#FFF8EE",
        theme_color: "#4A3A2A",
        orientation: "portrait",
        scope: "/",
        lang: "en",
        icons: [
            {
                src: "/assets/icons/icon-192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/assets/icons/icon-512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    };
}