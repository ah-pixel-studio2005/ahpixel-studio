import type { ImgHTMLAttributes } from "react";

type NextImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string | { src: string };
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
};

export default function NextImage({ src, fill, priority, unoptimized: _unoptimized, style, ...props }: NextImageProps) {
  const actualSrc = typeof src === "string" ? src : src.src;
  return <img
    {...props}
    src={actualSrc}
    loading={priority ? "eager" : props.loading ?? "lazy"}
    fetchPriority={priority ? "high" : props.fetchPriority}
    decoding="async"
    style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style}
  />;
}
