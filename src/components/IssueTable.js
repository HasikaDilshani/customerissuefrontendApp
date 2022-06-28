


import React, { useState, useEffect } from 'react'

import { Table, Button, Badge } from 'react-bootstrap'
//import Issue from './Issue'

import {  Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';



const IssueTable = () => {

  const [tableData, setTableData] = useState([])
  const [issueData, setIssueData] = useState([])
  const [id, setId] = useState([])
  const [cId, setCId] =  useState([])

  const [open, setOpen] = React.useState(false);

 function handleClickOpen(id)  {
    setOpen(true);
    console.log(id);

    var url = "http://localhost:8080/issue/issues/"+ id;

  
    fetch("http://localhost:8080/issue/issues/"+ id)
    .then((results) => results.json())
    .then(results => {
        console.log(results);
      
      setId(results.id);
      console.log(id);
      setCId(results.type);
      console.log(cId);
    });

   
    
        //console.log(issueData);

  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch("http://localhost:8080/issue/getAll")
      .then((data) => data.json())
      .then((data) => setTableData(data))

  }, [])


  

  console.log(tableData)

  return (

<div>
<Table style={{width:"70%"}} striped bordered hover>
  <thead>
    <tr>
      <th>ID</th>
      <th>Description</th>
      <th>Customer ID</th>
      <th>Created Date</th>
      <th>Type</th>
      <th>State</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {tableData.map(issue => 
    <tr key={issue.id}>
    <td>{issue.id}</td>
    <td>{issue.description}</td>
    <td>{issue.customerId}</td>
    <td>{issue.createdDate}</td>
    <td>{issue.type}</td>
    <td><Badge bg="secondary">{issue.state}</Badge></td>
    <td><Button onClick={() => handleClickOpen(issue.id)} variant="success">Update</Button>   <Button variant="danger">Delete</Button></td>
    
  </tr>
    )}
    
    
  </tbody>
</Table>

<Dialog open={open} onClose={handleClose}>

            <DialogTitle>Update Issue</DialogTitle>

            <DialogContent>

              
            
              <FormControl >
      <FormLabel id="demo-radio-buttons-group-label" style={{textAlign:"left"}}>Type</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        //  defaultValue={issueData.type}
      >
        <FormControlLabel value="bug" control={<Radio />} label="Bug" />
        <FormControlLabel value="question" control={<Radio />} label="Question" />
        <FormControlLabel value="improvement" control={<Radio />} label="Improvement" />
      </RadioGroup>
    </FormControl>

              <TextField  label="Customer Id" variant="standard" fullWidth 
              inputProps={{
                defaultValue: {id}
         }}
       
        />



        <TextField  label="Description" variant="standard" fullWidth
         inputProps={{
            defaultValue: {cId}
     }}
        />
     
    {issueData.id}
              </DialogContent>

          <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button >Save</Button>
          </DialogActions>
        </Dialog>

<div style={{width:"30%"}}>

</div>

</div>



    // <div style={{ height: 700, width: '80%' , marginLeft:'30px',marginTop:'20px'}}>
    //   <DataGrid
    //     rows={tableData}
    //     columns={columns}
    //     pageSize={11}
    //   />
    // </div>
  )
}

export default IssueTable
