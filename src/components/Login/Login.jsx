import React, { useState } from 'react';
import style from './Login.module.css';
import PasswordLogin from './PasswordLogin';
import DigitalSignatureLogin from './DigitalSignatureLogin';
import PhoneLogin from './PhoneLogin';
import MessageLogin from './MessageLogin';
import icon from '../../assets/icon.svg';

function Login() {
  const [open, setOpen] = useState([true, false, false, false]);

  // submit form
  const handleOpen = (index) => {
    let newArr = open.map((item, i) => i === index ? true : false);
    setOpen(newArr);
  };

  return (
    <div className={style.container}>
      {/* titles */}
      <div className={style.title1}>GETROAD</div>
      <div className={style.title2}>Транспортный платежный сервис</div>
      <div className={style.title3}>Способы авторизации</div>

      {/* вкладки авторизации */}
      {open[0] &&
        <PasswordLogin handleOpen={handleOpen}/>
      }
      {open[1] &&
        <DigitalSignatureLogin handleOpen={handleOpen}/>
      }
      {open[2] &&
        <PhoneLogin handleOpen={handleOpen}/>
      }
      {open[3] &&
        <MessageLogin handleOpen={handleOpen}/>
      }
      {/* icons */}
      <img src={icon} alt="icon" className={style.icons}/>
    </div>
    
  )
};

export default Login;