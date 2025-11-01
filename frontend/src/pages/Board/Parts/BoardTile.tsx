import { Stack, Box, Typography } from "@mui/material";
import { dashConfig } from "../../../components/DashboardMenu/dashConfig";

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
      }}
    >
      <Box>
        <Typography>{title}</Typography>
        <Typography>
          Created by <strong>{createdBy}</strong>
        </Typography>
        <Typography>Last Edited: {lastEdited}</Typography>
      </Box>
      <Typography>View Board</Typography>
    </Stack>
  );
};

export default BoardTile;
