import React, { useRef } from "react";

const DesktopCanvas = ({
  isDesktopVisible,
  desktopModel,
  isScheduleEven,
  days,
  courses,
  desktopModelLeft,
  desktopModelRight,
  SaveDesktopRef,
  className,
  subHeader,
  deviceType,
  DesktopRef,
  DesktopHeight,
  wallpaper,
  wallpaperType,
  solidColor,
  fontStyle,
  fontColor,
  desktopBorderRadius,
  containerSize,
  isServer,
  history,
  index,
  customImage,
  panelGeneral,
}) => {
  const desktopReference = useRef(null);

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
      className={`desktop-container ${
        deviceType === "Desktop" ? "desktop-visible" : "desktop-hidden"
      }`}
      style={{ fontFamily: `${fontStyle}, sans-serif`, color: fontColor }}
    >
      <div className="desktop-content-wrapper">
        <div
          id="desktop-model"
          className={`desktop-model ${isDesktopVisible ? "fadeIn" : ""}`}
          ref={desktopReference}
        >
          <img src={desktopModel} alt="" />
        </div>
        <div
          className={`desktop-canvas ${isScheduleEven ? "even" : "odd"}`}
          id="desktop-canvas"
          style={{
            width: "100%",
            height: DesktopHeight - 2,
            borderRadius: desktopBorderRadius,
          }}
          ref={DesktopRef}
        >
          <img
            src={desktopModelLeft}
            alt=""
            className="desktop-horizontal-space"
          />
          <div
            className="desktop-canvas-content-wrapper"
            style={{
              borderRadius: desktopBorderRadius,
              ...(wallpaperType !== "Generate-Mesh"
                ? dynamicStyle
                : isServer
                ? {}
                : history[index]),
            }}
            ref={SaveDesktopRef}
          >
            <div
              className="blur blur-enabled"
              style={{
                width: "100%",
                height: DesktopHeight - 2,
                borderRadius: desktopBorderRadius,
                backdropFilter: `blur(${customImage.blurValue}px)`,
                WebkitBackdropFilter: `blur(${customImage.blurValue}px)`,
                left: 0,
                bottom: 0,
              }}
            ></div>
            <div className="device-content">
              <div className="header">
                {className ? (
                  <h3
                    style={{
                      color: fontColor,
                      fontSize: `${containerSize.header}rem`,
                    }}
                  >
                    {className}
                  </h3>
                ) : null}
                {subHeader ? (
                  <p
                    style={{
                      color: fontColor,
                      fontSize: `${containerSize.subheader}rem`,
                    }}
                  >
                    {subHeader}
                  </p>
                ) : null}
              </div>
              <div className="desktop-canvas-content-container">
                {daysWithCourses.map(
                  (day) =>
                    sortedCourses[days.indexOf(day)].length > 0 && (
                      <div key={day} className="day">
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
                              marginBottom: 2.5,
                              fontSize: `${containerSize.h4 + 0.125}rem`,
                            }}
                          >
                            {day}
                          </h4>
                          <div className="day-schedule-container">
                            {sortedCourses[days.indexOf(day)].map((course) => (
                              <div key={course.id} className="schedule">
                                <h5
                                  style={{
                                    textTransform: "uppercase",
                                    fontSize: `${containerSize.h5}rem`,
                                  }}
                                >
                                  {course.code}
                                </h5>
                                {course.schedule
                                  .filter((schedule) => schedule.day === day)
                                  .map((schedule) => (
                                    <div key={schedule.id}>
                                      <p
                                        style={{
                                          fontSize: `${containerSize.p}rem`,
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
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
          <img
            src={desktopModelRight}
            alt=""
            className="desktop-horizontal-space"
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopCanvas;
