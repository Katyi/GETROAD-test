import React from 'react';
import style from './DigitalSignatureLogin.module.css';

// submit form
const handleSubmit = (event) => {
  event.preventDefault();
  console.log('Форма работает!');
};

function DigitalSignatureLogin({handleOpen}) {
  return (
    <form onSubmit={handleSubmit} className={style.container}>
      {/* links buttons */}
      <div className={style.loginLinks}>
        <div className={style.linkButton2} onClick={() => handleOpen(0)}>Пароль</div>
        <div className={style.linkButton1}>ЭЦП</div>
        <div className={style.linkButton2} onClick={() => handleOpen(2)}>Телефон</div>
      </div>
      {/* main part */}
      <div className={style.title}>Ваш сертификат</div>
      <div className={style.signatureData}>
        <div className={style.companyName}>ООО “АРТ ТЕХ”</div>
        <div className={style.Inn}>инн 5040174549</div>
        <div className={style.userName}>Дементьев Артур Романович</div>
      </div>
      {/* button */}
      <button className={style.loginButton} type='submit'>ВОЙТИ</button>
      {/* checkbox */}
      <div className={style.loginCheckbox}>
        <input type="checkbox" id="memorize" className={style.checkboxInput}/>
        <label htmlFor="memorize" className={style.checkboxLabel}>Запомнить</label>
      </div>
    </form>
  )
};

export default DigitalSignatureLogin;