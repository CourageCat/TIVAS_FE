import classNames from "classnames/bind";
import styles from "./AdminRoomTypeDetail.module.scss";
import RoomType from "~/components/RoomType";
import { useState } from "react";

import images from "~/assets/images";
import { Link } from "react-router-dom";

const cx = classNames.bind(styles);

function AdminRoomTypeDetail() {
  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("title")}>Type Room Detail</h1>
      <div className={cx("type-room-detail")}>
        {/*  TypeRoom */}
        <div className={cx("info-detail")}>
          <h2 className={cx("sub-title")}>About Type Room</h2>

          {/* Type Room Name Row */}
          <div className={cx("row")}>
            <label htmlFor="room-name" className={cx("text")}>
              Type Room Name
            </label>
            <input
              type="text"
              className={cx("info")}
              id="room-name"
              readOnly
              placeholder="1 Bedroom Deluxe"
            />
          </div>

          {/* Unit Amenities Row */}
          <div className={cx("row")}>
            <label htmlFor="unit-amenities" className={cx("text")}>
              Unit Amenities
            </label>
            <input
              type="text"
              className={cx("info")}
              id="unit-amenities"
              readOnly
              placeholder="Unit Amenities"
            />
          </div>

          {/*  */}
          <div className={cx("row-wrapper")}>
            {/*  */}
            <div className={cx("row")}>
              <label htmlFor="bedroom" className={cx("text")}>
                Bedroom
              </label>

              <select className={cx("info")} id="bedroom" disabled>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
            {/*  */}
            <div className={cx("row")}>
              <label htmlFor="bed-type" className={cx("text")}>
                Bed Type
              </label>

              <select className={cx("info")} id="bed-type" disabled>
                <option value="1">King</option>
                <option value="2">Queen</option>
                <option value="3">Already implemented</option>
              </select>
            </div>
          </div>

          <div className={cx("row-wrapper")}>
            {/*  */}
            <div className={cx("row")}>
              <label htmlFor="guest" className={cx("text")}>
                Guest
              </label>
              <input
                type="text"
                id="guest"
                readOnly
                className={cx("info")}
                placeholder="4"
              />
            </div>
            {/*  */}
            <div className={cx("row")}>
              <label htmlFor="area" className={cx("text")}>
                Area
              </label>
              <input
                type="text"
                id="area"
                readOnly
                className={cx("info")}
                placeholder="753 - 1482 Sq Ft"
              />
            </div>
          </div>

          {/* Desc Row */}
          <div className={cx("row")}>
            <label htmlFor="desc" className={cx("text")}>
              Description
            </label>
            <textarea
              id="desc"
              cols="30"
              rows="10"
              className={cx("text-area")}
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRoomTypeDetail;
