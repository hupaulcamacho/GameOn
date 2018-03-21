import React, { Component } from "react";
import axios from "axios";

class Upcoming extends Component {
  state = {
    event: [
      {
        host: "Ozuna",
        host_img:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF",
        date: "01/08/2018",
        time: '12:00pm',
        location: "HighLand Park Court, Brooklyn, NY",
        sport: "basketball"
      },
      {
        host: "Daddy Yankee",
        host_img:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF",
        date: "01/08/2018",
        time: '12:00pm',
        location: "HighLand Park Court, Brooklyn, NY",
        sport: "baseball"
      },
      {
        host: "Bad Bunny",
        host_img:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF",
        date: "01/08/2018",
        time: '12:00pm',
        location: "HighLand Park Court, Brooklyn, NY",
        sport: "handball"
      },
      {
        host: "Romeo",
        host_img:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF",
        date: "01/08/2018",
        time: '12:00pm',
        location: "HighLand Park Court, Brooklyn, NY",
        sport: "tennis"
      },
      {
        host: "Ozuna",
        host_img:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF",
        date: "01/08/2018",
        time: '12:00pm',
        location: "HighLand Park Court, Brooklyn, NY",
        sport: "basketball"
      },
      {
        host: "Daddy Yankee",
        host_img:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF",
        date: "01/08/2018",
        time: '12:00pm',
        location: "HighLand Park Court, Brooklyn, NY",
        sport: "baseball"
      },
      {
        host: "Bad Bunny",
        host_img:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF",
        date: "01/08/2018",
        time: '12:00pm',
        location: "HighLand Park Court, Brooklyn, NY",
        sport: "handball"
      },
      {
        host: "Romeo",
        host_img:
          "https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/26165178_168201540458708_1782741453897924448_n.jpg?_nc_cat=0&oh=bc42debdb113335eea9ec91827ac4f27&oe=5B4AA9EF",
        date: "01/08/2018",
        time: '12:00pm',
        location: "HighLand Park Court, Brooklyn, NY",
        sport: "tennis"
      }
    ]
  };
  render() {
    const { event } = this.state;
    console.log(event);
    return (
      <div id="event_container">
        {event.map(e => {
          return (
            <div className="individual_event">
              <img className="host_img" src={e.host_img} width={"50px"} />
              <span className="host_Name">{e.host}</span>
              <div className="event_descriptions">
                <span className="event_date">Date: {e.date}</span>
                <br />
                <span className="event_time">Time: {e.time}</span>
                <br />
                <span className="event_location">Location: {e.location}</span>
                <br />
                <span>Sport: {e.sport}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Upcoming;
