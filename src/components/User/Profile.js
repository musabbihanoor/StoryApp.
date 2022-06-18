import React, { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { AuthStore } from "../../store/auth";
import { GroupStore } from "../../store/group";
import { observer } from "mobx-react";
import moment from "moment";
import { BookStore } from "../../store/book";

const Profile = observer(() => {
  const history = useHistory();
  const [switched, setSwitched] = useState(false);
  const [description, setDescription] = useState(
    AuthStore.auth.user.description ? AuthStore.auth.user.description : "",
  );
  const [dob, setDob] = useState(
    AuthStore.auth.user.dob ? AuthStore.auth.user.dob : null,
  );
  const [editDesc, setEditDesc] = useState(false);
  const [editDob, setEditDob] = useState(false);

  const editingDesc = (e) => {
    e.preventDefault();
    setEditDesc(false);
    AuthStore.editUser({
      email: AuthStore.auth.user.email,
      description: description,
    });
  };

  const editingDob = (e) => {
    e.preventDefault();
    setEditDob(false);
    AuthStore.editUser({
      email: AuthStore.auth.user.email,
      dob: dob,
    });
  };

  useEffect(() => {
    if (!AuthStore.auth.isAuthenticated) {
      history.push("/");
    }
    GroupStore.getGroups();
    BookStore.getUserBook({ userId: AuthStore.auth.user._id });
  }, [AuthStore.auth.isAuthenticated]);

  return (
    <div className="profile">
      <div className="bg">
        <div className="content">
          <button className="back">
            <i className="fa fa-arrow-left"></i>
          </button>
          <div className="user">
            <div className="left">
              <img alt="profile" src={AuthStore.auth.user.imgsrc} />
              <h1>{AuthStore.auth.user.name}</h1>
              <div className="switch">
                <button
                  className={`${switched && "switched"}`}
                  onClick={() => setSwitched(!switched)}>
                  <i className="fa fa-circle"></i>
                </button>
                <p>switch to reader</p>
              </div>
            </div>
            <div className="right">
              <h1>{AuthStore.auth.user.name}</h1>
              <div className="about">
                <h2>
                  about{" "}
                  {!editDesc ? (
                    <button
                      style={{ float: "right" }}
                      onClick={() => setEditDesc(true)}>
                      <i className="fa fa-edit"></i>
                    </button>
                  ) : (
                    <button
                      style={{ float: "right" }}
                      onClick={(e) => editingDesc(e)}>
                      <i className="fa fa-check"></i>
                    </button>
                  )}
                </h2>

                {editDesc ? (
                  <input
                    style={{ width: "100%" }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                ) : (
                  <p>{description}</p>
                )}
              </div>
              <h2>
                D.O.B{" "}
                {!editDob ? (
                  <button
                    style={{ float: "right" }}
                    onClick={() => setEditDob(true)}>
                    <i className="fa fa-edit"></i>
                  </button>
                ) : (
                  <button
                    style={{ float: "right" }}
                    onClick={(e) => editingDob(e)}>
                    <i className="fa fa-check"></i>
                  </button>
                )}
              </h2>
              {!editDob ? (
                <div className="dob">
                  <p>{moment(dob).format("DD")}</p>
                  <p>{moment(dob).format("MM")}</p>
                  <p>{moment(dob).format("YYYY")}</p>
                </div>
              ) : (
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              )}
            </div>
          </div>

          <div className="books ">
            <h1>My Books</h1>
            <div className="list">
              {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((x, i) => (
                <img
                  key={i}
                  alt="cover"
                  src="https://images-na.ssl-images-amazon.com/images/I/61ZKNw0xixL.jpg"
                />
              ))}
            </div>
          </div>

          <div className="books">
            <h1>My Stories</h1>
            <div className="list">
              {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((x, i) => (
                <img
                  key={i}
                  alt="cover"
                  src="https://images-na.ssl-images-amazon.com/images/I/61ZKNw0xixL.jpg"
                />
              ))}
            </div>
          </div>

          <div className="books groups">
            <h1>Groups for you</h1>
            <div className="list">
              {GroupStore.state.groups.length > 0 &&
                GroupStore.state.groups.map((x, i) => (
                  <>
                    {x.members.find(
                      (x) => AuthStore.auth.user.email === x.email,
                    ) && (
                      <div className="item me-3 mb-3">
                        <img
                          alt="group"
                          src={
                            x.imgsrc
                              ? x.imgsrc
                              : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
                          }
                        />
                        <div>
                          <h5 className="fw-bold">{x.title}</h5>
                          <Link>View</Link>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </div>
          </div>

          {/* <input
            type="file"
            onChange={(e) => {
              let base64String = "";
              var reader = new FileReader();
              reader.onload = function () {
                base64String = reader.result
                  .replace("data:", "")
                  .replace(/^.+,/, "");
                console.log(base64String);
              };
              reader.readAsDataURL(e.target.files[0]);
            }}
          /> */}
        </div>
      </div>
    </div>
  );
});

export default withRouter(Profile);
