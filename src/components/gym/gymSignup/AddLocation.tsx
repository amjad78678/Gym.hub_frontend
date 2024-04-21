import { Box } from '@mui/material'
import React from 'react'
import ReactMapGl from 'react-map-gl'

const AddLocation = () => {
  return (
    <div>
<Box
sx={{
    height:400,
    position:'relative',
}}
>
<ReactMapGl
mapboxAccessToken={'4785457348578375873485738349df'}
></ReactMapGl>

</Box>

    </div>
  )
}

export default AddLocation