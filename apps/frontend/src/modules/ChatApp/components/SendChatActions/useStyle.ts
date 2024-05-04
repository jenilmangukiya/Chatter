export const useStyle = () => {
  return {
    inputContainer: {
      width: "100%",
      gap: 1,
      alignItems: "center",
      p: 2,
      height: "60px",
      bgcolor: "white",
      borderRadius: "16px",
    },
    iconButton: {
      height: "60px",
      width: "60px",
      borderRadius: "8px",
      bgcolor: "primary.main",
      color: "white",
      "&:hover": { color: "primary.main" },
    },
  };
};
