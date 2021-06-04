import React from 'react';
import { Container, Nav } from 'react-bootstrap'

import { routes } from '../../resources/routing/routes';

export const Footer = () => {
  return (
      <Container className="footer">
        <Nav className="justify-content-center">
          <Nav.Item>
            <Nav.Link disabled>© 2021 - Licence informatique St Vincent</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="mailto:npineau@nodevo.com">Support (mail)</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link target="_blank" href="https://github.com/NicolasPineau/cours-js">Sources</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={routes.user}>Changer de nom</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={routes.team}>Equipe</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href={routes.quiz}>Quiz</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
  );
};
