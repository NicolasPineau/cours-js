import React, { useState, useEffect } from 'react';
import {Button, Pagination} from 'react-bootstrap';
import { Person, Check, BugFill, CloudArrowUp } from 'react-bootstrap-icons';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { useInterval } from '../../hook/interval';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { getUserInfo } from '../../lib/helper/user';
import { Header } from '../layout/Header';
import { loadStorage } from '../../lib/local-storage';

const exercises = [...Array(22).keys()];

export const Team = () => {
  const [exerciseId, setExerciseId] = useState(1);
  const [answsers, setAnswers] = useState([]);
  const { name: userName, id: currentUserId } = getUserInfo();
  const isMaster = userName === 'Nicolas Pineau' && loadStorage('key') === 'g0j1dxfuca0b11ee';

  const load = id => {
    const userId = loadStorage('key') || currentUserId;

    fetch(`/data.php?exerciseId=${id}&userId=${userId}`).then(res => res.json()).then(res => {
      if (!res) {
        return;
      }

      const result = res.constructor === Array ? res : [res];
      result && setAnswers(result.map(row => ({ ...row, state: +row.state })));
    });
  };

  const onChangeStatus = (userId, exerciseId, newStatus) => {
    setAnswers(answsers.map(answer => (
        answer.userid === userId && answer.question === exerciseId ? { ...answer, state: newStatus } : answer
    )));

    const formData = new FormData();
    formData.append('json', JSON.stringify({
      userId,
      exerciseId,
      newStatus,
    }));

    fetch('/validate.php', {
      method: 'POST',
      body: formData,
    }).then(res => { console.log(res); });
  };

  useInterval(() => {
    load(exerciseId);
  }, 3000);

  useEffect(() => {
    load(exerciseId);
  }, [exerciseId]);

  return (
      <div className="team-codes">
        <Header />
        <div className="selector">
          {exercises.map(id => <Pagination.Item key={id} active={id === exerciseId - 1} onClick={() => setExerciseId(id + 1)}>
            {id + 1}
          </Pagination.Item>)}
        </div>
        <div className="codes">
          {answsers.map(({ username, userid, question, answer, state }, key) => <div className="answer" key={`answer${key}`}>
            <div className={`code${state === 1 ? ' code--ok' : ''}${state === 2 ? ' code--ko' : ''}${state === 3 ? ' code--ready' : ''}`}>
              <SyntaxHighlighter
                  style={a11yDark}
                  language="javascript"
                  PreTag="div"
                  children={answer}
              />
            </div>
            <div className="user flex flex--space-between">
              <div className="user-info">
                <Person />
                {username}
              </div>
              <div className="user-actions">
                {isMaster ? <>
                  <Button variant="danger" onClick={() => onChangeStatus(userid, question, 2)}>
                    <BugFill />
                  </Button>
                  <Button variant="success" onClick={() => onChangeStatus(userid, question, 1)}>
                    <Check />
                  </Button>
                </> : (userid === currentUserId && <Button variant="primary" onClick={() => onChangeStatus(userid, question, 3)}>
                  <CloudArrowUp />
                </Button>)}
              </div>
            </div>
          </div>)}
          {answsers.length % 2 !== 0 && <div className="answer">
            <div className="code" />
          </div>}
        </div>
        <div className="footer">
          <Button variant="primary" onClick={() => window.history.back()}>
            Retour
          </Button>
        </div>
      </div>
  );
};
