import React, { useState, useEffect } from 'react';
import { Card, Navbar, Button } from 'react-bootstrap';
import { CodeEditorEditable } from 'react-code-editor-editable'
import { CloudArrowUp, Code, PencilSquare, XOctagonFill, MegaphoneFill } from 'react-bootstrap-icons';
import 'highlight.js/styles/dracula.css';

import { loadStorage, saveStorage } from '../../lib/local-storage';
import { useDebounce } from '../../hook/debounce';
import { getUserInfo } from '../../lib/helper/user';
import { useInterval } from '../../hook/interval';
import { api } from '../../lib/helper/api';

export const Practice = ({ exerciseId, baseCode }) => {
  const { id: userId, name: userName } = getUserInfo();
  const [code, setCode] = useState(loadStorage(`exercise${exerciseId}`) || baseCode);
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState('');
  const [isWriting, setIsWriting] = useState(false);
  const [touched, setTouched] = useState(false);
  const [viewBaseCode, setViewBaseCode] = useState(false);
  const debouncedCode = useDebounce(code, 300);

  const loadStatus = () => {
    if (isWriting) {
      return;
    }

    api('data', { exerciseId, userId }).then(res => res.json()).then(res => {
      if (res) {
        setStatus(+res.state);
        setMessage(res.message || '');
      }
    });
  };

  useInterval(() => {
    loadStatus();
  }, 3000);

  useEffect(() => {
    if (!touched) {
      return;
    }

    const formData = new FormData();
    formData.append('json', JSON.stringify({
      userName,
      exerciseId,
      userId,
      code: debouncedCode
    }));

    api('save', {}, {
      method: 'POST',
      body: formData,
    }).then(res => { console.log(res); });
  }, [debouncedCode]);

  const onChangeCode = code => {
      setCode(code);
      saveStorage(`exercise${exerciseId}`, code);
      setTouched(true);
  };

  const onChangeStatus = newStatus => {
    setIsWriting(true);
    setStatus(newStatus);
    const formData = new FormData();
    formData.append('json', JSON.stringify({
      userId,
      exerciseId,
      newStatus,
    }));

    api('validate', { userKey: userId }, {
      method: 'POST',
      body: formData,
    }).then(() => {
      setIsWriting(false);
    });
  };

  const onToggleBaseCode = () => {
    setViewBaseCode(!viewBaseCode);
  };

  return (
    <Card className={`practice${status === 1 ? ' practice--ok' : ''}${status === 2 ? ' practice--ko' : ''}${status === 3 ? ' practice--ready' : ''}`}>
      {baseCode && <Navbar bg="light" expand="lg">
        {!viewBaseCode && <Button className="toggle-editor" size="sm" onClick={onToggleBaseCode} disabled={!baseCode || baseCode === code}>
          Voir le code de base <Code />
        </Button>}
        {viewBaseCode && <Button className="toggle-editor" size="sm" onClick={onToggleBaseCode} disabled={!baseCode || baseCode === code}>
          Revenir à l'éditeur <PencilSquare />
        </Button>}
      </Navbar>}
      <CodeEditorEditable
        value={(viewBaseCode ? baseCode : code) || ''}
        setValue={viewBaseCode ? () => {} : onChangeCode}
        width="100%"
        height={`${(viewBaseCode ? baseCode : code).split(/\r\n|\r|\n/).length * 24 + 40}px`}
        language="javascript"
        inlineNumbers
      />
      {message && <div className="message"><MegaphoneFill />
        {message.split('\n').map((item, key) => (
          <span key={key}>{item}<br/></span>
        ))}
      </div>}
      {code && code !== baseCode && <div className="actions flex flex--space-between">
        {(status !== 1 && status !== 3) && <Button variant="success" onClick={() => onChangeStatus(3)}>
          Valider <CloudArrowUp />
        </Button>}
        {(status === 1 || status === 3) && <Button variant="danger" onClick={() => onChangeStatus(0)}>
          Annuler <XOctagonFill />
        </Button>}
      </div>}
    </Card>
    )
};
