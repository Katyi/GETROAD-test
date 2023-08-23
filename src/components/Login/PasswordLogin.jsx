import React, { useState } from 'react';
import style from './PasswordLogin.module.css';

function PasswordLogin({handleOpen}) {
  // Данные формы
  const [formData, setFormData] = useState({
    login: "",
    password: ""
  });
  // Ошибки ввода
  const [errorMessages, setErrorMessages] =useState([
    {loginIsEmpty: false, message: "Поле обязательно к заполнению"},
    {loginIsNotValidLength: false, message: "Логин должна быть не менее 2 и не более 20 букв"},
    {passwordIsEmpty: false, message: "Поле обязательно к заполнению"},
    {passwordIsNotValidLength: false, message: "Имя должно быть не менее 6 и не более 10 букв"},
  ]);
  
  // ввод логин
  const handleLoginChange = (e) => {
    setFormData({...formData, login: e.target.value});
  };
  // ввод пароля
  const handlePasswordChange = (e) => {
    setFormData({...formData, password: e.target.value});
  };

  // Валидация ошибок ввода полей
  const validateformData = () => {
    let indicatorOfValidation = 0;
    /* valide login */
    if (formData.login.length === 0 ) {
      setErrorMessages([...errorMessages, errorMessages[0].loginIsEmpty=true]);
      indicatorOfValidation = 1;
    } else {
      setErrorMessages([...errorMessages, errorMessages[0].loginIsEmpty=false]);
    }
    
    if (formData.login.length < 2 || formData.login.length > 20) {
      setErrorMessages([...errorMessages, errorMessages[1].loginIsNotValidLength=true]);
      indicatorOfValidation = 1;
    } else {
      setErrorMessages([...errorMessages, errorMessages[1].loginIsNotValidLength=false]);
    }

    // valid password
    if (formData.password.length === 0 ) {
      setErrorMessages([...errorMessages, errorMessages[2].passwordIsEmpty=true]);
      indicatorOfValidation = 1;
    } else {
      setErrorMessages([...errorMessages, errorMessages[2].passwordIsEmpty=false]);
    }
    
    if (formData.password.length < 6 || formData.password.length > 10) {
      setErrorMessages([...errorMessages, errorMessages[3].passwordIsNotValidLength=true]);
      indicatorOfValidation = 1;
    } else {
      setErrorMessages([...errorMessages, errorMessages[3].passwordIsNotValidLength=false]);
    }
    return indicatorOfValidation;
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    let indicatorOfValidation = validateformData();
    if (indicatorOfValidation === 0) {
      console.log("Данные формы: ", formData);
      setFormData({
        login: "",
        password: ""
      })
    } else {
      console.log("Данные полей формы не валидны");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.container}>
      {/* links buttons */}
      <div className={style.loginLinks}>
        <div className={style.linkButton1}>Пароль</div>
        <div className={style.linkButton2} onClick={() => handleOpen(1)}>ЭЦП</div>
        <div className={style.linkButton2} onClick={() => handleOpen(2)}>Телефон</div>
      </div>
      {/* login */}
      <div className={style.loginInputWrapper1}>
        <label className={style.loginLabel}>Логин</label>
        <input className={style.loginInput} type="text" placeholder='Логин'
          value={formData.login}
          onChange={handleLoginChange}
          autoComplete='nope'
        />
        {errorMessages[0].loginIsEmpty && <span>{errorMessages[0].message}</span>}
        {!errorMessages[0].loginIsEmpty && errorMessages[1].loginIsNotValidLength && <span>{errorMessages[1].message}</span>}
      </div>
      {/* password */}
      <div className={style.loginInputWrapper2}>
        <label className={style.loginLabel}>Пароль</label>
        <input className={style.loginInput} type="password" placeholder='Пароль'
          value={formData.password}
          onChange={handlePasswordChange}
          autoComplete='nope'
        />
        {errorMessages[2].passwordIsEmpty && <span>{errorMessages[2].message}</span>}
        {!errorMessages[2].passwordIsEmpty && errorMessages[3].passwordIsNotValidLength && <span>{errorMessages[3].message}</span>}
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

export default PasswordLogin;