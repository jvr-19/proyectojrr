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
import AdbIcon from '@mui/icons-material/Adb';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

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

    const RoleIcon = userData.userRol === 'admin' ? AdminIcon : userData.userRol === 'guest' ? InsertEmoticonIcon : AdbIcon;

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List onClick={toggleDrawer(false)}>
                <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem disablePadding>
                        <Tooltip title="Página Inicio" arrow>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Inicio" />
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </Link>
                {userData.userRol === 'admin' && (
                    <Link to="/reports" style={{ textDecoration: 'none', color: 'white' }}>
                        <ListItem disablePadding>
                            <Tooltip title="Página Informes" arrow>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <FeedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Informes" />
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    </Link>
                )}
                {userData.userRol === 'admin' && (
                    <Link to="/users" style={{ textDecoration: 'none', color: 'white' }}>
                        <ListItem disablePadding>
                            <Tooltip title="Gestionar usuarios" arrow>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AccountCircle />
                                    </ListItemIcon>
                                    <ListItemText primary="Gestión Usuarios" />
                                </ListItemButton>
                            </Tooltip>
                        </ListItem>
                    </Link>
                )}
                <Link to="/Rico_Rodríguez_Javier_UT4A1.pdf" target='_blank' style={{ textDecoration: 'none', color: 'white' }}>
                    <ListItem disablePadding>
                        <Tooltip title="Página Ayuda" arrow>
                            <ListItemButton>
                                <ListItemIcon>
                                    <HelpIcon />
                                </ListItemIcon>
                                <ListItemText primary="Ayuda" />
                            </ListItemButton>
                        </Tooltip>
                    </ListItem>
                </Link>
                <ListItem disablePadding>
                    <Tooltip title="Cerrar sesión" arrow>
                        <ListItemButton onClick={() => navigate('/')}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Salir" />
                        </ListItemButton>
                    </Tooltip>
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
                    <Tooltip title="Abrir menu" arrow>
                        <IconButton edge="start" color="primary" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>
                    <div style={{ flexGrow: 1, textAlign: 'center' }}>
                        <Typography color="primary">{userData.userName}</Typography>
                    </div>
                    <Tooltip title="Ver información usuario" arrow>
                        <IconButton edge="end" color="primary" onClick={handleMenu(true)}>
                            <RoleIcon />
                        </IconButton>
                    </Tooltip>
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