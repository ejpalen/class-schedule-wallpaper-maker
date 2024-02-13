import React, { useState, useRef, useCallback, useEffect } from "react";
import { toPng, toJpeg } from "html-to-image";
import { generateJSXMeshGradient } from "meshgrad";

//bg
import mesh1 from "../res/mesh-bg/mesh-1.png";
import mesh3 from "../res/mesh-bg/mesh-3.png";
import mesh4 from "../res/mesh-bg/mesh-4.png";
import mesh5 from "../res/mesh-bg/mesh-5.png";
import mesh7 from "../res/mesh-bg/mesh-7.png";
import mesh8 from "../res/mesh-bg/mesh-8.png";
import mesh9 from "../res/mesh-bg/mesh-9.png";
import mesh10 from "../res/mesh-bg/mesh-10.png";
import mesh12 from "../res/mesh-bg/mesh-12.png";
import mesh13 from "../res/mesh-bg/mesh-13.png";
import mesh15 from "../res/mesh-bg/mesh-15.png";
import mesh16 from "../res/mesh-bg/mesh-16.png";
import mesh17 from "../res/mesh-bg/mesh-17.png";
import mesh19 from "../res/mesh-bg/mesh-19.png";
import mesh20 from "../res/mesh-bg/mesh-20.png";

import customImageDefault from "../res/custom-image-default.jpg";

const ELEMENTS = 6;

