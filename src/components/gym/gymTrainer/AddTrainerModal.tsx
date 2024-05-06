import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { addTrainer } from "@/api/gym";
import toast from "react-hot-toast";
import CloseIcon from "@mui/icons-material/Close"
import Loader from "@/components/common/Loader";

const AddTrainerModal = ({ open,setOpen,refetch}) => {
  const [formDatas, setFormDatas] = useState({
    name: '',
    gender: '',
    age: '',
    experience: '',
    achievements: '',
    monthlyFee: '',
    yearlyFee: '',
    email: '',
    password: '',
    imageUrl: null
  });

  const [image, setImage] = useState<File | null>(null);

  const handleChange = (e) => {
    const { name, value,files } = e.target;

    if(files){

        setImage(files[0]);
        setFormDatas((prevState) => ({...prevState, imageUrl: files[0] }));

    }else{
        setFormDatas(prevState => ({
         ...prevState,
          [name]: value
        }));
        
    }
  };

  const {status: mutStatus,mutate}=useMutation({
    mutationFn: addTrainer,
    onSuccess: (res) => {
        if(res){
            toast.success(res.data.message)
            refetch()
            setOpen(false);

        }
    }
  })

  const handleSubmit = () => {

    const formData = new FormData();
    formData.append("name", formDatas.name);
    formData.append("gender", formDatas.gender);
    formData.append("age", formDatas.age);
    formData.append("experience", formDatas.experience);
    formData.append("achievements", formDatas.achievements);
    formData.append("monthlyFee", formDatas.monthlyFee);
    formData.append("yearlyFee", formDatas.yearlyFee);
    formData.append("email", formDatas.email);
    formData.append("password", formDatas.password);

  if (image) {
    formData.append("imageUrl", image);
  }

 mutate(formData)   

  };

  return (
    <div>
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
      <DialogTitle>Add Trainer  <IconButton onClick={() => setOpen(false)} style={{float:'right'}}><CloseIcon color="primary"></CloseIcon></IconButton> </DialogTitle>
      <DialogContent>
        <Stack spacing={2} margin={2}>
        {formDatas.imageUrl && (
            <img className="rounded-xl mx-auto object-cover w-1/2 " src={URL.createObjectURL(formDatas.imageUrl)} alt="Selected"  />
          )}
        <TextField
            label="Image"
            name="imageFile"
            type="file"
            onChange={handleChange}
            variant="outlined"
          />
        
          <TextField
            label="Name"
            name="name"
            value={formDatas.name}
            onChange={handleChange}
            variant="outlined"
          />
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Age"
              sx={{ width: "100%" }}
              name="age"
              value={Number(formDatas.age)}
              onChange={handleChange}
              variant="outlined"
            />
            <FormControl fullWidth>
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Select
                labelId="gender-select-label"
                id="gender-select"
                name="gender"
                value={formDatas.gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <TextField
            label="Experience"
            name="experience"
            value={formDatas.experience}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Achievements"
            name="achievements"
            value={formDatas.achievements}
            onChange={handleChange}
            variant="outlined"
          />
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Monthly Price"
              sx={{ width: "100%" }}
              name="monthlyFee"
              value={formDatas.monthlyFee}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              sx={{ width: "100%" }}
              label="Yearly Price"
              name="yearlyFee"
              value={formDatas.yearlyFee}
              onChange={handleChange}
              variant="outlined"
            />
          </Stack>

          <TextField
            label="Email"
            name="email"
            value={formDatas.email}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            label="Password"
            name="password"
            value={formDatas.password}
            onChange={handleChange}
            variant="outlined"
            type="password"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary"  sx={{ width: "50%",mx: "auto" }}>
          Add Trainer
        </Button>
      </DialogActions>
    </Dialog>
    {mutStatus === "pending" && <Loader />}
    </div>
  );
};

export default AddTrainerModal;
