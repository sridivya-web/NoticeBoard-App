import React from 'react';
import './Notices.css';
import { Component } from "react";
import NoticeItems from '../noticeitems/NoticeItems';
import TextField from '@material-ui/core/TextField';
import { CSVLink, CSVDownload } from "react-csv";



export default class Notices extends Component {

    constructor() {
        super();
        /* Declaring State Variables */
        this.state = {
            val: '',
            list: [],
            flag: false,
            startTime: '',
            duration: '',
            csvData: [],
            count:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        //this.csvData = ["Notice", "Notice Key", "Notice Start Time", "Notice Duration","Notice Status"];
        //this.tempArray = [this.csvData];
    }
    //Getting the Notices Value
    handleChange = (event) => {
        this.setState({
            val: event.target.value
        });
    }
    //Getting the Start Time for notices
    handleDateChange = (event) => {   
        this.setState({
            startTime: event.target.value
        });
       
    };
    //Getting the duration or notices

    handleDurationChange = (event) => {
        console.log('Duration value is', event.target.value);
        this.setState({
            duration: event.target.value
        });
       
    };
    /* The handlesubmit is being called on form submit
       To Add Notices */

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.val !== "") {
            var systemTime = new Date().getTime();
            const noticeStartTime = new Date(this.state.startTime).getTime();
            var toDoListArr = {
                text: this.state.val,
                key: Date.now(),
                startTime: this.state.startTime,    
                duration: this.state.duration,
                active:true,
                color:'green'
            };
            const newItems = [...this.state.list, toDoListArr];
            var listCount=0;
              listCount = (listCount + 1);       
            const millis = ((noticeStartTime - systemTime));    
            // console.log(`seconds elapsed = ${Math.floor(millis / 1000)}`);           
            setTimeout(() => {
                this.setState({
                    list: newItems,
                    count:listCount   
                });
            },0);   
            //console.log("count is",this.state.count);
            /* Writing file data into csv*/
               
             let csvRow = this.state.list.map((n) =>({  
                Notice: n.text,
                NoticeKey:n.key,
                NoticeStartTime:n.startTime,
                NoticeDurartion:n.duration,
                NoticeStatus:n.active
              })); 
           
                this.setState({
                    csvData: csvRow
                });
                //console.log("csvData", this.state.csvData);

                }
                else { console.log("Please Enter The task"); }

                this.setState({
                    val: '',
                    startTime: '',
                    duration: ''
                });  
       }
    
   
    render() {
        return (
            <div className="main">
                <h1>Notice Board</h1>
                <div className='notices'>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.val} onChange={this.handleChange} placeholder="Enter Your Notices" />
                        <TextField
                            id="datetime-local"
                            type="datetime-local"
                            value={this.state.startTime}
                            onChange={this.handleDateChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                         />
                        <input type="num" value={this.state.duration} onChange={this.handleDurationChange} placeholder="Enter Duration" />
                        <button> Add Notices</button>

                    </form>
                    <CSVLink data={this.state.csvData} separator={","}><button>Download</button></CSVLink>
                </div>
                <NoticeItems listItems={this.state.list} count={this.state.count} delete={this.deleteItem} />
             
            </div>
        )
    }

}