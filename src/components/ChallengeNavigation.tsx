import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
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
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              className="tablist"
            >
              <Link to="../infos" relative="path">
                <Tab label="Informations" value="1" />
              </Link>
              <Link to="../tasks" relative="path">
                <Tab label="Eco-gestes" value="2" />
              </Link>
              <Link to="../leaderboard" relative="path">
                <Tab label="Classement" value="3" />
              </Link>
            </TabList>
          </Box>
        </TabContext>
      </Box>
    </nav>
  );
};

export default ChallengeNavigation;
