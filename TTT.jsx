import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import './TTT.css'

function TTT() {
  const [timetableData, setTimetableData] = useState(() => {
    const savedData = localStorage.getItem('timetableData');
    return savedData ? JSON.parse(savedData) : [];
  });
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleString());

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentDate(new Date().toLocaleString());
      checkNotifications();
    }, 1000);

    return () => clearInterval(intervalID);
  }, []);

  useEffect(() => {
    localStorage.setItem('timetableData', JSON.stringify(timetableData));
  }, [timetableData]);

  const handleAddData = (newData) => {
    setTimetableData([...timetableData, newData]);
  };

  const handleDeleteData = (index) => {
    const updatedData = [...timetableData];
    updatedData.splice(index, 1);
    setTimetableData(updatedData);
  };

  const handleEditData = (index, newData) => {
    const updatedData = [...timetableData];
    updatedData[index] = newData;
    setTimetableData(updatedData);
  };

  const checkNotifications = () => {
    timetableData.forEach((data) => {
      const startTime = new Date(data.startTime);
      const currentTime = new Date();

      if (startTime - currentTime > 0 && startTime - currentTime <= 5 * 60 * 1000) {
        sendNotification(data);
      }
    });
  };

  const sendNotification = (data) => {
    const title = 'Reminder';
    const options = {
      body: `Timings: ${data.startTime} - ${data.endTime}\nSubject: ${data.subject}\nRoom: ${data.room}`,
      icon: 'path_to_icon.png'
    };
  
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification(title, options);
        } else {
          console.log('Notification permission denied.');
        }
      }).catch((error) => {
        console.error('Error requesting notification permission:', error);
      });
    } else {
      console.error('This browser does not support desktop notification');
    }
  };

  const handleDayClick = (index) => {
    setSelectedDayIndex(index);
  };

  return (
    <div className="content">
      <div className="main-content">
        <div className="container">
          <center><WeekdaysContainer onDayClick={handleDayClick} /></center>
          <Timetable
            data={timetableData}
            selectedDayIndex={selectedDayIndex}
            onDeleteData={handleDeleteData}
            onEditData={handleEditData}
          />
          <Form onAddData={handleAddData} />
        </div>
      </div>
    </div>
  );
}

function WeekdaysContainer({ onDayClick }) {
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <center>
      <div className="weekdays-container">
        {weekdays.map((day, index) => (
          <button key={index} className="weekday" onClick={() => onDayClick(index)}>
            {day}
          </button>
        ))}
      </div>
    </center>
  );
}

function Timetable({ data, selectedDayIndex, onDeleteData, onEditData }) {
  const selectedDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][selectedDayIndex];
  let filteredData = data.filter(item => item.day === selectedDay);

  filteredData.sort((a, b) => {
    const timeA = new Date(`2024-04-21T${a.startTime}`);
    const timeB = new Date(`2024-04-21T${b.startTime}`);
    return timeA - timeB;
  });
  
  const handleDelete = (index) => {
    onDeleteData(index);
  };

  return (
    <div className="timetable-container">
      <center><h2>Current Date & Time: {new Date().toLocaleString()}</h2></center>
      <left>
        <table className="timetable">
          <thead>
            <tr>
              <th>Timings</th>
              {filteredData.map((row, index) => (
                <th key={index}>{row.startTime} - {row.endTime}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Subject</td>
              {filteredData.map((row, index) => (
                <td key={index}>{row.subject}</td>
              ))}
            </tr>
            <tr>
              <td>Room Number</td>
              {filteredData.map((row, index) => (
                <td key={index}>{row.room}</td>
              ))}
            </tr>
            <tr>
              <td>Delete</td>
              {filteredData.map((row, index) => (
                <td key={index}>
                  <button onClick={() => handleDelete(index)} className='delete-button'>
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </left>
    </div>
  );
}

function Form({ onAddData }) {
  const [formData, setFormData] = useState({
    day: '',
    subject: '',
    startTime: '',
    endTime: '',
    room: ''
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = () => {
    const { day, subject, startTime, endTime, room } = formData;
    if (day && subject && startTime && endTime && room) {
      onAddData(formData);
      setFormData({
        day: '',
        subject: '',
        startTime: '',
        endTime: '',
        room: ''
      });
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input_container">
          <div className="row">
            <div className="input-wrapper">
              <label htmlFor="day">
                <i className="fa-solid fa-calendar-days" style={{ fontSize: '1.5em' }}></i> Day:
              </label>
              <select id="day" onChange={handleInputChange} value={formData.day} className='input-field'>
                <option value="">Select Day</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
              </select>
            </div>
            <div className="input-wrapper">
              <label htmlFor="subject"><i className="fa-solid fa-book" style={{ fontSize: '1.5em' }}></i> Subject:</label>
              <input type="text" id="subject" onChange={handleInputChange} value={formData.subject} className='input-field' />
            </div>
          </div>
         <div className="wwrr">
         <div className="row">
            <div className="input-wrapper">
              <label htmlFor="startTime"><i className="fa-solid fa-clock" style={{ fontSize: '1.5em' }}></i> Start Time:</label>
              <input type="time" id="startTime" onChange={handleInputChange} value={formData.startTime} className='input-field' />
            </div>
            <div className="input-wrapper">
              <label htmlFor="endTime"><i className="fa-solid fa-clock" style={{ fontSize: '1.5em' }}></i> End Time:</label>
              <input type="time" id="endTime" onChange={handleInputChange} value={formData.endTime} className='input-field' />
            </div>
          </div>
          <div className="row">
            <div className="input-wrapper">
              <label htmlFor="room"><i className="fa-solid fa-person-chalkboard" style={{ fontSize: '1.5em' }}></i> Room No:</label>
              <input type="text" id="room" onChange={handleInputChange} value={formData.room} className='input-field' />
            </div>
          </div>
         </div>
        </div>
        <br />
        <center><button type="submit">Add</button></center>
      </form>
    </div>
  );
}


export default TTT;

