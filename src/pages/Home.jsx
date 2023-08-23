import React, { useState } from 'react';
import style from './Home.module.css';
import Login from '../components/Login/Login';
import icon3 from '../assets/icon3.svg';
import Registration from '../components/Registration/Registration';
import Restore from '../components/Restore/Restore';
import ContactUs from '../components/ContactUs/ContactUs';

const Home = () => {
  // открытие форм
  const [showMenu, setShowMenu] = useState([true, false, false, false]);

  const handleShowMenu = (index) => {
    let newArr = showMenu.map((item, i) => i === index ? true : false);
    setShowMenu(newArr);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {/* компоненты */}
        {showMenu[0] && <Login/>}
        {showMenu[1] && <Registration/>}
        {showMenu[2] && <Restore/>}
        {showMenu[3] && <ContactUs/>}
        {/* ссылки на формы */}
        <div className={style.linksWrapper}> 
          <div className={style.linkButton1} onClick={() => handleShowMenu(2)}>Забыли пароль?</div>
          {!showMenu[1] && 
            <div className={style.linkButton2} onClick={() => handleShowMenu(1)}>Регистрация</div>
          }
          {showMenu[1] &&
          <div className={style.linkButton2} onClick={() => handleShowMenu(0)}>Авторизация</div>
          }
        </div>
      </div>
      {/* footer */}
      <div className={style.footer}>
        <div className={style.footerColumn1}>
          <div className={style.footerTitle1}>Оферта</div>
          <div className={style.footerTitle1}>Контакты</div>
        </div>
        <div className={style.footerColumn2}>
          <div className={style.footerTitle2}>GETROAD ®</div>
          <div className={style.footerTitle3}>2021 - 2023</div>
        </div>
        <div className={style.footerColumn3}>
          <div>info@getroad.ru</div>
          {/* ссылка на форму */}
          <img src={icon3} alt="icon3" className={style.icon3} onClick={() => handleShowMenu(3)}/>
        </div>
      </div>
    </div>
  )
};

export default Home;