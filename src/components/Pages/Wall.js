import React, { useEffect, Suspense } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Container, Grid, Header, Message } from "semantic-ui-react";

import Nav from "../Nav";
import Post from "../Post";
import NewPostForm from "../NewPostForm";
import SideNav from "../SideNav";
import Notification from "../Notification";

const Wall = ({ user, posts }) => {
  const history = useHistory();

  const navigateTo = path => {
    history.push(path);
  };

  useEffect(() => {
    if (!user) {
      navigateTo("/login");
    }
  });

  if (!user) {
    return null;
  }

  return (
    <>
      <Nav />
      <Container style={styles.container}>
        <Notification />
        <Grid columns={2} stackable divided>
          <Grid.Row>
            <Grid.Column width={4}>
              <SideNav />
            </Grid.Column>
            <Grid.Column width={12}>
              <Header as="h5">Add a new post</Header>

              <NewPostForm user={user} />

              <Header as="h5">Recent posts</Header>
              {posts.length ? (
                <AllPosts posts={posts} />
              ) : (
                <Message style={{ textAlign: "center" }} info>
                  No post yet, please create one
                </Message>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    posts: state.posts,
    notification: state.notification
  };
};

export default connect(mapStateToProps)(Wall);

const AllPosts = ({ posts }) => {
  return (
    <>
      {posts.map(post => (
        <Post key={post.postId} post={post} />
      ))}
    </>
  );
};

const styles = {
  container: {
    paddingTop: "70px"
  }
};
