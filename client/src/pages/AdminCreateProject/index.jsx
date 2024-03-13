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

const cx = classNames.bind(styles);

function AdminCreateProject() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const thumbNailRef = useRef();
  const [errorImage, setErrorImage] = useState(false);
  const [listLocation, setListLocation] = useState([]);

  const [listImage, setListImage] = useState("");
  const [thumbNail, setThumbNail] = useState(null);

  const [projectName, setProjectName] = useState("");
  const [buildStatus, setBuildStatus] = useState(1);
  const [typeOfProject, setTypeOfProject] = useState(1);
  const [features, setFeatures] = useState("");
  const [attractions, setAttractions] = useState("");
  const [location, setLocation] = useState(1);
  const [desc, setDesc] = useState("");
  const [notify, setNotify] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    const formData = new FormData();
    setIsLoading(true);
    formData.append("thumbnail", thumbNail);
    listImage.map((item) => formData.append("images", item));
    formData.append("name", projectName);
    formData.append("description", desc);
    formData.append("buildingStatus", buildStatus);
    formData.append("location", location);
    formData.append("type", typeOfProject);
    formData.append("features", features);
    formData.append("attractions", attractions);

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
    setFeatures("");
    setAttractions("");
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
              <label htmlFor="Features" className={cx("label")}>
                Features
              </label>
              <input
                type="text"
                id="Features"
                value={features}
                onChange={(e) => setFeatures(e.target.value)}
                className={cx("input")}
                placeholder="Enter features"
              />
            </div>
            <div className={cx("input_compo")}>
              <label htmlFor="Attractions" className={cx("label")}>
                Attractions
              </label>
              <input
                type="text"
                id="Attractions"
                className={cx("input")}
                value={attractions}
                onChange={(e) => setAttractions(e.target.value)}
                placeholder="Enter atrractions"
              />
            </div>
          </div>
          <div className={cx("desc", "input_compo")}>
            <label htmlFor="desc" className={cx("label")}>
              Description
            </label>
            <textarea
              id="desc"
              cols="30"
              rows="10"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description"
              className={cx("text-area")}
            />
          </div>
        </div>

        <button type="submit" className={cx("action")}>
          Submit
        </button>
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
