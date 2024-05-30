export const useStyle = () => {
  return {
    bottomSidebar: {
      scrollbarWidth: "none",
      overflow: "hidden",
      overflowY: "scroll",
      height: "calc(100vh - 62px - 100px - 8px)",
      position: "static",
      borderRadius: "16px",
      bgcolor: "white",
      py: 2,
    },
    notificationCount: {
      bgcolor: "primary.main",
      fontSize: 12,
      p: "4px",
      borderRadius: "100%",
      height: "20px",
      width: "20px",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: 600,
    },
  };
};
