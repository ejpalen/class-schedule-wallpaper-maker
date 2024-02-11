import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import PhoneCanvas from "./components/PhoneCanvas";
import DesktopCanvas from "./components/DesktopCanvas";
import SchedulePicker from "./components/SchedulePicker";

import { useCourseState } from "./utils";
import { ImageImports } from "./utils/ImageImports";

import { db } from "./firebaseConfig";
import { addDoc, collection, getDoc, doc } from "firebase/firestore";

import gsap from "gsap";
import useResizeObserver from "@react-hook/resize-observer";
import QRCode from "react-qr-code";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { generateJSXMeshGradient } from "meshgrad";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Modal from "react-modal";
import ColorPicker from "react-pick-color";

import customImageDefault from "./res/custom-image-default.jpg";
import EditIcon from "./res/edit-icon.png";
import ShareIcon from "./res/share-icon.png";
import customizeIcon2 from "./res/customize-icon-2.png";
import rightArrowIcon from "./res/arrow-right-icon.png";
import leftArrowIcon from "./res/arrow-left-icon.png";

const ELEMENTS = 6;

var hexToHsl = require("hex-to-hsl");

function useSize(target) {
  const [size, setSize] = React.useState();

  React.useLayoutEffect(() => {
    target && setSize(target.getBoundingClientRect());
  }, [target]);

  // Where the magic happens
  useResizeObserver(target, (entry) => setSize(entry.contentRect));
  return size;
}

