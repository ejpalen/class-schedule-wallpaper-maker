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

  function onChange(value) {
    const formattedValue = value ? value.format(format) : null;
    console.log(formattedValue);
    setCourseTime(formattedValue);
    onEdit(courseDay, formattedValue);
  }

  function onChangeTimeEnd(value) {
    const formattedValue = value ? value.format(format) : null;
    console.log(formattedValue);
    setCourseTimeEnd(formattedValue);
    onEdit(courseDay, courseTime, formattedValue);
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
                onEdit(day, courseTime);
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
              defaultValue={courseTime ? moment(courseTime, format) : null}
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
              defaultValue={
                courseTimeEnd ? moment(courseTimeEnd, format) : null
              }
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
