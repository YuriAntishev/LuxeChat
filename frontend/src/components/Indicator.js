import React from 'react';
import Onlineicon from '../icons/onlineIcon.png';
import '../css/indicator.css';

const Indicator = ({users}) => (
    <div className="textContainer">
      {
        users
          ? (
            <div>
              <h4>Active</h4>
              <div className="activeContainer">
                <p>
                  {users.map(({name}) => (
                    <li key={name} className="activeItem dashSolid">
                      {name}
                      <img alt="Online Icon" src={Onlineicon}/>
                    </li>
                  ))}
                </p>
              </div>
            </div>
          )
          : null
      }
    </div>
  );

export default Indicator;