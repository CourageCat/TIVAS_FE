import classNames from "classnames/bind";
import styles from "./DropFileImage.module.scss";
import images from "~/assets/images";
import { useEffect, useRef, useState } from "react";

const cx = classNames.bind(styles);

function DropImageFile(props) {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const files = Array.from(e.target.files);
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];

    const validFiles = files.filter((file) => allowedTypes.includes(file.type));

    const updatedList = [...fileList, ...validFiles];
    setFileList(updatedList);

    validFiles.forEach((file) => {
      file.preview = URL.createObjectURL(file);
    });

    console.log(updatedList);

    props.onFileChange(updatedList);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      props.setError(false);
    }, 4000);
    return () => {
      clearTimeout(timer);
    };
  }, [props, props.error]);

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    URL.revokeObjectURL(file.preview);
    props.onFileChange(updatedList);
  };

  return (
    <div
      ref={wrapperRef}
      className="drop-file-input"
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className={cx("upload-image")}>
        {props.error && <div className={cx("error")}></div>}
        <div className={cx("label")}>
          <img src={images.uploadImage} alt="Upload_image" />
          <p className={cx("title")}>Drag & drop your files here</p>
        </div>
        <input
          type="file"
          multiple
          className={cx("input")}
          onChange={onFileDrop}
          value=""
        />
      </div>
      {fileList.length > 0 && (
        <div className={cx("file-list_preview")}>
          {fileList.map((item, index) => {
            return (
              <div key={index} className={cx("file_preview")}>
                <img src={item.preview} alt="img" className={cx("img")} />
                <div className={cx("file_info")}>
                  <h4 className={cx("title")}>{item.name}</h4>
                </div>
                <span
                  className={cx("file_remove")}
                  onClick={() => fileRemove(item)}
                >
                  <img
                    src={images.trashIcon}
                    alt="icon"
                    className={cx("icon")}
                  />
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DropImageFile;
