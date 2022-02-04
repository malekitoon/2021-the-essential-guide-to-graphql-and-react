import React from 'react';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const CardItem = ({ item }) => (
  <Card>
    <Card.Body>
      <LinkContainer to={`/article/${item._id}`}>
        <Card.Link>
          <Card.Title>{item.title}</Card.Title>
        </Card.Link>
      </LinkContainer>

      <Card.Text>{item.excerpt}</Card.Text>
    </Card.Body>
    <Card.Footer>
      <div>
        <small>Created by {item.author.name} {item.author.lastname}</small>
      </div>
    </Card.Footer>
  </Card>
);

export default CardItem;
