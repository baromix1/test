import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

const Sidebar = () => {
  return (
    <Container disableGutters sx={{ flex: 1, borderRight: "1px solid #3e3c61", height: '100%' }}>
    <Box>  
    <Navbar/>
    <Search/>
    <Chats/>
    </Box>
    </Container>
  )
}

export default Sidebar