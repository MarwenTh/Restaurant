import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
}

const BlurImage = ({
  src,
  alt,
  className,
  containerClassName,
  aspectRatio = "aspect-video",
  ...props
}: BlurImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        "overflow-hidden relative",
        aspectRatio,
        containerClassName,
      )}
    >
      <img
        src={src}
        alt={alt}
        {...props}
        onLoad={() => setIsLoading(false)}
        className={cn(
          "transition-all duration-500 object-cover w-full h-full",
          isLoading ? "scale-110 blur-xl" : "scale-100 blur-0",
          className,
        )}
      />
    </div>
  );
};

export default BlurImage;