export const useCourseState = () => {
  const SaveMobileRef = useRef(null);
  const SaveDesktopRef = useRef(null);

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isScheduleEven, setIsScheduleEven] = useState(false);
  const [linkActive, setLinkActive] = useState(false);
  const [isLinkReady, setIsLinkReady] = useState(false);
  const [copy, setCopy] = useState(false);

  const [deviceType, setDeviceType] = useState("Phone");
  const [DesktopHeight, setDesktopHeight] = useState(0);

  const [isMeshGradientTabActive, setIsMeshGradientsTabActive] = useState(true);
  const [isSolidTabActive, setIsSolidTabActive] = useState(true);
  const [isfontStyleTabActive, setIsfontStyleTabActive] = useState(true);
  const [isfontColorTabActive, setIsfontColorTabActive] = useState(true);
  const [isCustomImageTabActive, setIsCustomImageTabActive] = useState(true);
  const [isGeneralTabActive, setIsGeneralTabActive] = useState(true);
  const [isPanelGeneralTabActive, setIsPanelGeneralTabActive] = useState(true);
  const [isPanelBorderTabActive, setIsPanelBorderTabActive] = useState(true);
  const [isResetTabActive, setIsResetTabActive] = useState(true);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const meshWallpaper = [
    mesh1,
    mesh3,
    mesh4,
    mesh5,
    mesh7,
    mesh8,
    mesh9,
    mesh10,
    mesh12,
    mesh13,
    mesh15,
    mesh16,
    mesh17,
    mesh19,
    mesh20,
  ];

  // const meshWallpaper = [
  //   "https://firebasestorage.googleapis.com/v0/b/class-schedule-wallpaper-maker.appspot.com/o/mesh_gradients%2Fmesh-1.png?alt=media&token=f21d63bc-bc92-44e3-ac8b-53981176a12f",
  //   "https://firebasestorage.googleapis.com/v0/b/class-schedule-wallpaper-maker.appspot.com/o/mesh_gradients%2Fmesh-3.png?alt=media&token=16fc4085-f8d6-4ede-9b58-40b63b199062",
  //   "https://firebasestorage.googleapis.com/v0/b/class-schedule-wallpaper-maker.appspot.com/o/mesh_gradients%2Fmesh-4.png?alt=media&token=2a6ddf09-5eef-4314-9941-30d16176e4a0",
  //   "https://firebasestorage.googleapis.com/v0/b/class-schedule-wallpaper-maker.appspot.com/o/mesh_gradients%2Fmesh-5.png?alt=media&token=1815d4f6-3a37-47f0-ad83-90f56809b786",
  //   "https://firebasestorage.googleapis.com/v0/b/class-schedule-wallpaper-maker.appspot.com/o/mesh_gradients%2Fmesh-7.png?alt=media&token=0db9d65e-bfe2-43f6-9df6-5e2942f6c73b",
  //   "https://firebasestorage.googleapis.com/v0/b/class-schedule-wallpaper-maker.appspot.com/o/mesh_gradients%2Fmesh-8.png?alt=media&token=418ca065-bc16-4de7-b70e-25bde87810b2",
  //   "https://firebasestorage.googleapis.com/v0/b/class-schedule-wallpaper-maker.appspot.com/o/mesh_gradients%2Fmesh-9.png?alt=media&token=21476063-72e7-4cf6-ad72-c0f42b2b2ecc",
  //   "https://firebasestorage.googleapis.com/v0/b/class-schedule-wallpaper-maker.appspot.com/o/mesh_gradients%2Fmesh-10.png?alt=media&token=a7539da0-363b-44c6-bc4e-354050d248f9",
  //   "https://firebasestorage.googleapis.com/v0/b/class-schedule-wallpaper-maker.appspot.com/o/mesh_gradients%2Fmesh-12.png?alt=media&token=c8b41463-a1c3-41c3-84df-2f30ab571390",
  //   "https://firebasestorage.googleapis.com/v0/b/class-schedule-wallpaper-maker.appspot.com/o/mesh_gradients%2Fmesh-13.png?alt=media&token=19033d23-bae5-49e2-99c1-72d154f2451e",
  //   "https://firebasestorage.googleapis.com/v0/b/class-schedule-wallpaper-maker.appspot.com/o/mesh_gradients%2Fmesh-15.png?alt=media&token=7a30bfae-5eb4-4795-a40a-ab3cf4965b74",
  //   "https://firebasestorage.googleapis.com/v0/b/class-schedule-wallpaper-maker.appspot.com/o/mesh_gradients%2Fmesh-16.png?alt=media&token=a3cf9ac4-b9b4-4d6e-a1f7-4469b2fb7a9d",
  //   "https://firebasestorage.googleapis.com/v0/b/class-schedule-wallpaper-maker.appspot.com/o/mesh_gradients%2Fmesh-17.png?alt=media&token=9705101c-4071-47d5-9d54-6e061846f5c9",
  //   "https://firebasestorage.googleapis.com/v0/b/class-schedule-wallpaper-maker.appspot.com/o/mesh_gradients%2Fmesh-19.png?alt=media&token=c05ceff5-79c0-4870-95b0-e591a8249c3b",
  //   "https://firebasestorage.googleapis.com/v0/b/class-schedule-wallpaper-maker.appspot.com/o/mesh_gradients%2Fmesh-20.png?alt=media&token=0d087ab4-ee69-46f0-a8dc-4a934211af99",
  // ];

  const solidColors = [
    "#000",
    "#fff",
    "#0AE453",
    "#3CBAE6",
    "#F2C4F9",
    "#F8840F",
    "#ADA6FE",
    "#D8D4FF",
    "#A2D2FF",
  ];
  const fontStyles = [
    {
      id: "Galdern",
      name: "Galdern",
      size: "1.2rem",
      containerFontSize: {
        header: 1.5,
        subheader: 0.875,
        h4: 1,
        h5: 0.75,
        p: 0.625,
      },
    },
    {
      id: "Syne",
      name: "Syne",
      size: "1rem",
      containerFontSize: {
        header: 1,
        subheader: 0.75,
        h4: 0.438,
        h5: 0.5,
        p: 0.5,
      },
    },
    {
      id: "Orbitron",
      name: "Orbitron ",
      size: "0.833rem",
      containerFontSize: {
        header: 1,
        subheader: 0.625,
        h4: 0.75,
        h5: 0.625,
        p: 0.5,
      },
    },
    {
      id: "Plus Jakarta Sans",
      name: "Plus Jakarta",
      size: "0.833rem",
      containerFontSize: {
        header: 1.25,
        subheader: 0.625,
        h4: 0.625,
        h5: 0.5,
        p: 0.5,
      },
    },
    {
      id: "Manrope",
      name: "Manrope",
      size: "0.833rem",
      containerFontSize: {
        header: 1.25,
        subheader: 0.625,
        h4: 0.625,
        h5: 0.5,
        p: 0.5,
      },
    },
    {
      id: "Montserrat",
      name: "Montserrat",
      size: "0.833rem",
      containerFontSize: {
        header: 1.5,
        subheader: 0.625,
        h4: 0.625,
        h5: 0.5,
        p: 0.5,
      },
    },
    {
      id: "Playfair Display",
      name: "Playfair",
      size: "0.833rem",
      containerFontSize: {
        header: 1.25,
        subheader: 0.75,
        h4: 0.625,
        h5: 0.5,
        p: 0.5,
      },
    },
    {
      id: "Libre Baskerville",
      name: "Libre",
      size: "0.833rem",
      containerFontSize: {
        header: 1.25,
        subheader: 0.625,
        h4: 0.625,
        h5: 0.5,
        p: 0.5,
      },
    },
    {
      id: "Lora",
      name: "Lora",
      size: "0.833rem",
      containerFontSize: {
        header: 1.25,
        subheader: 0.75,
        h4: 0.625,
        h5: 0.5,
        p: 0.5,
      },
    },
  ];
  const fontColors = [
    "#000",
    "#fff",
    "#0AE453",
    "#3CBAE6",
    "#F2C4F9",
    "#F8840F",
    "#ADA6FE",
    "#D8D4FF",
    "#A2D2FF",
  ];

  const [link, setLink] = useState("");

  const [linkID, setLinkID] = useState(null);

  const [isServer, setIsServer] = useState(() => {
    const savedIsServer = JSON.parse(localStorage.getItem("isServer"));
    return savedIsServer !== null ? savedIsServer : true;
  });

  const [history, setHistory] = useState(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history"));
    return savedHistory !== null
      ? savedHistory
      : [generateJSXMeshGradient(ELEMENTS)];
  });

  const [index, setIndex] = useState(() => {
    const savedIndex = JSON.parse(localStorage.getItem("index"));
    return savedIndex !== null ? savedIndex : 0;
  });

  const [fontStyle, setFontStyle] = useState(() => {
    const savedfontStyle = localStorage.getItem("fontStyle");
    return savedfontStyle || fontStyles[0].id;
  });
  const [fontColor, setFontColor] = useState(() => {
    const savedfontColor = localStorage.getItem("fontColor");
    return savedfontColor || fontColors[1];
  });

  const [containerSize, setContainerSize] = useState(() => {
    const savedContainerSize = localStorage.getItem("containerSize");
    return savedContainerSize
      ? JSON.parse(savedContainerSize)
      : {
          header: window.innerWidth > 800 ? 1.5 : 1.5 - 0.125,
          subheader: window.innerWidth > 800 ? 0.875 : 0.875 - 0.125,
          h4: window.innerWidth > 800 ? 1 : 1 - 0.125,
          h5: window.innerWidth > 800 ? 0.75 : 0.75 - 0.125,
          p: window.innerWidth > 800 ? 0.625 : 0.625 - 0.125,
        };
  });

  const [wallpaperType, setWallpaperType] = useState(() => {
    const savedWallpaperType = localStorage.getItem("wallpaperType");
    return savedWallpaperType || "Mesh";
  });
  const [wallpaper, setWallpaper] = useState(() => {
    const savedWallpaper = localStorage.getItem("wallpaper");
    return savedWallpaper || meshWallpaper[0];
  });
  const [solidColor, setSolidColor] = useState(() => {
    const savedSolidColors = localStorage.getItem("solidColor");
    return savedSolidColors || solidColors[0];
  });

  const [customImage, setCustomImage] = useState(() => {
    const savedCustomImage = localStorage.getItem("customImage");
    return savedCustomImage
      ? JSON.parse(savedCustomImage)
      : {
          image: customImageDefault,
          blurValue: 0,
        };
  });

  const [panelGeneral, setPanelGeneral] = useState(() => {
    const savedPanelGeneral = localStorage.getItem("panelGeneral");
    return savedPanelGeneral
      ? JSON.parse(savedPanelGeneral)
      : {
          blurValue: 10,
          background: [],
          opacity: 15,
          borderStyle: "Window",
          cornerRadius: 5,
        };
  });

  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem("courses");
    return savedCourses ? JSON.parse(savedCourses) : [];
  });
  const [className, setClassName] = useState(() => {
    const savedClassName = localStorage.getItem("className");
    return savedClassName || "";
  });

  const [subHeader, setSubHeader] = useState(() => {
    const savedSubHeader = localStorage.getItem("subHeader");
    return savedSubHeader || "";
  });

  const saveMobileWallpaper = useCallback(() => {
    if (SaveMobileRef.current === null) {
      return;
    }

    toPng(SaveMobileRef.current, {
      cacheBust: true,
      canvasWidth: 1080,
      canvasHeight: 2400,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "mobile-wallpaper.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [SaveMobileRef]);

  const saveDesktopWallpaper = useCallback(() => {
    if (SaveDesktopRef.current === null) {
      return;
    }

    toJpeg(SaveDesktopRef.current, {
      cacheBust: true,
      canvasWidth: 1088,
      canvasHeight: 612,
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "desktop-wallpaper.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [SaveDesktopRef]);

  const addNewCourse = () => {
    const id = Math.random().toString(36).substr(2, 9);
    const newCourse = {
      id: id,
      code: "", // Initial course code is empty
      schedule: [
        {
          id: Math.random().toString(36).substr(2, 9),
          day: "Monday",
          time: "8:00 AM",
          timeEnd: "9:00 AM",
        },
      ],
    };
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  const handleEditSchedule = (courseId, scheduleId, day, time, timeEnd) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              schedule: course.schedule.map((schedule) =>
                schedule.id === scheduleId
                  ? { ...schedule, day: day, time: time, timeEnd: timeEnd }
                  : schedule
              ),
            }
          : course
      )
    );
  };

  const deleteSchedule = (courseId, scheduleId) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              schedule: course.schedule.filter(
                (schedule) => schedule.id !== scheduleId
              ),
            }
          : course
      )
    );
  };

  const addNewSchedule = (courseId) => {
    const id = Math.random().toString(36).substr(2, 9);
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              schedule: [
                ...course.schedule,
                {
                  id: id,
                  day: "",
                  time: "8:00 AM",
                  timeEnd: "9:00 AM",
                },
              ],
            }
          : course
      )
    );
  };

  const deleteCourse = (courseId) => {
    setCourses((prevCourses) =>
      prevCourses.filter((course) => course.id !== courseId)
    );
  };

  const settingsOpenHandler = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleUpload = (e) => {
    if (!e.target.files[0]) {
      console.warn("No image selected. Please select an image to upload.");
      return;
    }
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setCustomImage((prevCustomImage) => ({
      ...prevCustomImage,
      image: imageUrl,
    }));
    setWallpaperType("Custom-Image");
  };

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "#000",
      borderRadius: 20,
    },
  };

  useEffect(() => {
    const uniqueDays = new Set();

    courses.forEach((course) => {
      course.schedule.forEach((schedule) => {
        uniqueDays.add(schedule.day);
      });
    });

    setIsScheduleEven(uniqueDays.size % 2 === 0);
  }, [courses]);

  useEffect(() => {
    if (!link) {
      localStorage.setItem("isServer", JSON.stringify(isServer));
    }
  }, [isServer]);

  useEffect(() => {
    if (!link) {
      localStorage.setItem("history", JSON.stringify(history));
    }
  }, [history]);

  useEffect(() => {
    if (!link) {
      localStorage.setItem("index", JSON.stringify(index));
    }
  }, [index]);

  useEffect(() => {
    if (!link) {
      localStorage.setItem("courses", JSON.stringify(courses));
    }
  }, [courses]);

  useEffect(() => {
    if (!link) {
      localStorage.setItem("className", className);
    }
  }, [className]);

  useEffect(() => {
    if (!link) {
      localStorage.setItem("subHeader", subHeader);
    }
  }, [subHeader]);

  useEffect(() => {
    if (!link) {
      localStorage.setItem("fontStyle", fontStyle);
    }
  }, [fontStyle]);

  useEffect(() => {
    if (!link) {
      localStorage.setItem("fontColor", fontColor);
    }
  }, [fontColor]);

  useEffect(() => {
    if (!link) {
      localStorage.setItem("containerSize", JSON.stringify(containerSize));
    }
  }, [containerSize]);

  useEffect(() => {
    if (!link) {
      localStorage.setItem("wallpaperType", wallpaperType);
    }
  }, [wallpaperType]);

  useEffect(() => {
    if (!link) {
      localStorage.setItem("wallpaper", wallpaper);
    }
  }, [wallpaper]);

  useEffect(() => {
    if (!link) {
      localStorage.setItem("solidColor", solidColor);
    }
  }, [solidColor]);

  useEffect(() => {
    if (!link) {
      localStorage.setItem("customImage", JSON.stringify(customImage));
    }
  }, [customImage]);

  useEffect(() => {
    if (!link) {
      localStorage.setItem("panelGeneral", JSON.stringify(panelGeneral));
    }
  }, [panelGeneral]);

  return {
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
  };
};
