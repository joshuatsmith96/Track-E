import { Button, Box } from "@mui/material";
import { dashConfig } from "./DashboardMenu/dashConfig";

export type CreateBoardButtonType = {
  showWords?: boolean;
};

const CreateBoardButton = ({ showWords }: CreateBoardButtonType) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: dashConfig.styles.menuItemColorPrimary,
        width: "100%",
      }}
    >
      <Box sx={{ display: !showWords ? "inherit" : "none" }}>Create Board</Box>
      &nbsp;+
    </Button>
  );
};

export default CreateBoardButton;
