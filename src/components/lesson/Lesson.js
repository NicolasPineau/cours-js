import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, ListGroup, ListGroupItem, ButtonGroup } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark, coyWithoutShadows } from 'react-syntax-highlighter/dist/esm/styles/prism'
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

import { Practice } from './Practice';
import { getRoute } from '../../lib/helper/routing';
import lessons from '../../resources/lessons/lessons';

export const Lesson = () => {
  const [markdown, setMarkdown] = useState('*chargement en cours...*');
  const { module, page } = useParams();
  const modules = Object.keys(lessons);
  const pages = Object.keys((lessons[module] || { pages: {} }).pages);
  const activePage = page || pages[0];
  const pageIndex = pages.findIndex(item => item === activePage);
  const moduleIndex = modules.findIndex(item => item === module);

  useEffect(() => {
    if (!activePage) {
      return;
    }

    const uri = `../markdown-resources/lessons/${module}/${activePage}.md`;
    fetch(uri).then(res => res.text()).then(res => { setMarkdown(res); });
  }, [module, activePage]);

  const markdownComponents = {
    ul: ({ node, children }) => {
      const liItems = children.filter(({type}) => type === 'li');
      if (liItems[0].props.children[0].type !== 'img') {
        return children;
      }

      return <ListGroup horizontal>
        {liItems.map(({key, props}) => (
            <ListGroupItem key={key} className="flex flex--items-center">
              {props.children}
            </ListGroupItem>
        ))}
      </ListGroup>
    },
    blockquote: ({ node, children }) => {
      const { children: text } = children.filter(child => child !== "\n")[0].props;
      const values = text.reduce((acc, cur) => {
        return acc.concat(typeof cur === 'string' ? cur.split("\n") : cur);
      }, []);
      const last = values.length > 1 ? values.pop() : null;

      return <blockquote className="blockquote">
        <Card>
          <Card.Body>
            {values.map((item, i) => <p key={i} className="mb-0">{item}</p>)}
            {last && <footer className="blockquote-footer">{last}</footer>}
          </Card.Body>
        </Card>
      </blockquote>;
    },
    pre: ({ node, children, ...props }) => {
        const { properties: { className: [cssClass] }, tagName } = node.children[0];

        if (tagName === 'code' && cssClass.match(/_exercise[\d]+$/)) {
          const [, exerciseId] = cssClass.match(/_exercise([\d]+)/) || [];
          const exerciseCode = node.children[0].children.map(({ value }) => value).filter(v => v);

          return <Practice exerciseId={exerciseId} baseCode={String(exerciseCode).replace(/\n$/, '')} />;
        }

        return <pre {...props}>{children}</pre>;
    },
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      let style = a11yDark;

      if (!node.properties.className) {
        return <code>{children}</code>;
      }

      if (/_before$/.test(match[1])) {
        match[1] = match[1].slice(0, -7);
        style = coyWithoutShadows;
      }

      return !inline && match ? (
          <SyntaxHighlighter
              style={style}
              language={match[1]}
              PreTag="div"
              children={String(children).replace(/\n$/, '')}
              {...props}
          />
      ) : (
          <code className={className} {...props} />
      )
    }
  };

  return (
      <div className={`module module--${module}`}>
        <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[gfm]} components={markdownComponents}>
          {markdown}
        </ReactMarkdown>
        <ButtonGroup>
          {pageIndex > 0 && <Link className="btn btn-primary" to={getRoute(module, pages[pageIndex - 1])}>
            {'< Précédent'}
          </Link>}
          {pageIndex < pages.length - 1 ? <Link className="btn btn-primary" to={getRoute(module, pages[pageIndex + 1])}>
            {'Suivant >'}
          </Link> : moduleIndex < modules.length - 1 && <Link className="btn btn-success" to={getRoute(modules[moduleIndex + 1])}>
            {'Module suivant >'}
          </Link>}
        </ButtonGroup>
      </div>
  );
};
