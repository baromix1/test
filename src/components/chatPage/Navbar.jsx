import { Box, Typography, Avatar, useTheme } from '@mui/material'
import AuthContext from "../../store/auth-context";
import {React, useContext} from 'react'

const Navbar = () => {
const theme = useTheme();
const authCtx = useContext(AuthContext);

  return (
    <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      bgcolor:  theme.palette.primary.dark,
      height: 50,
      padding: '12px',
      justifyContent: 'space-between',
      color: theme.palette.primary.contrastText,
      marginBottom: '10px',
    }}
  >
    <Typography component="span" sx={{ margin: 0, padding: 0 }}>
      CommuTools Chat
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        sx={{
          backgroundColor: theme.palette.secondary.main,
          width: 30,
          height: 30,
          marginRight: 1 
        }}
        aria-label="recipe"
      >
        <Typography
          variant="p"
          component="span" 
          sx={{
            fontWeight: "bold", 
            color: theme.palette.background.default,
            fontSize: '1rem' 
          }}
        >
          {authCtx.username.substring(0, 1).toUpperCase()}
        </Typography>
      </Avatar>
      <Typography sx={{ lineHeight: 'normal', fontSize: '1rem', margin: 0 }}>
      {authCtx.username}
      </Typography>
    </Box>
  </Box>
  )
}

export default Navbar