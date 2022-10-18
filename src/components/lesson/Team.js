import React, { useCallback, useState, useEffect } from 'react';
import { Button, Pagination } from 'react-bootstrap';
import { Person, Check, BugFill, CloudArrowUp } from 'react-bootstrap-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { debounce } from 'lodash';
import TextareaAutosize from 'react-textarea-autosize';

import { useInterval } from '../../hook/interval';
import { getUserInfo } from '../../lib/helper/user';
import { Header } from '../layout/Header';
import { loadStorage } from '../../lib/local-storage';
import { useMaster } from '../../hook/master';
import { api } from '../../lib/helper/api';

const exercises = [...Array(22).keys()];

export const Team = () => {
  const [exerciseId, setExerciseId] = useState(1);
  const [answers, setAnswers] = useState([]);
  const { id: currentUserId } = getUserInfo();
  const isMaster = useMaster();

  const userKey = loadStorage('key') || currentUserId;

  const load = id => {
    api('data', { exerciseId: id, userId: userKey }).then(res => res.json()).then(res => {
      if (!res) {
        return;
      }

      const result = res.constructor === Array ? res : [res];
      result && setAnswers(result.map(row => ({ ...row, state: +row.state })));
    });
  };

  const { pause: pauseReadProcess, play: playReadProcess } = useInterval(() => {
    load(exerciseId);
  }, 3000);

  useEffect(() => {
    load(exerciseId);
  }, [exerciseId]);

  const onChange = (userId, questionId, newStatus, newMessage) => {
    pauseReadProcess();
    setAnswers(answers.map(answer => (
        answer.userid === userId && answer.question === questionId ? { ...answer, state: newStatus } : answer
    )));

    const formData = new FormData();
    formData.append('json', JSON.stringify({
      userId,
      exerciseId: questionId,
      newStatus,
      newMessage,
    }));

    api('validate', { userKey }, {
      method: 'POST',
      body: formData,
    }).then(() => {
      playReadProcess();
    });
  };

  const debouncedChange = useCallback(debounce((...values) => onChange(...values), 300), [answers]);

  return (
      <div className="team-codes">
        <Header />
        <div className="selector">
          {exercises.map(id => <Pagination.Item key={id} active={id === exerciseId - 1} onClick={() => setExerciseId(id + 1)}>
            {id + 1}
          </Pagination.Item>)}
        </div>
        <div className="codes">
          {answers.map(({ username, userid, question, answer, state, message }, key) => <div className="answer" key={`answer${key}`}>
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
                  <Button variant="danger" onClick={() => onChange(userid, question, 2, message)}>
                    <BugFill />
                  </Button>
                  <Button variant="success" onClick={() => onChange(userid, question, 1, message)}>
                    <Check />
                  </Button>
                </> : (userid === currentUserId && <Button variant="primary" onClick={() => onChange(userid, question, 3, message)}>
                  <CloudArrowUp />
                </Button>)}
              </div>
            </div>
            {isMaster && <div className="message">
                <TextareaAutosize
                  maxRows={5}
                  key={`${userid}_${question}`}
                  name="message"
                  defaultValue={message}
                  onChange={({ target: { value } }) => debouncedChange(userid, question, state, value)}
                />
            </div>}
          </div>)}
        </div>
        <div className="footer">
          <Button variant="primary" onClick={() => window.history.back()}>
            Retour
          </Button>
        </div>
      </div>
  );
};
