import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(70),
    marginRight: theme.spacing(1),
    width: 220,
   
  },
}));

export default function DateAndTime(props) {
  const classes = useStyles();
 
  const [selectedDate, setSelectedDate] = React.useState(props.value);

  const handleDateChange = (date) => {
   
    setSelectedDate(date);
    console.log("date is ",selectedDate)
    
  };

  return (
    <div className={classes.container}   noValidate>
      <TextField
         id="time"
         label="Alarm clock"
         type="time"
         defaultValue="07:30"
        value={selectedDate} 
        onChange={handleDateChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );
}
