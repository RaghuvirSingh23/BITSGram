import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import axios from "axios";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";

function Profile() {
  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const [listOfFollowers, setListOfFollowers] = useState([]);
  const { authState } = useContext(AuthContext);

  // let newUsername = username.replace("'" , '"')

  const Follow = (username) => {
    axios
      .post(
        "http://localhost:3001/Followers",
        { username: username },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        // setListOfPosts(
        //   listOfPosts.map((post) => {
        //     if (post.id === postId) {
        //       if (response.data.liked) {
        //         return { ...post, Likes: [...post.Likes, 0] };
        //       } else {
        //         const likesArray = post.Likes;
        //         likesArray.pop();
        //         return { ...post, Likes: likesArray };
        //       }
        //     } else {
        //       return post;
        //     }
        //   })
        // );
        // console.log(response.data);
        if (response.data.followed === false) {
          alert("You are no longer following " + username);
          setFollowers(followers - 1)
        } else {
          alert("You are now following  " + username);
          setFollowers(followers + 1)
        }
        // alert('following '+response.data.followed);
      });
  };

  // var count =0;
  // var count =0;
  // var master = 0;

  const [followers, setFollowers] = useState(2);


  const NoOfFollowers = (username) => {
    // console.log(listOfFollowers);

    axios
      .get("http://localhost:3001/Followers", { username: username })
      .then((response) => {
       var count = 0   
        
        for (let i = 0; i < response.data.length; i++) {
          // console.log("nahi gaya" + i)

          if (response.data[i].username === username) {
            // console.log(response.data[i].username)
            // console.log(username)
            count++;
            // console.log(count)

          } 
          
        }
        
        // console.log(count)
        setFollowers(count);
        alert(count)

        // return count;
      });
  };




  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };



  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  // console.log(count)
  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        {" "}
        <div className="ProfileInfo">
          <h1> {username}'s Account Settings: </h1>
        </div>
        {authState.username === username && (
          <button
            className="changePasswordButton"
            onClick={() => {
              history.push("/changepassword");
            }}
          >
            {" "}
            Change My Password
          </button>
        )}
      </div>
      <br></br>
      <div className="followersInfo">
      <div className="followUser">
        {/* now we are following the username from the logged in user */}
        <button
          className="changePasswordButton"
          onClick={() => {
            Follow(username);
          }}
        >
          Follow 
        </button>
      </div>

      {/* <h2>{username}'s Followers:</h2> */}

          {/* extra button */}
      <div className="numberOfFollowers">
        <button
          className="changePasswordButton"
          onClick={() => {
            NoOfFollowers(username);
            // console.log(followers);
          }}
        >
          Followers 
        </button>
        {/* <h3>Number of Followers of {username} = {followers}</h3> */}
        
      </div>
      </div>
      {/* <div>{count}</div> */}

      {/* {listOfFollowers.map((value, key) => {
        return (
          (<h2>{username}'s Followers:</h2>),
          // alert("hello")
          console.log("aagaye andar"),
          // console.log(value);
          console.log(value)
        );
      })} */}

      {/* <label > {value.Likes.length}</label> */}
      <br></br>
      <div className="myPostsHeading">
        <h1> {username}'s Posts </h1>
      </div>
      <div className="listOfPosts">
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
                <div className="username">{value.username}</div>
                <div>
                  {new Date(value.createdAt).toLocaleDateString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </div>
                <div>
                  {new Date(value.createdAt).toLocaleTimeString("en-US")}
                </div>

                <div className="likeButton">
                  <ThumbUpAltIcon />
                  <label> {value.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
