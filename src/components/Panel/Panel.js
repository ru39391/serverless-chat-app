import React from 'react';
import UserRow from '../UserRow/UserRow';
import { getObjectKey } from '../../utils/constants';

function Panel({ userList, currentUser }) {
  return (
    <div className="panel h-100">
      <div className="panel__header p-4">
        <h4 className="fw-semibold text-dark mb-0">Контакты</h4>
      </div>
      <div className="d-flex flex-column p-4">
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
  );
}

export default Panel;
