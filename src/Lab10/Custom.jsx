import { Typography } from '@mui/material'
import React from 'react'

function Custom() {
  return (
    <Typography>
      <Typography variant="h4" component="h4" sx={{color: 'red', 	fontWeight:'Bold', marginTop: '20px'}}>
            Hello From Material-UI!
      </Typography>
      <Typography variant="body1" component="p" sx={{color: 'green', fontWeight:'Medium',marginTop: '20px'}}>
            This is a custom Typography component using Material-UI in React.
      </Typography>
    </Typography>
  )
}

export default Custom
