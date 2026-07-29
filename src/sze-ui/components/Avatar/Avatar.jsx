import { Avatar as PAvatar } from "primereact/avatar";

/**
 * SZE Avatar - PrimeReact Avatar wrapper
 * 
 * Ez egy szoktatott Avatar komponens, amely a PrimeReact Avatar-ra épít,
 * de SZE-specifikus stílusokkal és Tailwind stílusokkal bővíti azt.
 * 
 * Props:
 * - image: string (az avatar képének URL-je)
 * - icon: string (ikon class, pl. "pi pi-user")
 * - label: string (kezdőbetűk, pl. "JD" = John Doe)
 * - size: string ("large" | "xlarge" | "normal" | "small")
 * - shape: string ("circle" | "square") - alapértelmezett: circle
 * - className: string (további CSS osztályok)
 * - ...props - Összes egyéb PrimeReact Avatar prop
 */
export default function Avatar({ size = "normal", shape = "circle", className, ...props }) {
  return (
    <PAvatar
      size={size}
      shape={shape}
      {...props}
      className={className || ""}
    />
  );
}
