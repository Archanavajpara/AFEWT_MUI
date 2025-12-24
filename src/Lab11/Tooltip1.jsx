import { Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import React from 'react'

function Tooltip1() {
  return (
    <div>
    <Tooltip title="Delete">
        <IconButton>
            <DeleteIcon  sx={{fontSize:100}}/>
        </IconButton>
    </Tooltip>
    </div>
  )
}

export default Tooltip1
