import { Stack, Box, Typography } from "@mui/material";
import { dashConfig } from "../../../components/DashboardMenu/dashConfig";
import { formatToMDY } from "../../../utilities/dateTranslate";

export type BoardTileType = {
  title: string;
  createdBy: string;
  lastEdited: string;
};

const BoardTile = ({ title, createdBy, lastEdited }: BoardTileType) => {
  return (
    <Stack
      sx={{
        bgcolor: dashConfig.styles.menuItemColorPrimary,
        width: "200px",
        height: "150px",
        padding: 2,
        color: "white",
        borderRadius: 2,
        justifyContent: "space-between",
        border: `solid 3px ${dashConfig.styles.menuItemColorPrimary}`,
      }}
    >
      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography fontSize={"14px"}>
          Created by <strong>{createdBy}</strong>
        </Typography>
        <Typography fontSize={"14px"}>
          Last Edited: {formatToMDY(lastEdited)}
        </Typography>
      </Box>
      <Typography>View Board</Typography>
    </Stack>
  );
};

export default BoardTile;
