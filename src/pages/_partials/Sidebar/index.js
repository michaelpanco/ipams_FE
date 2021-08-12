import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { Link } from "react-router-dom";

const Sidebar = (
  <div>
    <ListItem button component={Link} to="/dashboard">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>

    <ListItem button component={Link} to="/ipaddress">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="IP Address" />
    </ListItem>


    <ListItem button component={Link} to="/activities">
      <ListItemIcon>
        <FormatListBulletedIcon />
      </ListItemIcon>
      <ListItemText primary="Activities" />
    </ListItem>

  </div>
);
export default Sidebar