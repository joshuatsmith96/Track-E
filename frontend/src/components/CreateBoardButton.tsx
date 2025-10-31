import { Button } from "@mui/material";
import { dashConfig } from "./DashboardMenu/dashConfig";

const CreateBoardButton = () => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: dashConfig.styles.menuItemColorPrimary,
        width: "100%",
      }}
    >
      Create Board +
    </Button>
  );
};

export default CreateBoardButton;
