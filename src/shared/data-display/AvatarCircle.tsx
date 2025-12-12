import React from "react";
import { cn } from "../../utils/cn";

interface AvatarCircleProps {
  name?: string;
  src?: string;
  size?: AvatarSize;
  color?: AvatarColor;
  className?: string;
}

type AvatarSize = "sm" | "md" | "lg" | "xl";
export type AvatarColor = "blue" | "gray" | "green" | "amber";

const sizeMap: Record<AvatarSize, string> = {
  sm: "h-7 w-7 text-xs",
  md: "h-9 w-9 text-sm",
  lg: "h-11 w-11 text-base",
  xl: "h-14 w-14 text-xl",
};

const colorMap: Record<AvatarColor, string> = {
  blue: "bg-blue-50 text-blue-700",
  gray: "bg-gray-100 text-gray-700",
  green: "bg-green-50 text-green-700",
  amber: "bg-amber-50 text-amber-700",
};

const AvatarCircle: React.FC<AvatarCircleProps> = ({
  name,
  src,
  size = "md",
  color = "blue",
  className,
}) => {
  const initial = name?.[0]?.toUpperCase() ?? "?";
  const colorClasses = colorMap[color] ?? colorMap.blue;

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn(
          "rounded-full object-cover",
          sizeMap[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-semibold",
        colorClasses,
        sizeMap[size],
        className
      )}
    >
      {initial}
    </div>
  );
};

export default AvatarCircle;
