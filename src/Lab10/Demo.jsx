import React from 'react'
import {Typography} from '@mui/material'

const Demo = () => {
  return (
    <Typography variant="h4" component="p" sx={{color: 'blue', padding: '5'}} hover={{color: 'red'}}>
        Hello From Material-UI!
    </Typography>
  )
}

export default Demo
