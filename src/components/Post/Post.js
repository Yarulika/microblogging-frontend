import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Card,
  Header,
  Image,
  Button,
  Icon,
  Label,
  Transition,
  Divider
} from 'semantic-ui-react';

import CommentForm from '../CommentForm';
import Comments from '../Comments';

import { getComments } from '../../store/actions/commentActions';
import { connect } from 'react-redux';
import SharePostForm from './SharePostForm';
import MiniPost from './MiniPost';

const Post = ({ post, user, getComments }) => {
  const [thisPost, setThisPost] = useState(post);
  const [openComment, setOpenComment] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [liked, setLiked] = useState(false);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    setThisPost(post);
  }, [post, post.numberOfPostShares]);

  const imageSrc = (() => {
    const images = ['molly.png', 'steve.jpg', 'jenny.jpg', 'matthew.png'];

    const randomIndex = () => {
      return Math.round(Math.random() * 3);
    };

    return `https://react.semantic-ui.com/images/avatar/large/${
      images[randomIndex()]
    }`;
  })();

  return (
    <Card raised fluid>
      <Card.Content>
        <Header
          as="a"
          image
          onClick={() => {
            const path = location.pathname.includes('user')
              ? `${thisPost.username}`
              : `user/${thisPost.username}`;
            history.push(path);
          }}
        >
          <Image
            circular
            size="mini"
            src={'https://react.semantic-ui.com/images/avatar/large/molly.png'}
          />
          <Header.Content>
            {thisPost.username}
            <Header.Subheader>{thisPost.postCreatedDate}</Header.Subheader>
          </Header.Content>
        </Header>
        <Card.Description>
          <pre style={{ fontFamily: 'inherit', margin: 0 }}>
            {thisPost.content}
          </pre>
        </Card.Description>
        {thisPost.originalPostDTO && (
          <MiniPost post={thisPost.originalPostDTO} />
        )}
      </Card.Content>
      <Card.Content style={{ padding: 0 }}>
        <Button
          style={styles.button}
          onClick={async () => {
            await setLiked(!liked);
            const likedPost = { ...thisPost };
            likedPost.numberOfPostLikes = !liked ? 1 : 0;

            setThisPost(likedPost);
          }}
        >
          <Icon name={!liked ? 'heart outline' : 'heart'} color="red" />{' '}
          {thisPost.numberOfPostLikes}
        </Button>

        <Button
          style={styles.button}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <Icon name="share square outline" color="blue" />{' '}
          {thisPost.numberOfPostShares}
        </Button>

        <SharePostForm
          setOpenModal={setOpenModal}
          openModal={openModal}
          post={post}
          user={user}
          imageSrc={imageSrc}
        />

        <Button
          floated="right"
          style={styles.button}
          onClick={() => {
            !openComment && getComments(thisPost.postId, user.userId);
            setOpenComment(!openComment);
          }}
        >
          <Icon name="comment outline" color="blue" /> {post.numberOfComments}
        </Button>
      </Card.Content>

      <Transition.Group animation="fade" duration={200}>
        {openComment && (
          <Card.Content>
            <CommentForm post={post} />
            <Divider />
            <Comments postId={post.postId} imageSrc={imageSrc} />
          </Card.Content>
        )}
      </Transition.Group>
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps, { getComments })(Post);

const styles = {
  button: {
    background: 'none'
  }
};
