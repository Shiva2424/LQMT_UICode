import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { createTheme } from '@mui/material';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {
  const todaydate = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = months[todaydate.getMonth()];
  let year = todaydate.getFullYear();
  let date = todaydate.getDate();
  const [timeval, setTime] = React.useState(todaydate.toLocaleTimeString());
  setInterval(() => {
    setTime(new Date().toLocaleTimeString());
        },1000);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
      );
      const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
      );
    
      const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
    
      return (
        <AppBar position="static" style={{backgroundColor: '#bb0826',height:'50px'}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  mb: 2,
                  display: { xs: 'flex' },
                  flexGrow: 1,
                  fontFamily: 'Wells Fargo Sans',
                  fontWeight: 700,
                  color: '#ffff01',
                  textDecoration: 'none',
                  alignItems: 'center',
                }}
              >
                WELLS FARGO
              </Typography>
              {/* <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
     */}
     {/* <Box style={{display:'flex',alignContent: 'center', flexDirection: 'column',marginBottom: '10px', marginRight: '10px'}}>
      <Typography style={{fontSize:'14px'}}>
      {date} {month} {year}
      </Typography>
      <Typography style={{fontSize:'14px'}}>
      {timeval}
      </Typography>
</Box> */}
              <Box sx={{ flexGrow: 0,mb: 1 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="John Doe" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Box style={{display:'flex',alignContent: 'center', flexDirection: 'column',marginLeft:'5px',fontSize: '10px',marginBottom: '10px'}}>
                <Typography style={{fontSize:'14px'}}>
                    Welcome
                </Typography>
                <Typography style={{fontSize:'14px'}}>
                    John Doe
                </Typography>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
  )
}

export default Navbar