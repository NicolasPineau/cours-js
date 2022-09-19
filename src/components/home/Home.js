import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import lessons from '../../resources/lessons/lessons';

export const Home = () => {
  const history = useHistory();

  const onModuleClicked = key => {
    history.push(`/${key}`);
  };

  return (
    <div className="home">
      <ListGroup defaultActiveKey="#link1">
        {Object.entries(lessons).map(([key, { title }]) => (
          <ListGroup.Item key={key} action href={`/${key}`} onClick={() => onModuleClicked(key)}>
            {key} - {title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
};
