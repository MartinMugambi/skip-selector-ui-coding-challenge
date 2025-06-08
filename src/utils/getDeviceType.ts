export type DeviceType = "mobile" | "tablet" | "desktop";

const getDeviceType = (width: number): DeviceType => {
  if (width < 768) return "mobile";

  if (width >= 768 && width < 1024) return "tablet";

  return "desktop";
};

export default getDeviceType;
