import classNames from "classnames/bind";
import styles from "./RoomType.module.scss";

import images from "~/assets/images";
import { useState } from "react";
import RoomTypeDetail from "../RoomTypeDetail";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import { DialogTitle, IconButton, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getTypeRoom } from "~/controllers/project";
import { useDispatch, useSelector } from "react-redux";
import createAxios from "~/configs/axios";
const cx = classNames.bind(styles);

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function RoomType({ data }) {
  const [openDetail, setOpenDetail] = useState(false);
  const [object, setObject] = useState({});

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login.user);
  const axiosInstance = createAxios(dispatch, currentUser);
  const [listImages, setListImages] = useState([]);

  const handleClickOpen = async (id) => {
    setOpenDetail(true);

    const res = await getTypeRoom(axiosInstance, id);
    setObject(res?.data);
    setListImages(res?.data?.Images);
  };
  const handleClose = () => {
    setOpenDetail(false);
  };

  return (
    <div className={cx("room-type-wrapper")}>
      <div className={cx("room-type-block")}>
        <div className={cx("content-wrapper")}>
          {/* Left content */}
          <div className={cx("left-content")}>
            <div className={cx("left-row")}>
              <img
                src={data.images[0].pathUrl}
                alt="Thumb_Image"
                className={cx("thumb-img")}
              />
              <div className={cx("list-item")}>
                {/* First List */}
                <div className={cx("first-list")}>
                  <h2 className={cx("sub-title")}>{data.name}</h2>
                  <div className={cx("guest", "row")}>
                    <img
                      className={cx("icon")}
                      src={images.personIcon}
                      alt="Locate Icon"
                    />
                    <div className={cx("text")}>Guests</div>
                  </div>
                  <div className={cx("area", "row")}>
                    <img
                      className={cx("icon")}
                      src={images.areaIcon}
                      alt="Locate Icon"
                    />
                    <div className={cx("text")}>{data.size}</div>
                  </div>
                </div>
                {/* Second List */}
                <div className={cx("second-list")}>
                  <div className={cx("text", "bold")}>{data.bedrooms} Room</div>
                  <div className={cx("type-bed", "row")}>
                    <img
                      className={cx("icon")}
                      src={images.bedIcon}
                      alt="Locate Icon"
                    />
                    <div className={cx("text", "dif")}>{data.bedTypes}</div>
                  </div>

                  <div className={cx("bath", "row")}>
                    <img
                      className={cx("icon")}
                      src={images.bathIcon}
                      alt="Locate Icon"
                    />
                    <div className={cx("text")}>{data.bathrooms} Bathrooms</div>
                  </div>
                  <div className={cx("kitchen", "row")}>
                    <img
                      className={cx("icon")}
                      src={images.kitchenIcon}
                      alt="Locate Icon"
                    />
                    <div className={cx("text")}>Full Kitchen</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Right Content */}
          <div className={cx("right-content")}>
            <div
              className={cx("unit-btn")}
              onClick={() => handleClickOpen(data?.id)}
            >
              Unit Details
            </div>
          </div>
        </div>
      </div>
      <>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openDetail}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Room type
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <RoomTypeDetail data={object} listImages={listImages} />
          </DialogContent>
        </BootstrapDialog>
      </>
    </div>
  );
}

export default RoomType;
