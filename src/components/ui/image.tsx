
import * as React from "react"

import { cn } from "@/lib/utils"

export interface ImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, ...props }, ref) => {
    return (
      <img
        className={cn("h-auto max-w-full", className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Image.displayName = "Image"

export { Image }
