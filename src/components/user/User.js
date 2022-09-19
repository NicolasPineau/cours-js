import React, { useState, useEffect } from 'react';
import { Person, Award } from 'react-bootstrap-icons';
import {
  Col,
  FormControl,
  InputGroup,
  Button,
  Form,
} from 'react-bootstrap';

import { getUserInfo, setUserInfo } from '../../lib/helper/user';
import { useDebounce } from '../../hook/debounce';
import {loadStorage} from "../../lib/local-storage";

export const User = () => {
  const masterKey = loadStorage('key');
  const [userInfo, updateUserInfo] = useState(getUserInfo());
  const isMaster = masterKey === 'g0j1dxfuca0b11ee';
  const debouncedInfo = useDebounce(userInfo);

  const onChangeUserInfo = ({ target: { name, value } }) => {
    updateUserInfo({ ...userInfo, [name]: value });
  };

  useEffect(() => {
    if (!userInfo.id) {
      const id = new Date().valueOf().toString(36) + Math.random().toString(36).substr(2);
      updateUserInfo({ ...userInfo, id });
    }
  }, []);

  useEffect(() => {
    const { name = '', level, id } = debouncedInfo;

    setUserInfo(debouncedInfo);

    if (name.trim().length < 3) {
      return;
    }

    const formData = new FormData();
    formData.append('json', JSON.stringify({
      id: isMaster ? masterKey : id,
      name,
      level,
    }));

    fetch('/api/user.php', {
      method: 'POST',
      body: formData,
    }).then(res => { console.log(res); });
  }, [debouncedInfo, isMaster]);

  const goHome = () => {
    document.location = '/';
  };

  const levels = [
    {
      value: 1,
      title: 'Complètement perdu(e)',
    },
    {
      value: 2,
      title: 'Un peu largué(e)',
    },
    {
      value: 3,
      title: 'Je m\'accroche mais c\'est pas gagné',
    },
    {
      value: 4,
      title: 'Je m\'en sors à peu près',
    },
    {
      value: 5,
      title: 'J\'ai suivi assez facilement',
    },
    {
      value: 6,
      title: 'J\'ai suivi facilement',
    },
    {
      value: 7,
      title: 'Je me suis baladé(e)',
    },
  ];

  return (
      <div className="user">
        <h2>Bienvenue sur la remise à niveau ES6 / Vanilla JS.</h2>
        <p>
          Pour être identifié(e) lorsque vous ferez les exercices, choisissez un nom d'utilisateur :
        </p>
        <Form noValidate>
          <Form.Row>
            <Form.Group as={Col} md="6">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <Person />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    maxLength={50}
                    type="text"
                    placeholder="Votre nom ici"
                    name="name"
                    value={userInfo.name || ''}
                    onChange={onChangeUserInfo}
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="6">
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <Award />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl as="select" onChange={({ target: { selectedIndex: value }}) => onChangeUserInfo({ target: { name: 'level', value }})}>
                  <option>Votre niveau...</option>
                  {levels.map(({ value, title }) => (
                    <option selected={value === +userInfo.level} value={value}>{title}</option>
                  ))}
                </FormControl>
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group>
              <Button variant="primary" onClick={goHome}>OK</Button>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
  );
};
