import Post from "../Post";
import {useContext,useEffect, useState} from "react";
import {useParams,Link} from "react-router-dom";
import {UserContext} from "../UserContext";

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/user/${id}`).then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);
   
  return (
    <>
        {userInfo.username === id && (
        <div className="create-row">
          <Link className="create-btn" to="/create">Create new post</Link>
        </div>
        )}
        <h2 className="user-head">Posts by {id}</h2>
        {posts.length===0 && (
            <p>No Posts to show :&#41;</p>
        )}
        <div className="post-container">
          {posts.length > 0 && posts.map(post => (
              <Post {...post} />
              ))}
        </div>
    </>
  );
}