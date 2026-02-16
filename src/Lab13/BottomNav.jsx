import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { Home } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

export default function BottomNav() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation sx={{ width:'screen',marginTop:50,display:'flex',justifyItems:'center' }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<Home />}
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={<FavoriteIcon />}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<Avatar sx={{ bgcolor: "primary.main" }}>
        <PersonIcon />
        </Avatar>}
      />
      <BottomNavigationAction label="Search" value="search" icon={<SearchIcon/>} />
    </BottomNavigation>
  );
}
