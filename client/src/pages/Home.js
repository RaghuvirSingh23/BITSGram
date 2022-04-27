import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";


// Contains the content of the homepage.

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let history = useHistory();

  const dates = [];
  const times = [];

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios.get("http://localhost:3001/posts").then((response) => {
        setListOfPosts(response.data);

        // conversion of date and time

        for (let i = 0; i < response.data.length; i++) {
          let element =new Date(response.data[i].createdAt);
          dates.push(element.getDate()+" "+element.getMonth()+" "+element.getFullYear()); 
          times.push(element.getHours()+":"+element.getMinutes()+":"+element.getSeconds()) 
        }
        console.log(dates);
        console.log(times);

        // console.log(response.data[0].createdAt);
        // let birthday = new Date('1995-12-17T03:24:00');

      });
    }
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  };

  // const DateTime = (createdAtId ) => {
  //   axios
  //     .get(
  //       "http://localhost:3001/posts",
  //       // { createdAt: createdAtId },
  //       { headers: { accessToken: localStorage.getItem("accessToken") } }
  //     )
  //     .then((response) => {
  //       setListOfPosts(
  //         listOfPosts.map((post) => {
  //           // if (post.id === postId) {
  //           //   if (response.data.liked) {
  //           //     return { ...post, Likes: [...post.Likes, 0] };
  //           //   } else {
  //           //     const likesArray = post.Likes;
  //           //     likesArray.pop();
  //           //     return { ...post, Likes: likesArray };
  //           //   }
  //           // } else {
  //           //   return post;
  //           // }
  //           response.data[i].createdAt
  //         })
  //       );
  //     });
  // };
  // let result = listOfPosts.map(value , key);
  // console.log(listOfPosts);
  // let result = 

  // let birthday = new Date('1995-12-17T03:24:00');
  const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  // const TIME_OPTIONS = { hour: 'numeric', month: 'short', day: 'numeric' };

  

  return (
    // this is the content of the home page
    // value is an object containing all information of the Posts Table.
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title"> {value.title} </div>
            <div
              className="body"
              onClick={() => {
                history.push(`/post/${value.id}`);
              }}
            >
              {value.postText}
            </div>
            <div className="footer">
              <div className="username">
                <Link to={`/profile/${value.UserId}`}> {value.username} </Link>
              </div>
              {/* <div >{[birthday.getHours() ,":", birthday.getMinutes() , " min "]}</div> */}
             
              {/* <div >{(Date(value.createdAt))}</div> */}
              <div >{(new Date(value.createdAt)).toLocaleDateString('en-US', DATE_OPTIONS)}</div>
              <div >{(new Date(value.createdAt)).toLocaleTimeString('en-US')}</div>
             
              {/* <div >{dates}</div> */}
              <div className="likeButton">
              <ThumbUpAltIcon
                onClick={() => {
                  likeAPost(value.id);
                }}
                // className={
                //   likedPosts.includes(value.id) ? "unlikeBttn" : "likeBttn"
                // }
              />
              </div>
              <div className="likeNumber">
              <label > {value.Likes.length}</label>
              </div>
              
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
