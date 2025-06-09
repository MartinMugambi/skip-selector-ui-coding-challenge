import { useEffect, useState } from "react";
import getDeviceType, { DeviceType } from "../utils/getDeviceType";

const useResponsive = () => {
  const [device, setDevice] = useState<DeviceType>(
    getDeviceType(window.innerWidth)
  );
  useEffect(() => {
    const handleResize = () => {
      const currentDevice = getDeviceType(window.innerWidth);
      setDevice(currentDevice);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [device]);

  return {
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  };
};

export default useResponsive;
