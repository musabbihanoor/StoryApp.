import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

const MainScreen = ({ auth: { isAuthenticated, user } }) => {
  const [books, setBooks] = useState(null);
  const [genre, setGenre] = useState(null);
  const [genres, setGenres] = useState(null);
  const [genreBooks, setGenreBooks] = useState(null);

  const fetchBooks = async () => {
    axios
      .get("http://18.191.249.121:4000/api/books/allbooks")
      .then((res) => setBooks(res.data.data))
      .catch((err) => console.log(err));
  };

  const fetchGenres = async () => {
    axios
      .get("http://18.191.249.121:4000/api/books/allgenres")
      .then((res) => setGenres(res.data.data))
      .catch((err) => console.log(err));
  };

  const fetchGenreBooks = async (genre) => {
    axios
      .get(`http://18.191.249.121:4000/api/books/filter/${genre}`)
      .then((res) => {
        setGenreBooks(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setGenreBooks(null);
      });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      return <Redirect to='/' />;
    }

    fetchBooks();
    fetchGenres();
    genre !== null && fetchGenreBooks(genre);
  }, [genre, isAuthenticated]);

  return (
    <div className='main'>
      <h1 className='fw-bold mb-5'>Welcome back, {user.name}</h1>
      <div className='ad d-flex justify-content-between'>
        <div className='item'>
          <img src='https://www.jagahonline.com/blog/wp-content/uploads/2020/08/Main-Title_8.jpg' />
          <h6 className='fw-bold mt-3'>
            Planning for a picnic? We've got you covered
          </h6>
        </div>
        <div className='item'>
          <img src='https://image.made-in-china.com/2f0j00jbyRBsJqycoE/2020-New-Good-Quality-English-Story-Kids-Children-Books-Printing-for-Child-Book.jpg' />
          <h6 className='fw-bold mt-3'>The story time with Jessica</h6>
        </div>
        <div className='item'>
          <img src='https://api.time.com/wp-content/uploads/2018/04/listening-to-music-headphones.jpg?quality=85&w=1200&h=628&crop=1' />
          <h6 className='fw-bold mt-3'>Listen and scream</h6>
        </div>
      </div>
      <h2 className='fw-bold my-5'>Top picks for you</h2>
      <div className='book d-flex'>
        {books ? (
          books.map((x) => (
            <div className='item' key={x._id}>
              <Link
                to={{
                  pathname: "/story/single",
                  state: {
                    bookid: x._id,
                    book: x,
                  },
                }}
              >
                <img
                  src={
                    x.imgsrc
                      ? x.imgsrc
                      : "http://www.vvc.cl/wp-content/uploads/2016/09/ef3-placeholder-image.jpg"
                  }
                />
                <h6 className='fw-bold mt-3'>{x.title}</h6>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <h2 className='fw-bold my-5'>See what's happening around you</h2>
      <div className='group d-flex'>
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((x, i) => (
          <Link to='/spaces' key={i}>
            <div className='item me-3 mb-3'>
              <img
                className='mb-5'
                src={process.env.PUBLIC_URL + "/images/Mask_Group_5_pk.png"}
              />
              <h5 className='fw-bold'>Group Name</h5>
              <h6>description of the group</h6>
            </div>
          </Link>
        ))}
      </div>
      <h2 className='fw-bold my-5'>Choose by genre</h2>
      {genres ? (
        <>
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option>Choose</option>
            {genres.map((x) => (
              <option key={x._id} value={x.genre}>
                {x.genre}
              </option>
            ))}
          </select>
          <div className='book d-flex'>
            {genreBooks ? (
              genreBooks.map((x) => (
                <Link
                  key={x._id}
                  to={{
                    pathname: "/story/single",
                    state: {
                      bookid: x._id,
                      book: x,
                    },
                  }}
                >
                  <div className='item'>
                    <img src={x.imgsrc} />
                    <h6 className='fw-bold mt-3'>{x.title}</h6>
                  </div>{" "}
                </Link>
              ))
            ) : (
              <p>No books</p>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MainScreen;
