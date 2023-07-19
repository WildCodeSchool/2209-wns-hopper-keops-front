import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React from "react";

const ChallengeNavigation = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <nav>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Link to="../infos" relative="path" role="button">
                <Tab label="Item One" value="1" />
              </Link>
              <Link to="../tasks" relative="path" role="button">
                <Tab label="Item Two" value="2" />
              </Link>
              <Link to="../leaderboard" relative="path" role="button">
                <Tab label="Item Three" value="3" />
              </Link>
            </TabList>
          </Box>

          <TabPanel value="1">Item One</TabPanel>
          <TabPanel value="2">Item Two</TabPanel>
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    </nav>
  );
};

export default ChallengeNavigation;
