import React from "react";
import { ListItem, ListItemIcon, ListItemText, List } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AllOutIcon from "@material-ui/icons/AllOut";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import DescriptionIcon from "@material-ui/icons/Description";
import PlusOneIcon from "@material-ui/icons/PlusOne";

export default function Navigation() {
  return (
    <List>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AllOutIcon />
        </ListItemIcon>
        <ListItemText primary="Expansions" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Units" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <PlusOneIcon />
        </ListItemIcon>
        <ListItemText primary="Upgrades" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AnnouncementIcon />
        </ListItemIcon>
        <ListItemText primary="Command Cards" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Keywords" />
      </ListItem>
    </List>
  );
}
