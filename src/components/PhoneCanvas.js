import React from "react";

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
                  style={{ color: fontColor, fontSize: containerSize.header }}
                >
                  {className}
                </h3>
              ) : null}
              {subHeader ? (
                <p
                  style={{
                    color: fontColor,
                    fontSize: containerSize.subheader,
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
              {days.map(
                (day) =>
                  courses.some((course) =>
                    course.schedule.some((schedule) => schedule.day === day)
                  ) && (
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
                        <h4 style={{ fontSize: containerSize.h4 }}>{day}</h4>
                        {courses
                          .filter((course) =>
                            course.schedule.some(
                              (schedule) => schedule.day === day
                            )
                          )
                          .map((course) => (
                            <div
                              key={course.id}
                              className=""
                              style={{ marginTop: 2.5 }}
                            >
                              <h5
                                style={{
                                  textTransform: "uppercase",
                                  fontSize: containerSize.h5,
                                }}
                              >
                                {course.code}
                              </h5>
                              {course.schedule
                                .filter((schedule) => schedule.day === day)
                                .map((schedule) => (
                                  <div key={schedule.id}>
                                    <p style={{ fontSize: containerSize.p }}>
                                      {schedule.time}
                                    </p>
                                  </div>
                                ))}
                            </div>
                          ))}
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneCanvas;
