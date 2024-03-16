import React, { useEffect } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import styles from "./ProjectDetail.module.scss";

import "photoswipe/style.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function SimpleGallery(props) {
    useEffect(() => {
        let lightbox = new PhotoSwipeLightbox({
            gallery: "#" + props.galleryID,
            children: "a",
            pswpModule: () => import("photoswipe"),
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, []);

    return (
        <div className="pswp-gallery" id={props.galleryID}>
            {props.images?.map((image, index) => (
                <a
                    href={image.largeURL}
                    data-pswp-width={image.width}
                    data-pswp-height={image.height}
                    key={props.galleryID + "-" + index}
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src={image.thumbnailURL}
                        alt=""
                        className={cx("img", {
                            "large-image": index === 0,
                            hidden: index > 4,
                            fit: index < 5,
                        })}
                    />
                </a>
            ))}
        </div>
    );
}

export default SimpleGallery;
