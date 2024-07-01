import React, { Component } from "react";
import { Button, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

class AddTodo extends Component {
  constructor() {
    super();
    this.state = {
      content: "",
      date: "",
      due: null, // Add this line
    };
  }

  handleChange = (event) => {
    this.setState({
      content: event.target.value,
      date: Date().toLocaleString('en-US')
    });
  };

  handleDateChange = (date) => {
    this.setState({
      due: new Date(date).toLocaleDateString(),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.content.trim()) {
      this.props.addTodo(this.state);
      this.setState({
        content: "",
        date: "",
        due: null, // Reset due date to null
      });
    }
  };

  render() {
    return (
      <div>
        <TextField
          label="Add New Item"
          variant="outlined"
          onChange={this.handleChange}
          value={this.state.content}
          inputProps={{ "data-testid": "new-item-input" }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>         
          <DesktopDatePicker
            id="new-item-date"
            label="Due Date"
            value={this.state.due}
            onChange={this.handleDateChange}
            renderInput={(params) => <TextField {...params} />}
            inputProps={{ "data-testid": "new-item-date" }}
          />
        </LocalizationProvider>
        <Button
          style={{ marginLeft: "10px" }}
          onClick={this.handleSubmit}
          variant="contained"
          color="primary"
          data-testid="new-item-button"
        >
          Add
        </Button>
      </div>
    );
  }
}

export default AddTodo;
