import React, { useState } from 'react';
import { Card, Image, Button, Icon, Transition } from 'semantic-ui-react';

import CommentForm from './CommentForm';
import Comments from './Comments';

import { getComments } from '../store/actions/commentActions';
import { connect } from 'react-redux';
import SharePostForm from './SharePostForm';

const Post = ({ post, getComments }) => {
  const [openComment, setOpenComment] = useState(false);

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
    <Card fluid color="blue">
      <Card.Content>
        <Image circular bordered floated="left" size="mini" src={imageSrc} />
        <Card.Header>{post.username}</Card.Header>
        <Card.Meta>{post.creationDate}</Card.Meta>
        <Card.Description>
          <pre style={{ fontFamily: 'inherit' }}>{post.content}</pre>
        </Card.Description>
      </Card.Content>
      <Card.Content style={{ padding: 0 }}>
        <Button style={styles.button}>
          <Icon name="heart outline" color="red" /> {post.likes}
        </Button>

        <SharePostForm post={post} imageSrc={imageSrc}>
          <Button style={styles.button}>
            <Icon name="share square outline" color="blue" /> {post.shares}
          </Button>
        </SharePostForm>
        <Button
          floated="right"
          style={styles.button}
          onClick={() => {
            !openComment && getComments(post.id);
            setOpenComment(!openComment);
          }}
        >
          <Icon name="comment outline" color="blue" /> {post.comments}
        </Button>
      </Card.Content>

      <Transition.Group animation="fade" duration={200}>
        {openComment && (
          <Card.Content>
            <CommentForm post={post} />
            <Comments imageSrc={imageSrc} />
          </Card.Content>
        )}
      </Transition.Group>
    </Card>
  );
};

export default connect(null, { getComments })(Post);

const styles = {
  button: {
    background: 'none'
  }
};
