import React from "react";
import axios from "axios";
import moment from 'moment';
import InputMoment from 'input-moment';

import Events from "./CreatedEvent";

// const Form = () => {

// }

export default class Event extends React.Component {
  constructor() {
    super();

    this.state = {
      Name: "",
      m: moment(),
      imgScr: null,
      sportIDs: '',
      Address: "",
      DateInfo: null,
      startTime: null,
      endTime: null,
      Description: "",
      sport: null,
      lat: null,
      long: null,
      submit: false,
      event_id: null,
      players: '',
      sports: []
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleMoment = m => {
    this.setState({ m })
  }

  handleSelect = e => {
    console.log('what i am selecting', e.target.value)
    this.setState({
      sport_id: e.target.value
    });
  };
  // handleImage = e => {
  //   console.log(URL);
  //   console.log("what we are passing", e.target.value);
  //   //   this.setState({
  //   //       imgScr: URL.createObjectURL(e.target.result)
  //   //   })
  // };

  handleSubmit = (e) => {
    e.preventDefault()
      const {Name, Address, DateInfo, startTime,imgScr, endTime, Description, sport_id, lat, long} = this.state

      axios.post('/event/add',
      {name:Name,
      lat:40.755603,
      long:-73.984931,
      location:Address,
      start_ts: new Date(DateInfo+ ' ' + startTime).getTime(),
      end_ts: new Date(DateInfo+ ' ' + startTime).getTime(),
      description:Description,
      sport_id:sport_id,
      event_pic:imgScr
   })
   .then(res => {
    this.setState({
     submit:true,
     players:res.data.event.players_usernames,
     event_id:res.data.event.id
   })
   })
  //  .then(this.setState({
  //     Name: '',
  //     Address: '',
  //     DateInfo: null,
  //     startTime: null,
  //     endTime: null,
  //     Description: '',
  //     sport_id:'',
  //     event_pic:'',
  //     submit:true
  //  }))
  }

  componentDidMount() {
    //will get the user's sports names
    axios.get("/user/sports").then(res => {
      console.log(res.data)
      const names = res.data.sports.map(sport => sport.name)
      const id = res.data.sports.map(sport => sport.id)
      this.setState({
        sports: names,
        sportIDs: id
      });
    });
  }

  form = () => {
    const {
      Name,
      Address,
      imgScr,
      DateInfo,
      startTime,
      endTime,
      Description,
      sports
    } = this.state;
    return (
      <div>
        <h1>Create An Event</h1>

        <form onSubmit={this.handleSubmit}>
        {<input
          type='text'
          name= 'text'
          value= {imgScr}
          onChange={this.handleChange}
          />}

          <input
            type="text"
            name="Name"
            value={Name}
            placeholder="Event name"
            onInput={this.handleChange}
          />

          <input
            type="text"
            name="Address"
            value={Address}
            placeholder="Address"
            onInput={this.handleChange}
          />

          <input
            type="text"
            name="DateInfo"
            value={DateInfo}
            placeholder="Date"
            onInput={this.handleChange}
          />

          <input
            type="time"
            name="startTime"
            value={startTime}
            placeholder="Start"
            onInput={this.handleChange}
          />

          <input
            type="time"
            name="endTime"
            value={endTime}
            placeholder="End"
            onInput={this.handleChange}
          />

          <select onChange={this.handleSelect}>
            {["", ...sports].map((sport, idx) => (
              <option key={idx} value={sport? this.state.sportIDs[idx-1] : ''}>
                {sport}
              </option>
            ))}
          </select>

          <input
            type="textarea"
            name="Description"
            value={Description}
            placeholder="Description"
            onInput={this.handleChange}
          />

          <input type="submit" value="Create event" />
        </form>
      </div>
    );
  };
  render() {
    const { submit, sports } = this.state;
    
    const {
      Name,
      Address,
      imgScr,
      DateInfo,
      startTime,
      endTime,
      Description,
      sport_id,
      sportIDs,
      players,
      event_id
    } = this.state;

    const sport = sports[sportIDs.indexOf(Number(sport_id))]

    const event = {
      sport: sport,
      Name: Name,
      date: DateInfo,
      img: imgScr,
      Address: Address,
      date: DateInfo,
      start: startTime,
      end: endTime,
      description: Description,
      players:players,
      event_id: event_id
    };

    console.log(event)
    return <div>{submit ? <Events event={event} /> : this.form()}</div>;
  }
}

// {
//   <input
//     type="file"
//     name="imgScr"
//     accept="image/*"
//     onChange={this.handleImage}
//   />;
// }

