import React from 'react';

import { Header } from './Header';
import { Footer } from './Footer';
import { Breadcrumbs } from './Breadcrumbs';
import { Menu } from './Menu';

export const Layout = ({ children }) => {
  return (
      <div className="page-layout">
        <section className="header-wrapper">
          <Header />
          <div className="breadcrumbs-wrapper">
            <Breadcrumbs />
          </div>
        </section>
        <section className="body-wrapper">
          <nav className="sidebar">
            <Menu />
          </nav>
          <div className="contents">
            {children}
          </div>
        </section>
        <section className="footer-wrapper">
          <Footer />
        </section>
      </div>
  );
};
