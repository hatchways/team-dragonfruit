import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import './select-language.css'

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)
    
  },
}));

const languages = ["Python", "NodeJS", "Java"]
const levels = [{name:"Beginner",value:0}, {name:"Intermediate",value:1},{name:"Advanced",value:2}]

const SelectLanguage = (props) => {
  const classes = useStyles();
  const [language, setLanguage] = React.useState('');
  const [level, setLevel] = React.useState('');
  const handleLangChange = (event) => {
    setLanguage(event.target.value);
    
  };
  const handleLevelChange = (event) => {
    setLevel(event.target.value);
    
  };
  const id = props.id
  const remove = () =>{
    //props.removeLang(i)
  }
  return (
    <div>
      <button id="btn" onClick={()=>remove}><i class='fas fa-minus'></i></button>
      <FormControl  id="form-control" className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native" >Language</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={language}
          onChange={handleLangChange}
          input={<BootstrapInput/>}
        >
          {languages.map(lang=>{
            return <option value={lang}>{lang}</option>
          })}
          
        </NativeSelect>
      </FormControl>

      <FormControl style={{marginLeft:"15%"}} id="form-control" className={classes.margin}>
        <InputLabel htmlFor="demo-customized-select-native" >Level</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={level}
          onChange={handleLevelChange}
          input={<BootstrapInput/>}
        >
          {levels.map(level=>{
            return <option value={level.value}>{level.name}</option>
          })}
          
        </NativeSelect>
      </FormControl>
    </div>
  );
}
export default SelectLanguage