const App = () => {
  if (navigator.userAgent.indexOf("iPhone") > -1) {
    document
      .querySelector("[name=viewport]")
      .setAttribute(
        "content",
        "width=device-width, initial-scale=1, maximum-scale=1"
      );
  }

  const {
    days,
    isServer,
    setIsServer,
    history,
    setHistory,
    index,
    setIndex,
    linkActive,
    setLinkActive,
    isLinkReady,
    setIsLinkReady,
    copy,
    setCopy,
    link,
    setLink,
    linkID,
    setLinkID,
    isSettingsOpen,
    setIsSettingsOpen,
    meshWallpaper,
    solidColors,
    fontStyles,
    fontColors,
    fontStyle,
    setFontStyle,
    fontColor,
    setFontColor,
    containerSize,
    setContainerSize,
    wallpaperType,
    setWallpaperType,
    wallpaper,
    setWallpaper,
    solidColor,
    setSolidColor,
    customImage,
    setCustomImage,
    panelGeneral,
    setPanelGeneral,
    handleUpload,
    isMeshGradientTabActive,
    setIsMeshGradientsTabActive,
    isSolidTabActive,
    setIsSolidTabActive,
    isfontStyleTabActive,
    setIsfontStyleTabActive,
    isfontColorTabActive,
    setIsfontColorTabActive,
    isCustomImageTabActive,
    setIsCustomImageTabActive,
    isGeneralTabActive,
    setIsGeneralTabActive,
    isPanelGeneralTabActive,
    setIsPanelGeneralTabActive,
    isPanelBorderTabActive,
    setIsPanelBorderTabActive,
    isResetTabActive,
    setIsResetTabActive,
    className,
    setClassName,
    subHeader,
    setSubHeader,
    SaveMobileRef,
    SaveDesktopRef,
    courses,
    setCourses,
    isScheduleEven,
    setIsScheduleEven,
    deviceType,
    setDeviceType,
    setIsOpen,
    modalIsOpen,
    DesktopHeight,
    setDesktopHeight,
    settingsOpenHandler,
    saveMobileWallpaper,
    saveDesktopWallpaper,
    addNewCourse,
    handleEditSchedule,
    deleteSchedule,
    addNewSchedule,
    deleteCourse,
    modalStyles,
  } = useCourseState();

  const {
    bg1,
    bg2,
    addIcon,
    arrowDownIcon,
    customizeIcon,
    deleteIcon,
    downloadIcon,
    downloadIcon2,
    closeIcon,
    closeIcon2,
    generateIcon,
    uploadIcon,
    imageIcon,
    CustomImageIcon,
    phoneIcon,
    desktopIcon,
    phoneModel,
    desktopModel,
    desktopModelLeft,
    desktopModelRight,
    FontIcon,
    ColorIcon,
    MeshIcon,
    SolidIcon,
    generalIcon,
    BackgroundIcon,
    BorderIcon,
    WindowIcon,
    CollapseIcon,
    CopyIcon,
    CopiedIcon,
    ResetIcon,
  } = ImageImports();

  const ref = useRef(null);

  const [target, setTarget] = React.useState();
  const size = useSize(target);

  const [error, setError] = useState(false);

  const [phoneHeight, setPhoneHeight] = useState(0);
  const [phoneWidth, setPhoneWidth] = useState(0);
  const [borderRadius, setBorderRadius] = useState(0);
  const [desktopBorderRadius, setDesktopBorderRadius] = useState(0);
  const [modalActive, setModalActive] = useState(false);

  const [isWriteTabOpen, setIsWriteTabOpen] = useState(false);

  const WriteOpenHandler = () => {
    setIsWriteTabOpen(!isWriteTabOpen);
  };

  function openModal() {
    setIsOpen(true);
    setModalActive(true);
    document.body.classList.add("link-active");
  }

  function openLinkModal() {
    setLinkActive(true);
    setError(false);
    setModalActive(true);
    document.body.classList.add("link-active");
  }

  function closeLinkModal() {
    setLinkActive(false);
    setModalActive(false);
    document.body.classList.remove("link-active");
  }

  function closeModal() {
    setIsOpen(false);
    setModalActive(false);
    document.body.classList.remove("link-active");
  }

  const phoneElement = document.getElementById("phone-model");
  const desktopElement = document.getElementById("desktop-model");

  function updateDimensions() {
    if (phoneElement) {
      const width = phoneElement.clientWidth;
      setPhoneWidth(width);
      const height = phoneElement.clientHeight;
      setPhoneHeight(height);
      setBorderRadius(Math.min(width / 7, 140));
    }
    if (desktopElement) {
      const width = desktopElement.clientWidth;
      const height = desktopElement.clientHeight;
      setDesktopHeight(height);
      setDesktopBorderRadius(Math.min(width / 15, 140));
    }
  }

  useEffect(() => {
    updateDimensions();

    gsap.fromTo(
      ".phone-visible",
      { transition: "none" },
      {
        delay: 3,
        transition: "all ease-in-out 0.2s",
      }
    );

    gsap.fromTo(
      [".phone-container", ".blur"],
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        delay: window.innerWidth > 800 ? 2 : 1,
        ease: "power4.out",
      }
    );

    var controls = document.getElementsByClassName("controls-wrapper");
    var controlsArr = Array.from(controls);

    controlsArr.forEach(function (box) {
      gsap.fromTo(
        box.querySelectorAll(".fadeUpControls"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "power4.out",
          stagger: 0.3,
          delay: window.innerWidth > 800 ? 2.5 : 1.2,
        }
      );
    });

    gsap.fromTo(
      "#customize-btn",
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        delay: 4,
        ease: "power4.out",
      }
    );

    var boxes = document.getElementsByClassName("class-schedule-container");
    var boxesArr = Array.from(boxes);

    boxesArr.forEach(function (box) {
      gsap.fromTo(
        box.querySelectorAll(".fadeUp"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "power4.out",
          stagger: 0.3,
        }
      );
    });
  }, []);

  useEffect(() => {
    updateDimensions();
  }, [size]);

  const handleNewGradient = () => {
    setIndex(history.length);
    setHistory([...history, generateJSXMeshGradient(ELEMENTS)]);
  };

  useEffect(() => {
    setIsServer(false);
  }, []);

  const handleShareLink = async () => {
    const classData = {
      courses: courses,
      className: className,
      subHeader: subHeader,
      isServer: isServer,
      history: history,
      index: index,
      fontStyle: fontStyle,
      fontColor: fontColor,
      containerSize: containerSize,
      wallpaperType: wallpaperType,
      wallpaper: wallpaper,
      solidColor: solidColor,
      customImage: customImage,
      panelGeneral: panelGeneral,
    };

    try {
      const docRef = await addDoc(collection(db, "links"), classData);
      console.log("Document written with ID: ", docRef.id);
      const url = `${window.location.origin}${window.location.pathname}?linkId=${docRef.id}`;
      setLink(url);
      setLinkID(docRef.id);
      setIsLinkReady(true);
      window.history.replaceState(null, "", url);
    } catch (error) {
      console.error("Error adding document: ", error);
      setIsLinkReady(false);
      setError(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const linkId = urlParams.get("linkId");

      if (linkId) {
        try {
          const docRef = await getDoc(doc(db, "links", linkId));
          if (docRef.exists()) {
            setLink(linkId);

            setClassName(docRef.data().className);
            setCourses(docRef.data().courses);
            setSubHeader(docRef.data().subHeader);
            setIsServer(docRef.data().isServer);
            setHistory(docRef.data().history);
            setIndex(docRef.data().index);
            setFontStyle(docRef.data().fontStyle);
            setFontColor(docRef.data().fontColor);
            setContainerSize(docRef.data().containerSize);
            setWallpaperType(docRef.data().wallpaperType);
            setWallpaper(docRef.data().wallpaper);
            setSolidColor(docRef.data().solidColor);
            setCustomImage(docRef.data().customImage);
            setPanelGeneral(docRef.data().panelGeneral);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error retrieving document:", error);
        }
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    copy && setTimeout(() => setCopy(false), 2000);
  }, [copy]);

  return (
    <div
      className={`App ${isSettingsOpen ? "settings-active" : "hello"}  ${
        modalActive ? "link-active" : ""
      } ${isWriteTabOpen ? "writeTabOpen" : ""}`}
    >
      <div className="wrapper" style={{ backgroundImage: `url(${bg2})` }}>
        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-body download-wallpaper-modal">
            <div
              className="modal-top"
              onClick={() => {
                closeModal();
              }}
            ></div>
            <PhoneCanvas
              SaveMobileRef={SaveMobileRef}
              phoneModel={phoneModel}
              isScheduleEven={isScheduleEven}
              phoneWidth={phoneWidth}
              borderRadius={borderRadius}
              days={days}
              courses={courses}
              className={className}
              subHeader={subHeader}
              deviceType={deviceType}
              wallpaper={wallpaper}
              wallpaperType={wallpaperType}
              solidColor={solidColor}
              fontStyle={fontStyle}
              fontColor={fontColor}
              isServer={isServer}
              history={history}
              index={index}
              containerSize={containerSize}
              phoneHeight={phoneHeight}
              customImage={customImage}
              panelGeneral={panelGeneral}
            />
            <DesktopCanvas
              ref={ref}
              SaveDesktopRef={SaveDesktopRef}
              desktopModel={desktopModel}
              isScheduleEven={isScheduleEven}
              phoneWidth={phoneWidth}
              phoneHeight={phoneHeight}
              days={days}
              courses={courses}
              desktopModelLeft={desktopModelLeft}
              desktopModelRight={desktopModelRight}
              forwardedRef={ref}
              setPhoneWidth={setPhoneWidth}
              className={className}
              subHeader={subHeader}
              DesktopHeight={DesktopHeight}
              setDesktopHeight={setDesktopHeight}
              deviceType={deviceType}
              wallpaper={wallpaper}
              wallpaperType={wallpaperType}
              solidColor={solidColor}
              fontStyle={fontStyle}
              fontColor={fontColor}
              desktopBorderRadius={desktopBorderRadius}
              setDesktopBorderRadius={setDesktopBorderRadius}
              isServer={isServer}
              history={history}
              index={index}
              containerSize={containerSize}
              customImage={customImage}
              panelGeneral={panelGeneral}
            />
            <div className="modal-body-text-container">
              <button
                onClick={closeModal}
                id="close-btn"
                className="btn-secondary"
              >
                <img src={closeIcon} alt="" />
              </button>
              <div className="modal-body-text">
                <h2>{`${
                  deviceType === "Phone" ? "Mobile Phone" : "Desktop"
                } Wallpaper`}</h2>
                <p>{`Dimensions: ${
                  deviceType === "Phone" ? "1350px x 3000px" : "1360px x 765"
                }`}</p>
                <div className="download-buttons">
                  <button
                    onClick={
                      deviceType === "Phone"
                        ? saveMobileWallpaper
                        : saveDesktopWallpaper
                    }
                    className="btn-primary"
                  >
                    <img src={downloadIcon} alt="" />
                    <p>Download</p>
                  </button>
                  <button
                    onClick={closeModal}
                    className="btn-secondary modal-close-btn-secondary"
                  >
                    <p>Close</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          isOpen={linkActive}
          onRequestClose={closeLinkModal}
          style={modalStyles}
          contentLabel="Example Modal"
        >
          <div className="modal-body">
            <div
              className="modal-top"
              onClick={() => {
                closeLinkModal();
                console.log("Clicked");
              }}
            ></div>
            {link && (
              <div className="qr-code-container">
                <QRCode value={link} />
              </div>
            )}
            <div className="modal-body-text-container">
              <button
                onClick={closeLinkModal}
                id="close-btn"
                className="btn-secondary"
              >
                <img src={closeIcon} alt="" />
              </button>
              <div className="modal-body-text modal-body-link">
                <h2>Here's your link</h2>
                <div style={{ width: "100%" }}>
                  <div className="modal-body-link-text">
                    {!error ? (
                      isLinkReady ? (
                        <p>{link}</p>
                      ) : (
                        <p>...</p>
                      )
                    ) : (
                      <p>Error getting link</p>
                    )}
                    <div className="copy-icon-container">
                      <CopyToClipboard
                        onCopy={() => {
                          setCopy(true);
                        }}
                        text={link}
                      >
                        {!copy ? (
                          <img src={CopyIcon} alt="copy icon" />
                        ) : (
                          <img src={CopiedIcon} alt="copy icon" />
                        )}
                      </CopyToClipboard>
                    </div>
                  </div>
                  <button
                    onClick={closeLinkModal}
                    className="btn-secondary modal-close-btn-secondary"
                  >
                    <p>Close</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <div
          ref={setTarget}
          className="class-schedule-container"
          style={{
            backgroundImage: `url(${bg2})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="class-schedule-wrapper">
            <h1 className="fadeUp">Class Schedule Wallpaper Maker</h1>
            {/* Class Name */}
            <h2 className="fadeUp">Class Name</h2>
            <input
              className="fadeUp"
              type="text"
              id="course-name-text"
              placeholder="Enter Class Name"
              value={className}
              onChange={(e) => {
                setClassName(e.target.value);
              }}
            />
            {/* Subheader */}
            <h4 className="fadeUp" style={{ marginTop: 0, marginBottom: 0 }}>
              Subheader
            </h4>
            <input
              className="fadeUp"
              type="text"
              id="course-name-text"
              value={subHeader}
              placeholder="Enter subheader"
              onChange={(e) => {
                setSubHeader(e.target.value);
              }}
              style={{ marginBottom: 0 }}
            />
            <div className="class-scheduler-wrapper fadeUp">
              {/* Courses */}
              {courses.map((course) => (
                <div key={course.id} className="class-scheduler">
                  <div className="flex-space-between">
                    <h2>Course Code</h2>
                    <button
                      onClick={() => deleteCourse(course.id)}
                      className="btn-secondary"
                    >
                      <img src={deleteIcon} alt="add" />
                      <p>Remove Course</p>
                    </button>
                  </div>
                  <div className="coursename-picker">
                    <input
                      type="text"
                      className="input-text"
                      id="course-name-text"
                      value={course.code}
                      placeholder="Enter Course Code"
                      onChange={(e) => {
                        setCourses((prevCourses) =>
                          prevCourses.map((c) =>
                            c.id === course.id
                              ? { ...c, code: e.target.value }
                              : c
                          )
                        );
                      }}
                    />
                  </div>
                  <div className="flex-space-between">
                    <h2>Schedule</h2>
                  </div>
                  {course.schedule.map((schedule) => (
                    <SchedulePicker
                      key={schedule.id}
                      days={days}
                      courseDay={schedule.day}
                      setCourseDay={(day) =>
                        handleEditSchedule(
                          course.id,
                          schedule.id,
                          day,
                          schedule.time
                        )
                      }
                      courseTime={schedule.time}
                      setCourseTime={(time) =>
                        handleEditSchedule(
                          course.id,
                          schedule.id,
                          schedule.day,
                          time
                        )
                      }
                      onEdit={(day, time) =>
                        handleEditSchedule(course.id, schedule.id, day, time)
                      }
                      id={schedule.id}
                      onDelete={() => deleteSchedule(course.id, schedule.id)}
                    />
                  ))}
                  <button
                    id="add-new-schedule-btn"
                    className="btn-primary"
                    onClick={() => addNewSchedule(course.id)}
                  >
                    <img src={addIcon} alt="Add" />
                    <p>Add New Schedule</p>
                  </button>
                </div>
              ))}
            </div>
            <button
              id="add-new-class-btn"
              className="btn-primary fadeUp"
              onClick={addNewCourse}
              style={{ marginTop: courses.length > 0 ? 20 : -10 }}
            >
              <img src={addIcon} alt="" />
              <p>Add New Course</p>
            </button>
          </div>
        </div>
        <div
          className="canvas-container"
          style={{
            backgroundImage: `url(${window.innerWidth > 800 ? bg1 : bg2})`,
          }}
        >
          {/* Customize Button */}
          <div className="custom-btn-container">
            <button
              id="customize-btn"
              className="btn-primary write-btn"
              style={{
                display:
                  isSettingsOpen || window.innerWidth > 800 ? "none" : "flex",
              }}
              onClick={() => {
                WriteOpenHandler();
              }}
            >
              <img
                src={
                  isWriteTabOpen
                    ? window.innerWidth > 800
                      ? closeIcon2
                      : rightArrowIcon
                    : EditIcon
                }
                alt=""
              />
              <p>Edit</p>
            </button>
            <button
              style={{ display: isWriteTabOpen ? "none" : "flex" }}
              id="customize-btn"
              className="btn-primary"
              onClick={() => {
                settingsOpenHandler();
                gsap.fromTo(
                  ".settings-wrapper",
                  { marginRight: "-25vw" },
                  {
                    marginRight: 0,
                    ease: "expo.inOut",
                  }
                );
              }}
            >
              <img
                src={
                  isSettingsOpen
                    ? window.innerWidth > 800
                      ? closeIcon2
                      : leftArrowIcon
                    : customizeIcon
                }
                alt=""
              />
              <p>Customize</p>
            </button>
          </div>
          {/* Device Canvas */}
          <PhoneCanvas
            phoneModel={phoneModel}
            isScheduleEven={isScheduleEven}
            phoneWidth={phoneWidth}
            borderRadius={borderRadius}
            days={days}
            courses={courses}
            className={className}
            subHeader={subHeader}
            deviceType={deviceType}
            wallpaper={wallpaper}
            wallpaperType={wallpaperType}
            solidColor={solidColor}
            fontStyle={fontStyle}
            fontColor={fontColor}
            isServer={isServer}
            history={history}
            index={index}
            containerSize={containerSize}
            phoneHeight={phoneHeight}
            customImage={customImage}
            panelGeneral={panelGeneral}
          />
          <DesktopCanvas
            SaveDesktopRef={SaveDesktopRef}
            desktopModel={desktopModel}
            isScheduleEven={isScheduleEven}
            phoneWidth={phoneWidth}
            phoneHeight={phoneHeight}
            days={days}
            courses={courses}
            desktopModelLeft={desktopModelLeft}
            desktopModelRight={desktopModelRight}
            setPhoneWidth={setPhoneWidth}
            className={className}
            subHeader={subHeader}
            DesktopHeight={DesktopHeight}
            setDesktopHeight={setDesktopHeight}
            deviceType={deviceType}
            wallpaper={wallpaper}
            wallpaperType={wallpaperType}
            solidColor={solidColor}
            fontStyle={fontStyle}
            fontColor={fontColor}
            desktopBorderRadius={desktopBorderRadius}
            setDesktopBorderRadius={setDesktopBorderRadius}
            isServer={isServer}
            history={history}
            index={index}
            containerSize={containerSize}
            customImage={customImage}
            panelGeneral={panelGeneral}
          />
          {/* Controls */}
          <div className="controls-wrapper">
            <div className="controls">
              <div className="controls-left">
                <h3 className="fadeUpControls ">Device</h3>
                <div className="controls-left-options fadeUpControls">
                  <div
                    className={`controls-left-icon ${
                      deviceType === "Phone" ? "active" : ""
                    }`}
                    onClick={() => {
                      setDeviceType("Phone");
                    }}
                  >
                    <img src={phoneIcon} alt="" />
                  </div>
                  <div
                    className={`controls-left-icon ${
                      deviceType === "Desktop" ? "active" : ""
                    }`}
                    onClick={() => {
                      setDeviceType("Desktop");
                    }}
                  >
                    <img src={desktopIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="controls-right-wrapper">
                <div
                  className={`"controls-right controls-middle ${
                    window.innerWidth > 800 ? "" : "fadeUpControls"
                  } edit-btn`}
                  onClick={() => {
                    WriteOpenHandler();
                  }}
                >
                  <img src={EditIcon} alt="" />
                  <p>Edit</p>
                </div>
                <div
                  className={`controls-right controls-middle ${
                    window.innerWidth > 800 ? "" : "fadeUpControls"
                  }`}
                  onClick={() => {
                    settingsOpenHandler();
                  }}
                >
                  <img src={customizeIcon2} alt="" />
                  <p>Customize</p>
                </div>
              </div>
              <div className="controls-right-wrapper controls-right-last">
                <div
                  className="controls-right fadeUpControls"
                  onClick={openModal}
                >
                  <img src={downloadIcon2} alt="" />
                  <p>Download</p>
                </div>
                <div
                  className="controls-right fadeUpControls"
                  onClick={async () => {
                    openLinkModal();
                    handleShareLink();
                  }}
                >
                  <img src={ShareIcon} alt="" />
                  <p>Share</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Settings */}
        <div className="settings-wrapper">
          <h2>Customize</h2>
          <p id="warning-1">
            *Currently, blur effects are not rendered when downloaded. I'm
            working to fix it.
          </p>
          <div className="settings-wallpaper-wrapper">
            <h3>Text</h3>
            {/* Font Style Tab*/}
            <div
              className={`settings-wallpaper-content ${
                isfontStyleTabActive ? "active" : ""
              }`}
            >
              <div
                className="settings-wallpaper-content-header"
                onClick={() => {
                  setIsfontStyleTabActive(!isfontStyleTabActive);
                  setIsfontColorTabActive(true);
                }}
              >
                <div className="settings-wallpaper-content-header-left">
                  <img src={FontIcon} alt="" className={`active`} />
                  <h4>Font</h4>
                </div>
                <img src={arrowDownIcon} alt="" className={`active`} />
              </div>
              <div
                className="settings-wallpaper-images"
                style={{
                  position: "relative",
                  zIndex: isfontStyleTabActive ? -1 : 0,
                }}
              >
                {fontStyles.map((font, index) => (
                  <div
                    className={`font-style-div ${
                      fontStyle === font.id ? "active" : ""
                    }`}
                    onClick={() => {
                      setFontStyle(font.id);
                      setContainerSize(font.containerFontSize);
                    }}
                  >
                    <h5 style={{ fontFamily: `${font.id}, sans-serif` }}>Aa</h5>
                    <p
                      style={{
                        fontFamily: `${font.id}, sans-serif`,
                        fontSize: `${font.size}`,
                      }}
                    >
                      {font.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Font Color Tab*/}
            <div
              className={`settings-wallpaper-content ${
                isfontColorTabActive ? "active" : ""
              }`}
            >
              <div
                className="settings-wallpaper-content-header"
                onClick={() => {
                  setIsfontColorTabActive(!isfontColorTabActive);
                  setIsfontStyleTabActive(true);
                }}
              >
                <div className="settings-wallpaper-content-header-left">
                  <img src={ColorIcon} alt="" />
                  <h4>Color</h4>
                </div>
                <img src={arrowDownIcon} alt="" className={`active`} />
              </div>
              <div
                className="settings-wallpaper-images"
                style={{
                  position: "relative",
                  zIndex: isfontColorTabActive ? -1 : 0,
                }}
              >
                {fontColors.map((color, index) => (
                  <div
                    style={{ background: color }}
                    className={`font-style-div font-color-div ${
                      fontColor === color ? "active" : ""
                    }`}
                    onClick={() => {
                      setFontColor(color);
                    }}
                  >
                    <p>{color}</p>
                  </div>
                ))}
              </div>
              <div className="color-picker" style={{ marginTop: 20 }}>
                <h4 style={{ fontWeight: 400 }}>Custom Color</h4>
                <ColorPicker
                  color={fontColor}
                  hideAlpha
                  theme={{
                    background: "#0E100F",
                    inputBackground: "#0E100F",
                    borderColor: "#42433d",
                    borderRadius: "5px",
                    borderWidth: "2px",
                    color: "white",
                    width: "100%",
                  }}
                  presets={[
                    {
                      a: 0.1,
                      b: 0,
                      g: 0,
                      r: 0,
                    },
                    "#cdb4db",
                    "#ffc8dd",
                    "#ffafcc",
                    "#bde0fe",
                    "#a2d2ff",
                  ]}
                  onChange={(color) => setFontColor(color.hex)}
                />
              </div>
            </div>
            <h3>Wallpaper</h3>
            {navigator.platform === "iPad" ||
            navigator.platform === "iPhone" ||
            navigator.platform === "iPod" ? (
              <p id="warning">
                *Currently, only the generated mesh gradients are rendered when
                downloaded on iPhone. Switch to desktop to access other options.
              </p>
            ) : (
              <p id="warning">
                *Currently, only custom images are not rendered when downloaded
                on Android. Switch to desktop to render them.
              </p>
            )}

            {/* Mesh Gradients Wallpaper Tab*/}
            <div
              className={`settings-wallpaper-content ${
                isMeshGradientTabActive ? "active" : ""
              }`}
            >
              <div
                className="settings-wallpaper-content-header"
                onClick={() => {
                  setIsMeshGradientsTabActive(!isMeshGradientTabActive);
                  setIsSolidTabActive(true);
                  setIsCustomImageTabActive(true);
                  setIsGeneralTabActive(true);
                }}
              >
                <div className="settings-wallpaper-content-header-left">
                  <img src={MeshIcon} alt="" />
                  <h4>Mesh Gradients</h4>
                </div>
                <img src={arrowDownIcon} alt="" className={`active`} />
              </div>
              <div
                className="settings-wallpaper-images"
                style={{
                  position: "relative",
                  zIndex: isMeshGradientTabActive ? -1 : 0,
                }}
              >
                {meshWallpaper.map((mesh, index) => (
                  <img
                    src={mesh}
                    alt=""
                    className={`${wallpaper === mesh ? "active" : ""}`}
                    onClick={() => {
                      setWallpaper(mesh);
                      setWallpaperType("Mesh");
                    }}
                  />
                ))}
              </div>
              <div className="color-picker" style={{ marginTop: 20 }}>
                <div
                  className="settings-wallpaper-content-header"
                  style={{ cursor: "default" }}
                >
                  <h4 style={{ fontWeight: 400, cursor: "text" }}>
                    Generate Mesh
                  </h4>
                  <div className="generate-buttons">
                    <img
                      id="prev-button"
                      src={arrowDownIcon}
                      alt=""
                      onClick={() => {
                        setWallpaperType("Generate-Mesh");
                        if (index > 0) {
                          setIndex(index - 1);
                        }
                      }}
                    />
                    <img
                      id="next-button"
                      src={arrowDownIcon}
                      alt=""
                      onClick={() => {
                        setWallpaperType("Generate-Mesh");
                        if (index < history.length - 1) {
                          setIndex(index + 1);
                        }
                      }}
                    />
                  </div>
                </div>
                <div
                  className="generate-mesh absolute w-[300px] h-[500px] md:w-[800px] md:h-[700px] mt-64 opacity-[12%] backdrop-blur-3xl blur-3xl pointer-events-none rounded-[15rem]"
                  style={isServer ? {} : history[index]}
                />
                <button
                  id="generate-btn"
                  className="btn-primary"
                  onMouseDownCapture={() => handleNewGradient()}
                  onClick={() => {
                    setWallpaperType("Generate-Mesh");
                  }}
                >
                  <img src={generateIcon} alt="" />
                  <p>Generate</p>
                </button>
              </div>
            </div>
            {/* Solid BG Tab */}
            <div
              className={`settings-wallpaper-content ${
                isSolidTabActive ? "active" : ""
              }`}
            >
              <div
                className="settings-wallpaper-content-header"
                onClick={() => {
                  setIsSolidTabActive(!isSolidTabActive);
                  setIsMeshGradientsTabActive(true);
                  setIsCustomImageTabActive(true);
                  setIsGeneralTabActive(true);
                }}
              >
                <div className="settings-wallpaper-content-header-left">
                  <img src={SolidIcon} alt="" />
                  <h4>Solid BG</h4>
                </div>
                <img src={arrowDownIcon} alt="" className={`active`} />
              </div>
              <div
                className="settings-wallpaper-images solid-colors"
                style={{
                  position: "relative",
                  zIndex: isSolidTabActive ? -1 : 0,
                }}
              >
                {solidColors.map((solid, index) => (
                  <div
                    style={{ background: solid }}
                    alt=""
                    className={`font-style-div font-color-div ${
                      solidColor === solid ? "active" : ""
                    }`}
                    onClick={() => {
                      setSolidColor(solid);
                      setWallpaperType("Solid");
                    }}
                  >
                    <p>{solid}</p>
                  </div>
                ))}
              </div>
              <div
                className="color-picker"
                style={{ marginTop: 20 }}
                onClick={() => {
                  setWallpaperType("Solid");
                }}
              >
                <h4 style={{ fontWeight: 400 }}>Custom Color</h4>
                <ColorPicker
                  color={solidColor}
                  hideAlpha
                  theme={{
                    background: "#0E100F",
                    inputBackground: "#0E100F",
                    borderColor: "#42433d",
                    borderRadius: "5px",
                    borderWidth: "2px",
                    color: "white",
                    width: "100%",
                  }}
                  presets={[
                    {
                      a: 0.1,
                      b: 0,
                      g: 0,
                      r: 0,
                    },
                    "#cdb4db",
                    "#ffc8dd",
                    "#ffafcc",
                    "#bde0fe",
                    "#a2d2ff",
                  ]}
                  onChange={(color) => setSolidColor(color.hex)}
                />
              </div>
            </div>
            {/* Custom Image */}
            <div
              className={`settings-wallpaper-content ${
                isCustomImageTabActive ? "active" : ""
              }`}
            >
              <div
                className="settings-wallpaper-content-header"
                onClick={() => {
                  setIsCustomImageTabActive(!isCustomImageTabActive);
                  setIsMeshGradientsTabActive(true);
                  setIsSolidTabActive(true);
                  setIsGeneralTabActive(true);
                }}
              >
                <div className="settings-wallpaper-content-header-left">
                  <img src={CustomImageIcon} alt="" />
                  <h4>Custom Image</h4>
                </div>
                <img src={arrowDownIcon} alt="" className={`active`} />
              </div>
              <div
                className="custom-file-upload-div"
                style={{
                  position: "relative",
                  zIndex: isCustomImageTabActive ? -1 : 0,
                }}
              >
                <div className="custom-file-upload-wrapper">
                  <div className="custom-file-upload-wrapper-header">
                    <img
                      src={customImage.image}
                      alt="Custom Image Container"
                      id="custom-image"
                    />
                  </div>
                  <button
                    id="use-this-btn"
                    className="btn-primary"
                    onMouseDownCapture={() => handleNewGradient()}
                    onClick={() => {
                      setWallpaperType("Custom-Image");
                    }}
                  >
                    <img src={imageIcon} alt="" />
                    <p>Use this image</p>
                  </button>
                  <div className="custom-file-upload-container">
                    <label class="custum-file-upload" for="file">
                      <div class="icon">
                        <img src={uploadIcon} alt="uploadArrow-pic" />
                      </div>
                      <div class="text">
                        <p>Click to upload image</p>
                      </div>
                      <input
                        type="file"
                        name="image"
                        id="file"
                        onChange={(e) => handleUpload(e)}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* General Settings */}
            <div
              className={`settings-wallpaper-content ${
                isGeneralTabActive ? "active" : ""
              }`}
            >
              <div
                className="settings-wallpaper-content-header"
                onClick={() => {
                  setIsGeneralTabActive(!isGeneralTabActive);
                  setIsMeshGradientsTabActive(true);
                  setIsSolidTabActive(true);
                  setIsCustomImageTabActive(true);
                }}
              >
                <div className="settings-wallpaper-content-header-left">
                  <img src={generalIcon} alt="" />
                  <h4>General</h4>
                </div>
                <img src={arrowDownIcon} alt="" className={`active`} />
              </div>
              <div
                className="custom-file-upload-div"
                style={{
                  position: "relative",
                  zIndex: isGeneralTabActive ? -1 : 0,
                }}
              >
                <div className="custom-image-controls">
                  <h4 style={{ fontWeight: 400 }}>
                    Blur Effect: {customImage.blurValue}px
                  </h4>
                  <Slider
                    range
                    value={customImage.blurValue}
                    onChange={(value) => {
                      setCustomImage((prevCustomImage) => ({
                        ...prevCustomImage,
                        blurValue: value,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Panel  */}
            <h3>Panel</h3>
            {/* Panel Background Tab */}
            <div
              className={`settings-wallpaper-content ${
                isPanelGeneralTabActive ? "active" : ""
              }`}
            >
              <div
                className="settings-wallpaper-content-header"
                onClick={() => {
                  setIsPanelGeneralTabActive(!isPanelGeneralTabActive);
                  setIsPanelBorderTabActive(true);
                }}
              >
                <div className="settings-wallpaper-content-header-left">
                  <img src={BackgroundIcon} alt="" />
                  <h4>Background</h4>
                </div>
                <img src={arrowDownIcon} alt="" className={`active`} />
              </div>
              <div className="panel-options-content">
                <div className="custom-image-controls">
                  <h4 style={{ fontWeight: 400 }}>
                    Blur Effect: {panelGeneral.blurValue}px
                  </h4>
                  <Slider
                    range
                    max={99}
                    value={panelGeneral.blurValue}
                    onChange={(value) => {
                      setPanelGeneral((prevpanelGeneral) => ({
                        ...prevpanelGeneral,
                        blurValue: value,
                      }));
                    }}
                  />
                </div>
                <div className="custom-image-controls">
                  <h4 style={{ fontWeight: 400 }}>
                    Opacity: {panelGeneral.opacity}px
                  </h4>
                  <Slider
                    range
                    max={99}
                    value={panelGeneral.opacity}
                    onChange={(value) => {
                      setPanelGeneral((prevpanelGeneral) => ({
                        ...prevpanelGeneral,
                        opacity: value,
                      }));
                    }}
                  />
                </div>
                <h4 style={{ fontWeight: 400 }}>Background Color</h4>
                <div
                  className="settings-wallpaper-images solid-colors"
                  style={{
                    position: "relative",
                    zIndex: isPanelGeneralTabActive ? -1 : 0,
                  }}
                >
                  {solidColors.map((solid, index) => (
                    <div
                      style={{ background: solid }}
                      alt=""
                      className={`font-style-div font-color-div ${
                        panelGeneral.background === solid ? "active" : ""
                      }`}
                      onClick={() => {
                        setPanelGeneral((prevpanelGeneral) => ({
                          ...prevpanelGeneral,
                          background: hexToHsl(solid),
                        }));
                      }}
                    >
                      <p>{solid}</p>
                    </div>
                  ))}
                </div>
                <div className="color-picker" style={{ marginTop: 20 }}>
                  <h4 style={{ fontWeight: 400 }}>Custom Color</h4>
                  <ColorPicker
                    color={solidColor}
                    hideAlpha
                    theme={{
                      background: "#0E100F",
                      inputBackground: "#0E100F",
                      borderColor: "#42433d",
                      borderRadius: "5px",
                      borderWidth: "2px",
                      color: "white",
                      width: "100%",
                    }}
                    presets={[
                      {
                        a: 0.1,
                        b: 0,
                        g: 0,
                        r: 0,
                      },
                      "#cdb4db",
                      "#ffc8dd",
                      "#ffafcc",
                      "#bde0fe",
                      "#a2d2ff",
                    ]}
                    onChange={(color) => {
                      setPanelGeneral((prevpanelGeneral) => ({
                        ...prevpanelGeneral,
                        background: hexToHsl(color.hex),
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Panel Border Tab */}
            <div
              className={`settings-wallpaper-content ${
                isPanelBorderTabActive ? "active" : ""
              }`}
            >
              <div
                className="settings-wallpaper-content-header"
                onClick={() => {
                  setIsPanelBorderTabActive(!isPanelBorderTabActive);
                  setIsPanelGeneralTabActive(true);
                }}
              >
                <div className="settings-wallpaper-content-header-left">
                  <img src={BorderIcon} alt="" />
                  <h4>Border</h4>
                </div>
                <img src={arrowDownIcon} alt="" className={`active`} />
              </div>
              <div className="panel-options-content">
                <div className="border-style-wrapper">
                  <h4 style={{ fontWeight: 400 }}>Style</h4>
                  <div className="border-style-container">
                    <div
                      onClick={() => {
                        setPanelGeneral((prevpanelGeneral) => ({
                          ...prevpanelGeneral,
                          borderStyle: "Window",
                        }));
                      }}
                      className={`border-style ${
                        panelGeneral.borderStyle === "Window" ? "active" : ""
                      }`}
                    >
                      <img src={WindowIcon} alt="" />
                      <p>Window</p>
                    </div>
                    <div
                      onClick={() => {
                        setPanelGeneral((prevpanelGeneral) => ({
                          ...prevpanelGeneral,
                          borderStyle: "Collapse",
                        }));
                      }}
                      className={`border-style ${
                        panelGeneral.borderStyle !== "Window" ? "active" : ""
                      }`}
                    >
                      <img src={CollapseIcon} alt="" />
                      <p>Collapse</p>
                    </div>
                  </div>
                </div>
                <div
                  className="custom-image-controls"
                  style={{
                    display:
                      panelGeneral.borderStyle === "Window" ? "block" : "none",
                  }}
                >
                  <h4 style={{ fontWeight: 400 }}>
                    Corner Radius: {panelGeneral.cornerRadius}px
                  </h4>
                  <Slider
                    range
                    value={panelGeneral.cornerRadius}
                    max={20}
                    onChange={(value) => {
                      setPanelGeneral((prevpanelGeneral) => ({
                        ...prevpanelGeneral,
                        cornerRadius: value,
                      }));
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Reset Tab */}
            <div
              className={`settings-wallpaper-content ${
                isResetTabActive ? "active" : ""
              }`}
              style={{ marginTop: 40 }}
            >
              <div
                className="settings-wallpaper-content-header"
                onClick={() => {
                  setIsResetTabActive(!isResetTabActive);
                }}
              >
                <div className="settings-wallpaper-content-header-left">
                  <img src={ResetIcon} alt="" />
                  <h4>Reset</h4>
                </div>
                <img src={arrowDownIcon} alt="" className={`active`} />
              </div>
              <div
                className="custom-file-upload-div"
                style={{
                  position: "relative",
                  zIndex: isResetTabActive ? -1 : 0,
                }}
              >
                <div className="custom-file-upload-wrapper">
                  <div className="reset-buttons">
                    <button
                      style={{
                        marginTop: isResetTabActive ? 0 : 5,
                      }}
                      id="use-this-btn"
                      className="btn-primary reset-all-btn"
                      onClick={() => {
                        setIsServer(true);
                        setHistory([generateJSXMeshGradient(ELEMENTS)]);
                        setIndex(0);
                        setFontStyle(fontStyles[0].id);
                        setFontColor(fontColors[1]);
                        setContainerSize({
                          header: "1.5rem",
                          subheader: "0.875rem",
                          h4: "1rem",
                          h5: "0.75rem",
                          p: "0.625rem",
                        });
                        setWallpaperType("Mesh");
                        setWallpaper(meshWallpaper[0]);
                        setSolidColor(solidColors[0]);
                        setCustomImage({
                          image: customImageDefault,
                          blurValue: 0,
                        });
                        setPanelGeneral({
                          blurValue: 10,
                          background: [],
                          opacity: 15,
                          borderStyle: "Window",
                          cornerRadius: 5,
                        });
                      }}
                    >
                      <p>Reset Customization</p>
                    </button>
                    <button
                      style={{
                        marginTop: isResetTabActive ? 0 : 5,
                      }}
                      id="use-this-btn"
                      className="btn-secondary"
                      onClick={() => {
                        setLink(null);
                        setLinkID(null);
                        setIsServer(true);
                        setHistory([generateJSXMeshGradient(ELEMENTS)]);
                        setIndex(0);
                        setFontStyle(fontStyles[0].id);
                        setFontColor(fontColors[1]);
                        setContainerSize({
                          header: "1.5rem",
                          subheader: "0.875rem",
                          h4: "1rem",
                          h5: "0.75rem",
                          p: "0.625rem",
                        });
                        setWallpaperType("Mesh");
                        setWallpaper(meshWallpaper[0]);
                        setSolidColor(solidColors[0]);
                        setCustomImage({
                          image: customImageDefault,
                          blurValue: 0,
                        });
                        setPanelGeneral({
                          blurValue: 10,
                          background: [],
                          opacity: 15,
                          borderStyle: "Window",
                          cornerRadius: 5,
                        });
                        setCourses([]);
                        setClassName("");
                        setSubHeader("");
                      }}
                    >
                      <p>Reset All Data</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
