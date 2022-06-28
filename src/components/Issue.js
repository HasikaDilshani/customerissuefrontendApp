import * as React from 'react';
//import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(5),
        },
    },
}));

export default function Issue() {
    const paperStyle={padding: '50px 20px',width:600,margin:'20px auto'}
    const createdDate = new Date().toISOString().split('T')[0]
    //const created_date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;


    const[customerId,setCustomerId]=React.useState('')
    const[description,setDescription]=React.useState('')
    const[type,setType]=React.useState('')
    //const[created_date]=React.useState(date)
    const[state]=React.useState('open')

    const[issues,setIssues]=React.useState([])

    const classes = useStyles();

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
    })
    }

    React.useState(()=>{
        fetch("http://localhost:8080/issue/getAll")
        .then(res=>res.json())
        .then((result)=>{
            setIssues(result);
        }
    )},[])

  return (
   <Container>
    <Paper elevation={3} style={paperStyle}>
        <h1>Add your Issue</h1>
    <form className={classes.root} noValidate autoComplete='off'>


        
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

       

        


  
 
        
        <Button variant="contained" onClick={handleClick}>Save</Button>


    </form>
    </Paper>

    <Paper elevation={3} style={paperStyle}>

        {issues.map(issue=>(
            <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}} key={issue.id}>
               Id:{issue.id} 
               Description:{issue.description}
               Type:{issue.type}
            </Paper>
        ))}
    </Paper>


   </Container>
    
    
  );
}
