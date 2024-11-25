import '../App.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { RootState } from '../store/index'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminIcon from '@mui/icons-material/AdminPanelSettings';
import HelpIcon from '@mui/icons-material/Help';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Menus() {
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const userData = useSelector((state: RootState) => state.authenticator);

    const isLoggedin = userData.isAutenticated
    useEffect(() => {
        if (!isLoggedin) {
            navigate('/')
        }
    }, [isLoggedin, navigate]);

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const RoleIcon = userData.userRol === 'admin' ? AdminIcon : AccountCircle;

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List onClick={toggleDrawer(false)}>
                <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inicio" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                {userData.userRol === 'admin' && (
                    <Link to="/reports" style={{ textDecoration: 'none', color: 'white' }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <FeedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Informes" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                )}
                <Link to="/ayuda" style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText primary="Ayuda" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate('/')}>
                        <ListItemIcon>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Salir" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box >
    );

    const [anchorEl, setAnchorEl] = useState(false);

    const handleMenu = (open: boolean) => () => {
        setAnchorEl(open);
    };

    return (
        <>
            <AppBar position='relative' sx={{
                maxWidth: '1280px',
                marginTop: '20px',
                backgroundColor: 'rgba(34,34,34,.21)',
                color: '#fff',
                borderRadius: '10px',
            }}>
                <Toolbar>
                    <IconButton edge="start" color="primary" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                    <div style={{ flexGrow: 1, textAlign: 'center' }}>
                        <Typography color="primary">{userData.userName}</Typography>
                    </div>
                    <IconButton edge="end" color="primary" onClick={handleMenu(true)}>
                        <RoleIcon />
                    </IconButton>
                    <Menu
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={anchorEl}
                        onClose={handleMenu(false)}
                    >
                        <MenuItem onClick={handleMenu(false)}><RoleIcon /> Usuario: {userData.userName}</MenuItem>
                        <MenuItem onClick={handleMenu(false)}><RoleIcon /> Rol: {userData.userRol}</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>

            <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    )
}

export default Menus