import React from 'react';
import { Button } from 'react-bootstrap';
import { List, XLg } from 'react-bootstrap-icons';
import UserRow from '../UserRow/UserRow';
import { getObjectKey } from '../../utils/constants';

function Panel({ userList, currentUser }) {
  const [IsPanelVisible,setPanelVisible] = React.useState(false);

  function togglePanelVisibility() {
    setPanelVisible(!IsPanelVisible);
  }

  return (
    <div className="panel h-100">
      <div className="panel__header d-flex justify-content-between align-items-center p-4" onClick={togglePanelVisibility}>
        <h4 className="fw-semibold text-dark mb-0">Сейчас онлайн</h4>
        <Button className="d-lg-none text-muted" variant="link" onClick={togglePanelVisibility}>{IsPanelVisible ? <XLg size={32} /> : <List size={32} />}</Button>
      </div>
      <div className={`panel__body ${IsPanelVisible && 'panel__body_visible'}`}>
        <div className="panel__wrapper d-flex flex-column p-4">
          {userList.map((item, index) => (
            <UserRow
              key={getObjectKey(item)}
              index={index}
              id={getObjectKey(item)}
              name={Object.values(item)[0]}
              currentUser={getObjectKey(currentUser)}
              userRow={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Panel;
