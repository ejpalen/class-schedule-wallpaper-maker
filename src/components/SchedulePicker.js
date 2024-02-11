import deleteIcon from "../res/delete-icon.png";

const SchedulePicker = ({
  days,
  courseDay,
  setCourseDay,
  courseTime,
  setCourseTime,
  onEdit,
  id,
  onDelete,
}) => {
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
        <input
          type="text"
          className="timepicker-ui-input"
          value={courseTime}
          placeholder="Enter Course Time"
          onChange={(e) => {
            setCourseTime(e.target.value);
            onEdit(courseDay, e.target.value); // Pass both courseDay and time
          }}
        />
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
