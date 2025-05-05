import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fab, Zoom, useScrollTrigger } from "@mui/material";

const ScrollTopButton = () => {
  const trigger = useScrollTrigger({
    threshold: 100, // quantos pixels precisa rolar pra aparecer
  });

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Zoom in={trigger}>
      <Fab
        onClick={handleClick}
        sx={{
          backgroundColor: "#550e9b",
          color: "white",
          "&:hover": {
            backgroundColor: "#230640",
          },
          position: "fixed",
          bottom: 32,
          right: 32,
          zIndex: 1000,
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

export default ScrollTopButton;
