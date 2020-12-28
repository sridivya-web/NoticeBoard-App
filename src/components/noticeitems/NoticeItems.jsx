import React from 'react';
import './NoticeItems.css';
import { Component } from "react";
import { differenceInDays } from 'date-fns';
import BarGraph from '../bargraph/bargraph';

export default class NoticeItems extends Component {
    constructor(props) {
        super(props);  
        this.state ={
            list:[],
            time: new Date().toLocaleString()
        }  
         
    }

        componentDidMount(){
          this.intervalID = setInterval(
                () => this.updatedNotices(),
                1000
              );
        }
        componentWillUnmount() {
            clearInterval(this.intervalID);
          }

          updatedNotices = () => {
          const notices = this.props.listItems;
          const updatedNoticesItems = notices.filter(notice => {
            if (!notice.active) return false;
               
            const currentDateTime = new Date();
            const start = new Date(notice.startTime)
            const noticeHours = new Date(notice.startTime).getHours();
            const noticeMinutes = new Date(notice.startTime).getMinutes();
            
            console.log("notice start time",start);
            //console.log(noticeMinutes);
            const dateDiff = differenceInDays(currentDateTime, start);
            if (dateDiff !== 0) return false;
            //console.log("date diff is",dateDiff);
            const currentTimeSplit = currentDateTime.toTimeString().split(" ")[0].split(":");
            const currentTime = parseInt(currentTimeSplit[0]) * 60 * 60 + parseInt(currentTimeSplit[1]) * 60 + parseInt(currentTimeSplit[2]);
            //const givenTimeSplit = notice.noticeTime.split(":");
            const givenTime = noticeHours * 60 * 60 + noticeMinutes * 60;
            //console.log("current time",currentTime);
            //console.log("given time",givenTime);
            if (currentTime < givenTime || currentTime > (givenTime + parseInt(notice.duration))) return false;
            return true;
          }).map(notice => {
            if (parseInt(notice.duration) <= 60) return notice;
      
            const currentDateTime = new Date();
            const noticeHours = new Date(notice.startTime).getHours();
            const noticeMinutes = new Date(notice.startTime).getMinutes();
            const currentTimeSplit = currentDateTime.toTimeString().split(" ")[0].split(":");
            const currentTime = parseInt(currentTimeSplit[0]) * 60 * 60 + parseInt(currentTimeSplit[1]) * 60 + parseInt(currentTimeSplit[2]);
            //const givenTimeSplit = notice.noticeTime.split(":");
            const givenTime =noticeHours * 60 * 60 + noticeMinutes * 60 + parseInt(notice.duration);
            if ((givenTime - currentTime) < 60) notice.color = 'orange';
            return notice;
      
          });
           
          this.setState({
            list:updatedNoticesItems
          })
        
  
        }
         
       
   
      render() {
         
        var entries = this.state.list;
        var sorted = entries.reverse();

        //var listentries = sorted.map(this.refreshNotices);
        return (
          <div className="noticeItems">
            <div className='mainCard'>  
                {sorted.map((item,i) =>
                <div className="cards" key={i} style={{backgroundColor: `${item.color}`}}> 
                <div className="cardsText">{item.text}</div></div>)}      
            </div>
            <div className="Section">
            <BarGraph totalCount={this.props.count} activeCount={this.state.list.length} />
            </div>
    </div>
           
           
        )
    }

}