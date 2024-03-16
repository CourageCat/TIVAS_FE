import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function RickTextEditor({ value, setValue }) {
  const Quill = ReactQuill.Quill;
  var Font = Quill.import("formats/font");
  Font.whitelist = ["Poppins", "Inter"];
  Quill.register(Font, true);

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: Font.whitelist }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <React.Fragment>
      <ReactQuill
        modules={modules}
        theme="snow"
        value={value}
        onChange={setValue}
      />
    </React.Fragment>
  );
}

export default RickTextEditor;
