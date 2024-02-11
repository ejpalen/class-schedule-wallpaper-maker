import React, { useLayoutEffect, useState, useRef, useEffect } from "react";

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
              <div className="desktop-canvas-content-container">
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
                          <h4
                            style={{
                              marginBottom: 2.5,
                              fontSize: containerSize.h4 + 0.125,
                            }}
                          >
                            {day}
                          </h4>
                          <div className="day-schedule-container">
                            {courses
                              .filter((course) =>
                                course.schedule.some(
                                  (schedule) => schedule.day === day
                                )
                              )
                              .map((course) => (
                                <div key={course.id} className="schedule">
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
                                        <p
                                          style={{ fontSize: containerSize.p }}
                                        >
                                          {schedule.time}
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
