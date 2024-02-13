import deleteIcon from "../res/delete-icon.png";

import moment from "moment";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

const SchedulePicker = ({
  days,
  courseDay,
  setCourseDay,
  courseTime,
  setCourseTime,
  onEdit,
  id,
  onDelete,
  courseTimeEnd,
  setCourseTimeEnd,
}) => {
  const format = "h:mm a";

  // Get the current time and format it
  const nowFormatted = moment().format(format);

  function onChange(value) {
    console.log(value && value.format(format));
    setCourseTime(value && value.format(format));
    onEdit(courseDay, value && value.format(format));
  }

  function onChangeTimeEnd(value) {
    console.log(value && value.format(format));
    setCourseTimeEnd(value && value.format(format)); // Set the timeEnd state
    onEdit(courseDay, courseTime, value && value.format(format)); // Pass both day, courseTime, and courseTimeEnd
  }

  return (
    <div className="schedule-picker">
      <div className="daypicker">
        <h4>Day</h4>
        <div className="days-container">
          {days.map((day) => (
            <p
              key={day}
              className={`${courseDay === day ? "active" : ""}`}
              onClick={() => {
                setCourseDay(day);
                onEdit(day, courseTime); // Pass both day and courseTime
              }}
            >
              {day}
            </p>
          ))}
        </div>
      </div>

      <div className="timepicker">
        <h4>Time</h4>
        <div className="timepicker-container">
          <div className="timepicker-wrapper">
            <h5>Start Time</h5>
            <TimePicker
              showSecond={false}
              defaultValue={moment(courseTime, format)} // Set default value to courseTime
              className="xxx"
              onChange={onChange}
              format={format}
              use12Hours
              minuteStep={15}
              inputReadOnly
            />
          </div>
          <div className="timepicker-wrapper">
            <h5>End Time</h5>
            <TimePicker
              showSecond={false}
              defaultValue={moment(courseTimeEnd, format)} // Set default value to courseTimeEnd
              className="xxx"
              onChange={onChangeTimeEnd}
              format={format}
              use12Hours
              minuteStep={15}
              inputReadOnly
            />
          </div>
        </div>
      </div>
      <button
        onClick={() => onDelete(id)}
        className="btn-secondary delete-schedule-btn"
      >
        <img src={deleteIcon} alt="Add" />
        <p>Remove Schedule</p>
      </button>
    </div>
  );
};

export default SchedulePicker;
