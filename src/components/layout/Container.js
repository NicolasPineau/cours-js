import React from 'react';

import { Container as BootstrapContainer } from 'react-bootstrap';

export const Container = ({ children }) => {
  return (
      <BootstrapContainer className="main-container">
        {children}
      </BootstrapContainer>
  );
};
