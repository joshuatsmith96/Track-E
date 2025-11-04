import useMediaQuery from "@mui/material/useMediaQuery";

export const useScreenSize = () => {
  const xs = useMediaQuery("(max-width: 0px)");
  const sm = useMediaQuery("(max-width: 600px)");
  const md = useMediaQuery("(max-width: 960px)");
  const lg = useMediaQuery("(max-width: 1280px)");

  return { xs, sm, md, lg };
};
