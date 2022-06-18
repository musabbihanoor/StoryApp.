import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BookStore } from "../../store/book";
import { AuthStore } from "../../store/auth";

const WriteStory = ({ close }) => {
  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  const [img, setImg] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    author: AuthStore.auth.user._id,
    genre: "",
    content: "",
    imgsrc: "",
    type: "story",
  });

  const { title, content } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await BookStore.createBook(formData);
    close(false);

    console.log(formData);
  };

  const onProofRead = () => {
    localStorage.setItem("title", title);
    localStorage.setItem("author", AuthStore.auth.user.name);
    localStorage.setItem("content", content);
  };

  return (
    <div className="absolute">
      <div className="absolute-content write-story">
        <button className="absolute-close" onClick={() => close(false)}>
          <i className="fa fa-times"></i>
        </button>
        <h1>Write a story</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="d-flex justify-content-between">
            <span>
              <label>title</label>
              <input name="title" value={title} onChange={onChange} required />
            </span>
            <span>
              <label>author name</label>
              <input
                name="author"
                value={AuthStore.auth.user.name}
                readOnly
                required
              />
            </span>
          </div>

          <div className="d-flex justify-content-between">
            <span>
              <select
                onChange={(e) =>
                  setFormData({ ...formData, genre: e.target.value })
                }>
                {BookStore.state.genres.map((x, i) => (
                  <option key={i} value={x.genre}>
                    {x.genre}
                  </option>
                ))}
              </select>
            </span>
            <span>
              <div className="img">
                <img
                  alt="file"
                  src={process.env.PUBLIC_URL + "/images/file.png"}
                />
                {/* <p>{imgsrc.name ? imgsrc.name : "Select"}</p> */}
                <label>
                  Upload
                  <input
                    type="file"
                    onChange={(e) => {
                      getBase64(e.target.files[0], (result) => {
                        console.log(result);
                        setFormData({ ...formData, imgsrc: result });
                      });
                    }}
                  />
                </label>
              </div>
            </span>
          </div>

          <label>story</label>
          <div className="story">
            <textarea
              name="content"
              value={content}
              onChange={onChange}
              required
            />
            <div className="d-flex justify-content-center">
              <Link
                target="_blank"
                className="btn btn-green m-1"
                to="/story/proofread"
                onClick={() => onProofRead()}>
                Proof Read
              </Link>
              <button type="submit" className="btn btn-primary btn-purple m-1">
                Published
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WriteStory;
