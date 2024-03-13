import classNames from "classnames/bind";
import styles from "./AdminCreateTypeRoom.module.scss";
import DropImageFile from "~/components/DropFileImage";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import ToastNotify from "~/components/ToastNotify";
import images from "~/assets/images";
import { getAllLocations } from "~/controllers/location";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
import { createNewProject, getAllTypeOfProject } from "~/controllers/project";
import { Backdrop, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { createNewTypeRoom } from "~/controllers/typeRoom";

const cx = classNames.bind(styles);

function AdminCreateTypeRoom() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);

  const [errorImage, setErrorImage] = useState(false);

  const [listImage, setListImage] = useState("");

  const { id } = useParams();

  const [typeRoomName, setTypeRoomName] = useState("");
  const [typeOfProject, setTypeOfProject] = useState("");
  const [listTypeOfProject, setListTypeOfProject] = useState([]);
  const [numberOfBedRooms, setNumberOfBedRooms] = useState(0);
  const [numberOfPersons, setNumberOfPersons] = useState(0);
  const [roomSize, setRoomSize] = useState(0);
  const [numberOfBathRooms, setNumberOfBathRooms] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [amenities, setAmenities] = useState("");
  const [bedType, setBedType] = useState("");
  const [desc, setDesc] = useState("");
  const [notify, setNotify] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const onFileChange = (files) => {
    setListImage(files);
  };

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
    const fetchTypeOfProject = async () => {
      const res = await getAllTypeOfProject(axiosInstance, id);
      if (res?.err === 0) setListTypeOfProject(res?.data);
      else setListTypeOfProject([]);
    };
    fetchTypeOfProject();
  }, []);

  useEffect(() => {
    if (notify?.err === 1) {
      toast.custom(() => (
        <ToastNotify type="error" title="Error" desc={notify?.message} />
      ));
      setNotify({});
    } else if (notify?.err === 0) {
      toast.custom(() => (
        <ToastNotify type="success" title="Success" desc={notify?.message} />
      ));
      setNotify({});
    }
  }, [notify]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    listImage.map((item) => formData.append("images", item));
    formData.append("name", typeRoomName);
    formData.append("bedrooms", numberOfBedRooms);
    formData.append("persons", numberOfPersons);
    formData.append("size", roomSize);
    formData.append("bedTypes", bedType);
    formData.append("type", typeOfProject);
    formData.append("quantity", quantity);
    formData.append("bathrooms", numberOfBathRooms);
    formData.append("amenities", amenities);
    formData.append("description", desc);
    setIsLoading(true);

    const res = await createNewTypeRoom(axiosInstance, id, formData);
    if (res) {
      setNotify(res);
    }
    setIsLoading(false);
    setListImage("");
    setTypeRoomName("");
    setTypeOfProject(1);
    setNumberOfBedRooms(0);
    setNumberOfPersons(0);
    setRoomSize(0);
    setNumberOfBathRooms(0);
    setQuantity(0);
    setAmenities("");
    setBedType("");
    setDesc("");
  };

  return (
    <div className={cx("wrapper")}>
      <Toaster position="top-right" richColors expand={true} />
      <h2 className={cx("heading")}>Create type room</h2>
      <form onSubmit={handleSubmit}>
        <div className={cx("form")}>
          <div className={cx("thumbnail")}>
            <DropImageFile
              error={errorImage}
              setError={setErrorImage}
              onFileChange={(files) => onFileChange(files)}
            />
          </div>

          <div className={cx("row")}>
            <div className={cx("input_compo")}>
              <label htmlFor="name_typeroom" className={cx("label")}>
                Typeroom name
              </label>
              <input
                type="text"
                id="name_typeroom"
                className={cx("input")}
                value={typeRoomName}
                onChange={(e) => setTypeRoomName(e.target.value)}
                placeholder="Enter type room name"
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
                <option value="">Choose the option</option>
                {listTypeOfProject.map((item, index) => (
                  <option key={index} value={item?.name}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("input_compo")}>
              <label htmlFor="number_of_bedrooms" className={cx("label")}>
                Number of bedrooms
              </label>
              <input
                type="number"
                id="number_of_bedrooms"
                className={cx("input")}
                value={numberOfBedRooms}
                onChange={(e) => setNumberOfBedRooms(e.target.value)}
                placeholder="Enter number of bedrooms"
              />
            </div>
            <div className={cx("input_compo")}>
              <label htmlFor="number_of_persons" className={cx("label")}>
                Number of persons
              </label>
              <input
                type="number"
                id="number_of_persons"
                className={cx("input")}
                value={numberOfPersons}
                onChange={(e) => setNumberOfPersons(e.target.value)}
                placeholder="Enter number of persons"
              />
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("input_compo")}>
              <label htmlFor="room_size" className={cx("label")}>
                Number of room size
              </label>
              <input
                type="number"
                id="room_size"
                value={roomSize}
                onChange={(e) => setRoomSize(e.target.value)}
                className={cx("input")}
                placeholder="Enter number of room size"
              />
            </div>
            <div className={cx("input_compo")}>
              <label htmlFor="bath_rooms" className={cx("label")}>
                Number of bathrooms
              </label>
              <input
                type="number"
                id="bath_rooms"
                value={numberOfBathRooms}
                onChange={(e) => setNumberOfBathRooms(e.target.value)}
                className={cx("input")}
                placeholder="Enter number of bathrooms"
              />
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("input_compo")}>
              <label htmlFor="quantity" className={cx("label")}>
                Number of rooms
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={cx("input")}
                placeholder="Enter the number of rooms"
              />
            </div>
            <div className={cx("input_compo")}>
              <label htmlFor="bath_rooms" className={cx("label")}>
                Enter amenities
              </label>
              <input
                type="text"
                id="amenities"
                value={amenities}
                onChange={(e) => setAmenities(e.target.value)}
                className={cx("input")}
                placeholder="Enter amenities"
              />
            </div>
          </div>
          <div className={cx("row")}>
            <div className={cx("input_compo")}>
              <label htmlFor="bed_type" className={cx("label")}>
                Bed type
              </label>
              <input
                type="text"
                id="bed_type"
                value={bedType}
                onChange={(e) => setBedType(e.target.value)}
                className={cx("input")}
                placeholder="Enter the bed type"
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

export default AdminCreateTypeRoom;
