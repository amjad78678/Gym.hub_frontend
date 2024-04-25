import React from 'react'
import { Button,  Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"


interface iType {
    clickHandle: () => void
}
const ModalSubscriptionEdit: React.FC<iType> = ({clickHandle}) => {


  return (
    <div style={{textAlign:'center'}}>
         
            <Dialog 
            // fullScreen 
             open={true} onClose={clickHandle} fullWidth maxWidth="sm">
                <DialogTitle>Edit Subscription  <IconButton onClick={clickHandle} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton>  </DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>Do you want remove this user?</DialogContentText> */}
                    <Stack spacing={2} margin={2}>
                      <TextField variant="outlined" label="Subscription"></TextField>
                      <TextField variant="outlined" label="Amount"></TextField>
           
                      {/* <FormControlLabel control={<Checkbox defaultChecked color="primary"></Checkbox>} label="Agree terms & conditions"></FormControlLabel> */}
                      <Button color="primary" variant="contained">Submit</Button>
                    </Stack>
                </DialogContent>
                <DialogActions>
                {/* <Button color="success" variant="contained">Yes</Button>
                    <Button onClick={closepopup} color="error" variant="contained">Close</Button> */}
                </DialogActions>
            </Dialog>
        </div>
  )
}

export default ModalSubscriptionEdit