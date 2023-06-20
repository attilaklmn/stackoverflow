import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AnimationIcon from '@mui/icons-material/Animation';
import { Drawer } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SideMenu = (props) => {
    const navigate = useNavigate();
    return (
        <Drawer anchor='left' open={props.isOpen} onClose={() => props.handleDrawerToggle()}>
      <List>
          <ListItem key='Homepage' onClick={() => {
            props.handleDrawerToggle();
            navigate("/")
          }} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AnimationIcon/>
              </ListItemIcon>
              <ListItemText primary='Homepage' />
            </ListItemButton>
          </ListItem>
          <ListItem key='Questions' onClick={() => {
            props.handleDrawerToggle();
            navigate("/questions")
          }} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AnimationIcon/>
              </ListItemIcon>
              <ListItemText primary='Questions' />
            </ListItemButton>
          </ListItem>
          
      </List>
      </Drawer>
    )
}

export default SideMenu;