export const useStyle = () => {
  return {
    chatListContainer: {
      scrollbarWidth: "none",
      overflow: "hidden",
      overflowY: "scroll",
      height: "calc(100vh - 62px - 100px - 8px)",
      position: "static",
      borderRadius: "16px",
      bgcolor: "white",
      py: 2,
    },
    exploreItem: {
      cursor: "pointer",
      p: 5,
      px: 4,
      alignItems: "center",
      gap: 2,
      height: 60,
    },
    actionButton: {
      borderRadius: 16,
    },
  };
};
