import React from 'react';
import { Accordion, Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import { getCurrentModule, getRoute } from '../../lib/helper/routing';
import lessons from '../../resources/lessons/lessons';
import Picture from '../../resources/pictures/web-developer.png';

export const Menu = () => {
  const { currentModule, currentPage } = getCurrentModule();

  if (document.location.pathname === '/') {
    return <img src={Picture} />;
  }

  return (
      <Accordion defaultActiveKey={currentModule}>
        {Object.entries(lessons).map(([key, { title, pages }]) => <Card key={key}>
          <Accordion.Toggle as={Card.Header} eventKey={key}>
            {title}
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={key}>
            <Card.Body>
              <ListGroup>
                {Object.entries(pages).map(([pageKey, pageTitle]) => (
                    <Link key={pageKey} to={getRoute(key, pageKey)}>
                      <ListGroup.Item active={pageKey === currentPage}>
                        {pageTitle}
                      </ListGroup.Item>
                    </Link>
                ))}
              </ListGroup>
            </Card.Body>
          </Accordion.Collapse>
        </Card>)}
      </Accordion>
  );
};
