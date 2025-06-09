import React from "react";
import styles from "./SkeletonLoader.module.css";

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  width = "100%",
  height = 24,
  style = {},
  className = "",
}) => {
  let borderRadius: number | string = 4;

  return (
    <span
      className={`${styles.skeleton} ${className}`}
      style={{
        width,
        height,
        borderRadius,
        display: "block",
        ...style,
      }}
    />
  );
};

export default SkeletonLoader;
