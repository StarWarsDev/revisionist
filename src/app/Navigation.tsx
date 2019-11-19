import React from "react";
import { ListItem, ListItemIcon, ListItemText, List } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AllOutIcon from "@material-ui/icons/AllOut";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import DescriptionIcon from "@material-ui/icons/Description";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import { Link, LinkProps } from "react-router-dom";

const RouterLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link innerRef={ref} {...props} />
);

export default function Navigation() {
  return (
    <List>
      <ListItem button component={RouterLink} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button component={RouterLink} to="/expansions">
        <ListItemIcon>
          <AllOutIcon />
        </ListItemIcon>
        <ListItemText primary="Expansions" />
      </ListItem>
      <ListItem button component={RouterLink} to="/units">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Units" />
      </ListItem>
      <ListItem button component={RouterLink} to="/upgrades">
        <ListItemIcon>
          <PlusOneIcon />
        </ListItemIcon>
        <ListItemText primary="Upgrades" />
      </ListItem>
      <ListItem button component={RouterLink} to="/command-cards">
        <ListItemIcon>
          <AnnouncementIcon />
        </ListItemIcon>
        <ListItemText primary="Command Cards" />
      </ListItem>
      <ListItem button component={RouterLink} to="/keywords">
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Keywords" />
      </ListItem>
    </List>
  );
}
