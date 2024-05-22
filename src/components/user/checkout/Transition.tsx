import { Slide, SlideProps } from '@mui/material'
import React, { forwardRef } from 'react'

const Transition  = forwardRef<HTMLDivElement, SlideProps>((props, ref) => {
    const transitionSpeed = 500;
  
    return (
      <Slide
        direction="down"
        {...props}
        ref={ref}
        timeout={{ enter: transitionSpeed, exit: transitionSpeed }}
      />
    );
})

export default Transition