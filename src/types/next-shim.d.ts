declare module "next" {
  export type Metadata = Record<string, unknown>;
}

declare module "next/image" {
  import type { ComponentType, ImgHTMLAttributes } from "react";
  type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
    src: string | { src: string };
    fill?: boolean;
    priority?: boolean;
    unoptimized?: boolean;
  };
  const Image: ComponentType<Props>;
  export default Image;
}
