import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import  MenuItem from '@mui/material/MenuItem';
import { MenuItem as MuiDropMenuItem } from '@mui/base/MenuItem';
import { Menu as DropMenu } from '@mui/base/Menu';
import { useMutation } from '@tanstack/react-query';
import { userLogout } from '@/api/user';
import { setUserLogout } from '@/redux/slices/authSlice';
import Loader from './Loader';
import { Link, useNavigate } from 'react-router-dom';

const pages = ['Home', 'Book offline gym', 'Personal trainer','Workouts','Contact'];

interface iState {
  auth: {
    uLoggedIn: boolean;

    userDetails: {
      id: string;
      name: string;
      profilePic: string;
    };
  };
}
function Navbar() {


  const dispatch=useDispatch()
  const navigate=useNavigate()

  const { uLoggedIn,userDetails } = useSelector((state: iState) => state.auth);

    const {status,mutate :handleLogout}=useMutation({

      mutationFn:userLogout,
      onSuccess:(res)=>{
        console.log(res)
        dispatch(setUserLogout())
        navigate('/login')
      }
    })
   



  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);




  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };



  return (
    <AppBar position="static">
      <Container className='bg-black p-2 '  maxWidth="xl">
        <Toolbar disableGutters>
           <img className='w-28 mr-4' src="./removebg.png" alt="" />
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu 
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
   
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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

    {uLoggedIn ? (
      <Dropdown>
      <MenuButton className='font-semibold text-lg mx-2'>{userDetails.name}</MenuButton>
      <DropMenu className='bg-black px-4 py-2 rounded-md'  slots={{ listbox: 'ol'  }} >
        <MuiDropMenuItem className='text-white cursor-pointer'>Profile</MuiDropMenuItem>
    
       <MuiDropMenuItem onClick={() => { handleLogout(); }} className='text-white cursor-pointer'>Log out</MuiDropMenuItem>
      </DropMenu>
    </Dropdown>
    ):<Link to={'/login'}><Button className='font-bold mx-4' variant="contained" style={{backgroundColor: 'gold', color: 'black'}}>Login</Button></Link>
  
    }
          
        </Toolbar>
      </Container>
      {status === "pending" && <Loader />}

    </AppBar>
  );
}
export default Navbar;
