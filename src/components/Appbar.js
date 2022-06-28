import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
//import { Modal } from 'bootstrap';


export default function ButtonAppBar() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const[customerId,setCustomerId]=React.useState('')
  const[description,setDescription]=React.useState('')
  const[type,setType]=React.useState('')
  const[state]=React.useState('open')
  const createdDate = new Date().toISOString().split('T')[0]


  const handleClick=(e)=>{
    e.preventDefault();
    const issue={customerId,description,type,state,createdDate};
    console.log(issue);
    fetch("http://localhost:8080/issue/add",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(issue)
}).then(()=>{
    console.log("New Issue Added");
    handleClose();
    window.location.reload(false);
})
}
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Issues
          </Typography>

          <Button onClick={handleClickOpen} color="inherit">Add New</Button>

          <Dialog open={open} onClose={handleClose}>

            <DialogTitle>New Issue</DialogTitle>

            <DialogContent>

              

              <FormControl >
      <FormLabel id="demo-radio-buttons-group-label" style={{textAlign:"left"}}>Type</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={(e)=>setType(e.target.value)}
      >
        <FormControlLabel value="bug" control={<Radio />} label="Bug" />
        <FormControlLabel value="question" control={<Radio />} label="Question" />
        <FormControlLabel value="improvement" control={<Radio />} label="Improvement" />
      </RadioGroup>
    </FormControl>

              <TextField  label="Customer Id" variant="standard" fullWidth 
        value={customerId}
        onChange={(e)=>setCustomerId(e.target.value)}
        />



        <TextField  label="Description" variant="standard" fullWidth
        value={description}
        onChange={(e)=>setDescription(e.target.value)}
        />


          </DialogContent>

          <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClick}>Save</Button>
          </DialogActions>
        </Dialog>
         
        </Toolbar>
      </AppBar>
    </Box>
    
  );
}
