import React from "react";
import moment from "moment";

const PhoneCanvas = ({
  isPhoneVisible,
  phoneModel,
  isScheduleEven,
  phoneWidth,
  borderRadius,
  days,
  courses,
  SaveMobileRef,
  className,
  subHeader,
  deviceType,
  wallpaper,
  wallpaperType,
  solidColor,
  fontStyle,
  fontColor,
  isServer,
  history,
  index,
  containerSize,
  phoneHeight,
  customImage,
  panelGeneral,
}) => {
  let backgroundStyle;
  if (wallpaperType === "Mesh") {
    backgroundStyle = { backgroundImage: `url(${wallpaper})` };
  } else if (wallpaperType === "Solid") {
    backgroundStyle = { backgroundColor: solidColor };
  } else {
    backgroundStyle = { backgroundImage: `url(${customImage.image})` };
  }

  let dynamicStyle;
  dynamicStyle = {
    ...backgroundStyle,
  };

  //sorting function for schedule array
  const sortScheduleByTime = (a, b) => {
    const timeRegex = /(\d+):(\d+) ([APMapm]{2})/;
    const [, hourA, minuteA, periodA] = a.match(timeRegex);
    const [, hourB, minuteB, periodB] = b.match(timeRegex);

    // Convert hours and minutes to integers
    const hourIntA = parseInt(hourA, 10);
    const hourIntB = parseInt(hourB, 10);
    const minuteIntA = parseInt(minuteA, 10);
    const minuteIntB = parseInt(minuteB, 10);

    // Convert 12-hour format to 24-hour format for comparison
    const timeAinMinutes =
      (hourIntA === 12 ? 0 : hourIntA * 60) +
      (periodA.toLowerCase() === "pm" ? 720 : 0) +
      minuteIntA;
    const timeBinMinutes =
      (hourIntB === 12 ? 0 : hourIntB * 60) +
      (periodB.toLowerCase() === "pm" ? 720 : 0) +
      minuteIntB;

    return timeAinMinutes - timeBinMinutes;
  };

  // Filter out courses with no schedules
  const filteredCourses = courses.filter(
    (course) => course.schedule && course.schedule.length > 0
  );

  // Sort courses by the earliest schedule time on each day
  const sortedCourses = days.map((day) => {
    const coursesOnDay = filteredCourses.filter((course) =>
      course.schedule.some((schedule) => schedule.day === day)
    );

    // Sort courses on the current day by the earliest schedule time
    const sortedCoursesOnDay = coursesOnDay.sort((a, b) => {
      const earliestTimeA = a.schedule
        .filter((schedule) => schedule.day === day)
        .map((schedule) => schedule.time)
        .sort(sortScheduleByTime)[0];
      const earliestTimeB = b.schedule
        .filter((schedule) => schedule.day === day)
        .map((schedule) => schedule.time)
        .sort(sortScheduleByTime)[0];
      return sortScheduleByTime(earliestTimeA, earliestTimeB);
    });

    return sortedCoursesOnDay;
  });

  // Filter out the days without any courses scheduled
  const daysWithCourses = days.filter((day) =>
    sortedCourses.some((coursesOnDay) =>
      coursesOnDay.some((course) =>
        course.schedule.some((schedule) => schedule.day === day)
      )
    )
  );

  return (
    <div
      className={`phone-container ${
        deviceType === "Phone" ? "phone-visible2 phone-visible" : "phone-hidden"
      }`}
      style={{ fontFamily: `${fontStyle}, sans-serif`, color: fontColor }}
    >
      <div className="content-wrapper">
        <div
          id="phone-model"
          className={`phone-model ${isPhoneVisible ? "fadeIn" : ""}`}
        >
          <img src={phoneModel} alt="" />
        </div>
        <div
          id="phone-canvas"
          ref={SaveMobileRef}
          className={`canvas ${isScheduleEven ? "even" : "odd"}`}
          style={{
            width: phoneWidth - 16,
            height: phoneHeight - 16,
            borderRadius: borderRadius,
            ...(wallpaperType !== "Generate-Mesh"
              ? dynamicStyle
              : isServer
              ? {}
              : history[index]),
          }}
        >
          <div
            className="blur blur-enabled"
            style={{
              width: phoneWidth - 16,
              height: "100%",
              borderRadius: borderRadius,
              backdropFilter: `blur(${customImage.blurValue}px)`,
              WebkitBackdropFilter: `blur(${customImage.blurValue}px)`,
            }}
          ></div>
          <div className="device-content">
            <div className="header">
              {className ? (
                <h3
                  style={{
                    color: fontColor,
                    fontSize:
                      window.innerWidth > 800
                        ? `${containerSize.header}rem`
                        : `${containerSize.header - 0.125}rem`,
                  }}
                >
                  {className}
                </h3>
              ) : null}
              {subHeader ? (
                <p
                  style={{
                    color: fontColor,
                    fontSize:
                      window.innerWidth > 800
                        ? `${containerSize.subheader}rem`
                        : `${containerSize.subheader - 0.125}rem`,
                  }}
                >
                  {subHeader}
                </p>
              ) : null}
            </div>
            <div
              className={`canvas-content-wrapper ${
                panelGeneral.borderStyle === "Collapse" ? "collapse" : ""
              }`}
            >
              {daysWithCourses.map((day, dayIndex) => (
                <div key={dayIndex} className="day">
                  <div
                    className="day-container"
                    style={{
                      background: `hsla(${panelGeneral.background[0]},${
                        panelGeneral.background[1]
                      }%,${panelGeneral.background[2]}%, .${
                        panelGeneral.opacity < 10
                          ? `0${panelGeneral.opacity}`
                          : panelGeneral.opacity
                      })`,
                      backdropFilter: `blur(${panelGeneral.blurValue}px)`,
                      WebkitBackdropFilter: `blur(${panelGeneral.blurValue}px)`,
                      borderRadius: `${panelGeneral.cornerRadius}px`,
                      borderColor: `hsla(${panelGeneral.background[0]},${panelGeneral.background[1]}%,${panelGeneral.background[2]}%, 1)`,
                    }}
                  >
                    <h4
                      style={{
                        fontSize:
                          window.innerWidth > 800
                            ? `${containerSize.h4}rem`
                            : `${containerSize.h4 - 0.125}rem`,
                      }}
                    >
                      {day}
                    </h4>
                    {sortedCourses[days.indexOf(day)].map((course) => (
                      <div
                        key={course.id}
                        className=""
                        style={{ marginTop: 2.5 }}
                      >
                        <h5
                          style={{
                            textTransform: "uppercase",
                            fontSize:
                              window.innerWidth > 800
                                ? `${containerSize.h5}rem`
                                : `${containerSize.h5 - 0.125}rem`,
                          }}
                        >
                          {course.code || "Unknown Code"}
                        </h5>
                        {course.schedule
                          .filter((schedule) => schedule.day === day)
                          .map((schedule, scheduleIndex) => (
                            <div key={scheduleIndex}>
                              <p
                                style={{
                                  fontSize:
                                    window.innerWidth > 800
                                      ? `${containerSize.p}rem`
                                      : `${containerSize.p - 0.125}rem`,
                                }}
                              >
                                {schedule.time} - {schedule.timeEnd}
                              </p>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneCanvas;
