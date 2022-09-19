import React, { useState, useEffect } from 'react';
import { Card, Navbar, Button } from 'react-bootstrap';
import { CodeEditorEditable } from 'react-code-editor-editable'
import { CloudArrowUp, Code, PencilSquare, XOctagonFill } from 'react-bootstrap-icons';
import 'highlight.js/styles/dracula.css';

import { loadStorage, saveStorage } from '../../lib/local-storage';
import { useDebounce } from '../../hook/debounce';
import { getUserInfo } from '../../lib/helper/user';
import {useInterval} from "../../hook/interval";

export const Practice = ({ exerciseId, baseCode }) => {
  const { name: userName } = getUserInfo();
  const userId = loadStorage('userId');
  const [code, setCode] = useState(loadStorage(`exercise${exerciseId}`) || baseCode);
  const [status, setStatus] = useState(0);
  const [touched, setTouched] = useState(false);
  const [viewBaseCode, setViewBaseCode] = useState(false);
  const debouncedCode = useDebounce(code, 300);

  const loadStatus = () => {
    fetch(`/api/data.php?exerciseId=${exerciseId}&userId=${userId}`).then(res => res.json()).then(res => {
      res && setStatus(+res.state);
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

    fetch('/api/save.php', {
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
    setStatus(newStatus);
    const formData = new FormData();
    formData.append('json', JSON.stringify({
      userId,
      exerciseId,
      newStatus,
    }));

    fetch('/api/validate.php', {
      method: 'POST',
      body: formData,
    }).then(res => { console.log(res); });
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
      {code && code !== baseCode && <div className="actions flex flex--space-between">
        {status !== 3 && <Button variant="success" onClick={() => onChangeStatus(3)}>
          Valider <CloudArrowUp />
        </Button>}
        {status === 3 && <Button variant="danger" onClick={() => onChangeStatus(0)}>
          Annuler <XOctagonFill />
        </Button>}
      </div>}
    </Card>
    )
};
