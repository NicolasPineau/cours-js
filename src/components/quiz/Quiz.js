import React, { useState, useEffect } from 'react';
import {
  Button,
  InputGroup,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Pagination,
  Container,
  FormCheck
} from 'react-bootstrap';
import { PatchQuestionFill, PeopleFill } from 'react-bootstrap-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark, coyWithoutShadows } from 'react-syntax-highlighter/dist/esm/styles/prism'

import questions from '../../resources/quiz/questions';
import { useInterval } from '../../hook/interval';
import { Header } from '../layout/Header';
import { getUserInfo } from '../../lib/helper/user';
import { loadStorage } from '../../lib/local-storage';
import { useMaster } from '../../hook/master';
import { api } from '../../lib/helper/api';

export const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [teams, setTeams] = useState({});
  const [scores, setScores] = useState({});
  const [questionId, setQuestionId] = useState(null);
  const { id: userId } = getUserInfo();
  const masterKey = loadStorage('key');
  const isMaster = useMaster();

  useInterval(() => {
    api('question').then(res => res.json()).then(activeQuestionId => {
      setQuestionId(+activeQuestionId);
    });

    api('teams', { userId }).then(res => res.json()).then(res => {
      if (!res) {
        return;
      }

      setTeams(res.reduce((acc, { teamname, name }) => ({
        ...acc,
        [teamname]: [...new Set((acc[teamname] || []).concat(name))],
      }), {}));

      setScores(res.reduce((acc, { teamname, score }) => ({
        ...acc,
        [teamname]: score,
      }), {}));
    });
  }, 1000);

  useEffect(() => {
    api('getanswers', { userId }).then(res => res.json()).then(res => {
      if (!res) {
        return;
      }

      res && setAnswers(res.reduce((acc, { questionid, answer }) => ({ ...acc, [questionid]: +answer }), {}));
    });
  }, []);

  const changeQuestion = id => {
    api('setquestion', { userKey: masterKey, questionId: id }).then(() => {});
  };

  const chooseAnswer = answer => {
    setAnswers({ ...answers, [questionId]: answer });
    const formData = new FormData();
    formData.append('json', JSON.stringify({
      userId,
      questionId,
      answer,
    }));

    api('setanswer', {}, {
      method: 'POST',
      body: formData,
    }).then(res => { console.log(res); });
  };

  const generateTeams = () => {
    api('genteams', { userId, userKey: masterKey }).then(() => {});
  };

  const activeQuestion = questionId && questions.find(({ id }) => id === questionId);

  return (
      <div className="quiz">
        <Header />
        <h2 className="flex flex--center-all flex--with-gutter-left">
          <PatchQuestionFill />
          <span>Quiz en équipe</span>
        </h2>
        {isMaster && Object.keys(teams).length === 0 && <Row className="align-items-center">
          <Col md="3">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <PeopleFill />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <InputGroup.Append>
                <Button variant="primary" onClick={generateTeams}>Générer les équipes</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>}
        {Object.keys(teams).length > 0 && <Container fluid>
          <Row>
            <Col sm={4}>
              <div className="flex flex--with-gutter-left flex--start">
                {Object.entries(teams).map(([name, users], i) => (
                    <Card
                        bg={i % 2 === 0 ? 'light' : 'dark'}
                        text={i % 2 === 0 ? 'dark' : 'light'}
                        key={i}
                        style={{ width: '18rem' }}
                        className="mb-2"
                    >
                      <Card.Header>{name}</Card.Header>
                      <Card.Body>
                        <Card.Title>
                          Score : {scores[name]}
                        </Card.Title>
                        <Card.Text>
                          <ListGroup>
                            {users.map(user => (
                                <ListGroupItem variant={i % 2 === 0 ? 'light' : 'dark'} key={user}>{user}</ListGroupItem>
                            ))}
                          </ListGroup>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  )
                )}
              </div>
            </Col>
            <Col sm={8}>
              <div className="question">
                {isMaster && <div className="selector">
                  {questions.map(({ id }) => <Pagination.Item key={id} active={id === questionId} onClick={() => changeQuestion(id)}>
                    {id}
                  </Pagination.Item>)}
                </div>}
                {activeQuestion ? <>
                  <h3>Question #{questionId}</h3>
                  <Card>
                    <Card.Body>{activeQuestion.question}</Card.Body>
                  </Card>
                  <Container>
                    <div className="flex flex--col flex--with-gutter-top">
                      {activeQuestion.code && <div className="code">
                        <SyntaxHighlighter
                            style={coyWithoutShadows}
                            language="javascript"
                            PreTag="div"
                            children={`\n${activeQuestion.code}\n`}
                        />
                      </div>}
                      {activeQuestion.choices.map((choice, choiceKey) => (
                        <div className="flex flex--stretch" key={choiceKey}>
                          <FormCheck
                              inline
                              name="group1"
                              type="radio"
                              disabled={typeof answers[questionId] === 'number'}
                              checked={answers[questionId] === choiceKey}
                              onChange={() => chooseAnswer(choiceKey)}
                          />
                          <SyntaxHighlighter
                              style={a11yDark}
                              language="javascript"
                              PreTag="div"
                              children={choice}
                          />
                        </div>
                      ))}
                    </div>
                  </Container>
                </> : <></>}
              </div>
            </Col>
          </Row>
        </Container>}
      </div>
  );
};
