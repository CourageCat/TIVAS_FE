import classNames from "classnames/bind";
import styles from "./AdminCreateProject.module.scss";
import DropImageFile from "~/components/DropFileImage";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import ToastNotify from "~/components/ToastNotify";
import images from "~/assets/images";
import { getAllLocations } from "~/controllers/location";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { createNewProject } from "~/controllers/project";
import { Backdrop, CircularProgress } from "@mui/material";
import TippyHeadless from "@tippyjs/react/headless";
import RickTextEditor from "~/components/RickTextEditor";
import { getDataSuccess } from "~/redux/reviewProjectDetail";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function AdminCreateProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const thumbNailRef = useRef();
  const [errorImage, setErrorImage] = useState(false);
  const [listLocation, setListLocation] = useState([]);

  const [listImage, setListImage] = useState("");
  const [thumbNail, setThumbNail] = useState(null);

  const [projectName, setProjectName] = useState("");
  const [buildStatus, setBuildStatus] = useState(1);
  const [typeOfProject, setTypeOfProject] = useState("Villa");
  const [features, setFeatures] = useState(null);
  const [attractions, setAttractions] = useState(null);
  const [location, setLocation] = useState(1);
  const [desc, setDesc] = useState("");
  const [notify, setNotify] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [popupFeature, setPopupFeature] = useState(false);
  const [popupAttraction, setPopupAttraction] = useState(false);

  const [feature, setFeature] = useState("");
  const [attraction, setAttraction] = useState("");

  const onFileChange = (files) => {
    setListImage(files);
  };

  useEffect(() => {
    return () => {
      thumbNail && URL.revokeObjectURL(thumbNail.preview);
    };
  }, [thumbNail]);

  useEffect(() => {
    if (errorImage === true) {
      toast.custom(
        () => (
          <ToastNotify
            type="error"
            title="Error!"
            desc="You have selected the wrong image format, please select again!"
          />
        ),
        { duration: 2000 }
      );
    }
  }, [errorImage]);

  useEffect(() => {
    const fetchLocation = async () => {
      const res = await getAllLocations(axiosInstance);
      if (res?.err === 0) setListLocation(res?.data);
      else setListLocation([]);
    };
    fetchLocation();
  }, []);

  useEffect(() => {
    if (notify?.err === 1) {
      toast.custom(() => (
        <ToastNotify type="error" title="Error" desc={notify?.mess} />
      ));
      setNotify({});
    } else if (notify?.err === 0) {
      toast.custom(() => (
        <ToastNotify type="success" title="Success" desc={notify?.mess} />
      ));
      setNotify({});
    }
  }, [notify]);

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
      if (allowedTypes.includes(newFile?.type)) {
        const updatedList = newFile;
        updatedList.preview = URL.createObjectURL(updatedList);
        setThumbNail(updatedList);
      } else {
        // setError(true);
      }
    }
  };

  const fileRemove = () => {
    const updatedList = null;
    setThumbNail(updatedList);
    thumbNailRef.current.value = "";
    // URL.revokeObjectURL(image.preview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      listImage?.length === 0 ||
      !thumbNail ||
      projectName === "" ||
      typeOfProject === "" ||
      buildStatus === "" ||
      desc === "" ||
      location === "" ||
      features?.length === 0 ||
      attractions?.length === 0
    ) {
      return toast.custom(
        () => (
          <ToastNotify
            type="error"
            title="Error"
            desc={"Please fill in all information"}
          />
        ),
        { duration: 2000 }
      );
    }
    const formData = new FormData();
    setIsLoading(true);
    formData.append("thumbnail", thumbNail);
    listImage.map((item) => formData.append("images", item));
    formData.append("name", projectName);
    formData.append("description", desc);
    formData.append("buildingStatus", buildStatus);
    formData.append("location", location);
    formData.append("type", typeOfProject);
    formData.append("features", features?.join(","));
    formData.append("attractions", attractions?.join(","));

    const res = await createNewProject(axiosInstance, formData);
    if (res) {
      setNotify(res);
    }
    setIsLoading(false);
    setListImage("");
    setThumbNail(null);
    setProjectName("");
    setDesc("");
    setBuildStatus("");
    setLocation("");
    setTypeOfProject("");
    setFeatures(null);
    setAttractions(null);
    setFeature("");
    setAttraction("");
  };

  const handleOpenFeature = () => {
    setPopupFeature(true);
  };

  const handleClosePopupFeature = () => {
    setPopupFeature(false);
    setFeature("");
  };

  const handleAddFeature = () => {
    if (feature === "") {
      return toast.custom(() => (
        <ToastNotify type="warning" title="Warning" desc="Can not be empty" />
      ));
    }
    if (features) {
      setFeatures((prev) => [...prev, feature]);
    } else {
      setFeatures([feature]);
    }
  };

  const handleDeleteFeatures = (index) => {
    const newFeatures = features.filter((item, pos) => pos !== index);
    setFeatures(newFeatures);
  };

  const handleOpenAttraction = () => {
    setPopupAttraction(true);
  };

  const handleClosePopupAttraction = () => {
    setPopupAttraction(false);
    setAttraction("");
  };

  const handleAddAttraction = () => {
    if (attraction === "") {
      return toast.custom(() => (
        <ToastNotify type="warning" title="Warning" desc="Can not be empty" />
      ));
    }
    if (attractions) {
      setAttractions((prev) => [...prev, attraction]);
    } else {
      setAttractions([attraction]);
    }
  };

  const handleDeleteAttraction = (index) => {
    const newAttractions = attractions.filter((item, pos) => pos !== index);
    setAttractions(newAttractions);
  };

  const handleReviewPage = () => {
    if (
      listImage?.length === 0 ||
      !thumbNail ||
      projectName === "" ||
      typeOfProject === "" ||
      buildStatus === "" ||
      desc === "" ||
      location === "" ||
      features?.length === 0 ||
      attractions?.length === 0
    ) {
      return toast.custom(
        () => (
          <ToastNotify
            type="error"
            title="Error"
            desc={"Please fill in all information"}
          />
        ),
        { duration: 2000 }
      );
    }
    const form = {
      listImage,
      thumbNail,
      projectName,
      location,
      features,
      attractions,
      desc,
    };
    dispatch(
      getDataSuccess({
        form,
      })
    );
    window.open('/admin/createproject/reviewprojectdetail', '_blank');
  };

  return (
    <div className={cx("wrapper")}>
      <Toaster position="top-right" richColors expand={true} />
      <h2 className={cx("heading")}>Create new project</h2>

      <form onSubmit={handleSubmit}>
        <div className={cx("form")}>
          <div className={cx("thumbnail")}>
            <DropImageFile
              error={errorImage}
              setError={setErrorImage}
              onFileChange={(files) => onFileChange(files)}
            />
          </div>
          <div className={cx("input_compo")}>
            <label htmlFor="name_project" className={cx("label")}>
              Thumbnail
            </label>
            <input
              ref={thumbNailRef}
              type="file"
              id="name_project"
              className={cx("input")}
              placeholder="Enter project name"
              onChange={onFileDrop}
            />
            {thumbNail && (
              <div className={cx("file_preview")}>
                <img src={thumbNail.preview} alt="img" className={cx("img")} />
                <div className={cx("file_info")}>
                  <h4 className={cx("title")}>{thumbNail.name}</h4>
                </div>
                <span
                  className={cx("file_remove")}
                  onClick={() => fileRemove(thumbNail)}
                >
                  <img
                    src={images.trashIcon}
                    alt="icon"
                    className={cx("icon")}
                  />
                </span>
              </div>
            )}
          </div>

          <div className={cx("row")}>
            <div className={cx("input_compo")}>
              <label htmlFor="name_project" className={cx("label")}>
                Project name
              </label>
              <input
                type="text"
                id="name_project"
                className={cx("input")}
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            <div className={cx("input_compo")}>
              <label htmlFor="type" className={cx("label")}>
                Type project
              </label>
              <select
                className={cx("input")}
                id="type"
                value={typeOfProject}
                onChange={(e) => setTypeOfProject(e.target.value)}
              >
                <option value="Villa">Villa</option>
                <option value="Hotel">Hotel</option>
                <option value="Hotel,Villa">Villa and Hotel</option>
              </select>
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("input_compo")}>
              <label htmlFor="building" className={cx("label")}>
                Building status
              </label>
              <select
                className={cx("input")}
                id="building"
                value={buildStatus}
                onChange={(e) => setBuildStatus(e.target.value)}
              >
                <option value="1">Up coming</option>
                <option value="2">On going </option>
                <option value="3">Already implemented </option>
              </select>
            </div>
            <div className={cx("input_compo")}>
              <label htmlFor="location" className={cx("label")}>
                Location
              </label>
              <select
                className={cx("input")}
                id="location"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              >
                {listLocation.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("input_compo")}>
              <div className={cx("row")}>
                <label htmlFor="Features" className={cx("label")}>
                  Features
                </label>
                <TippyHeadless
                  visible={popupFeature === true}
                  placement="right-end"
                  interactive
                  render={(attrs) => (
                    <div
                      className={cx("box", "tippy-box")}
                      tabIndex="-1"
                      {...attrs}
                    >
                      <div className={cx("input_todo")}>
                        <input
                          type="text"
                          className={cx("input")}
                          value={feature}
                          onChange={(e) => setFeature(e.target.value)}
                        />
                        <div className={cx("btn")} onClick={handleAddFeature}>
                          Add
                        </div>
                      </div>
                    </div>
                  )}
                  onClickOutside={handleClosePopupFeature}
                >
                  <svg
                    className={cx("icon")}
                    onClick={handleOpenFeature}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                </TippyHeadless>
              </div>
              <div
                id="Features"
                className={cx("input", "todo-list")}
                placeholder="Please add features"
              >
                {features?.length > 0 ? (
                  <>
                    {features.map((item, index) => {
                      return (
                        <div key={index} className={cx("todo-item")}>
                          <span className={cx("title")}>{item}</span>
                          <svg
                            className={cx("icon_delete")}
                            onClick={() => handleDeleteFeatures(index)}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                          </svg>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <span className={cx("placeholder")}>
                    Click the + icon to add features
                  </span>
                )}
              </div>
            </div>
            <div className={cx("input_compo")}>
              <div className={cx("row")}>
                <label htmlFor="attractions" className={cx("label")}>
                  Attractions
                </label>
                <TippyHeadless
                  visible={popupAttraction === true}
                  placement="right-end"
                  interactive
                  render={(attrs) => (
                    <div
                      className={cx("box", "tippy-box")}
                      tabIndex="-1"
                      {...attrs}
                    >
                      <div className={cx("input_todo")}>
                        <input
                          type="text"
                          className={cx("input")}
                          value={attraction}
                          onChange={(e) => setAttraction(e.target.value)}
                        />
                        <div
                          className={cx("btn")}
                          onClick={handleAddAttraction}
                        >
                          Add
                        </div>
                      </div>
                    </div>
                  )}
                  onClickOutside={handleClosePopupAttraction}
                >
                  <svg
                    className={cx("icon")}
                    onClick={handleOpenAttraction}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                  </svg>
                </TippyHeadless>
              </div>
              <div
                id="Features"
                className={cx("input", "todo-list")}
                placeholder="Please add features"
              >
                {attractions?.length > 0 ? (
                  <>
                    {attractions.map((item, index) => {
                      return (
                        <div key={index} className={cx("todo-item")}>
                          <span className={cx("title")}>{item}</span>
                          <svg
                            className={cx("icon_delete")}
                            onClick={() => handleDeleteAttraction(index)}
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                          </svg>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <span className={cx("placeholder")}>
                    Click the + icon to add atrractions
                  </span>
                )}
              </div>
            </div>
          </div>
          {/* ========= */}
          <div className={cx("desc", "input_compo")}>
            <label htmlFor="desc" className={cx("label")}>
              Description
            </label>
            <RickTextEditor value={desc} setValue={setDesc} />
          </div>
        </div>
        <div className={cx("list-actions")}>
          <button
            type="button"
            onClick={handleReviewPage}
            className={cx("action")}
          >
            Review
          </button>
          <button type="submit" className={cx("action")}>
            Submit
          </button>
        </div>
      </form>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default AdminCreateProject;
