import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import TimerIcon from '@mui/icons-material/Timer';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('xd')]: {
        width: '12ch',
        '&:focus': {
          width: '10ch',
        },
      },
    },
  }));
const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#8d6e63' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Studying Companion
        </Typography>
        <Search sx={{marginRight: '5rem'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              sx={{ marginRight: '-0.6rem'}}
            />
          </Search>
        
        <IconButton>
          <PlaylistAddCheckIcon sx={{fontSize: 45}} />
        </IconButton>
        <IconButton>
          <TimerIcon sx={{fontSize: 45}}/>
        </IconButton>
        <IconButton>
            <AccountCircleIcon sx={{fontSize: 45, marginBottom: '1.5rem'}} />
            <Typography variant="subtitle1" sx={{ marginTop: '3rem', fontWeight: 'bold', marginLeft: '-2.85rem'}}>
            Adam
            </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;






