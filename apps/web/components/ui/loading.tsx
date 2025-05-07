import React from "react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
  variant?: "spinner" | "dots" | "pulse";
}

export function Loading({ 
  size = "md", 
  className, 
  text, 
  variant = "spinner" 
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
  };

  const dotSizes = {
    sm: "h-1 w-1",
    md: "h-2 w-2",
    lg: "h-3 w-3",
  };

  const pulseSizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return (
          <div
            className={cn(
              "animate-spin rounded-full border-t-transparent border-gray-900",
              sizeClasses[size]
            )}
          />
        );
      case "dots":
        return (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "bg-gray-900 rounded-full animate-bounce",
                  dotSizes[size]
                )}
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: "0.6s",
                }}
              />
            ))}
          </div>
        );
      case "pulse":
        return (
          <div
            className={cn(
              "bg-gray-200 rounded-full animate-pulse",
              pulseSizes[size]
            )}
          >
            <div className="h-full w-full bg-gray-400 rounded-full opacity-75 animate-ping" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      {renderLoader()}
      {text && <p className="mt-2 text-sm text-gray-600">{text}</p>}
    </div>
  );
}
