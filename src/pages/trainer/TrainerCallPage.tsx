import VedioCall from '@/components/trainer/vedioCall/VedioCall'
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Tooltip } from "@mui/material";
import { Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/common/Footer';
const TrainerCallPage = () => {
const navigate = useNavigate()
  return (
    <>
        <CssBaseline />
        <AppBar  sx={{ backgroundColor:  "black" , padding: 1 }} position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              sx={{
                marginRight: 5,
               
              }}
            >
              <MenuIcon />
            </IconButton>

            <Tooltip title="Go back to home page">
              <IconButton sx={{ mr: 1,color: "white" }} onClick={() => navigate("/trainer/dashboard")}>
                <Home />
              </IconButton>
            </Tooltip>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <div className='bg-dark flex justify-center items-center'>

       <VedioCall />
        </div>
    <Footer/>
    </>
  )
}

export default TrainerCallPage