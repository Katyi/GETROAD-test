
import React, { useState } from 'react';
import style from './PhoneLogin.module.css';
import InputMask from 'react-input-mask';

function PhoneLogin({handleOpen}) {
  const[phone, setPhone] = useState("");
  // Ошибки ввода
  const [errorMessages, setErrorMessages] =useState([
    {phoneIsEmpty: false, message: "Поле обязательно к заполнению"},
    {phoneIsNotFull: false, message: "Номер телефон должен быть не менее 11 цифр"},
  ]);

  // ввод телефона
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  // Валидация ошибок ввода полей
  const validateformData = () => {
    let indicatorOfValidation = 0;
    /* validate phoneNumber */
    let newPhone = phone.split("").filter(item => item !== "(" && item !== ")" && item !== "-" && item !== "_" && item !== " " && item !== "+" ? item : "").join("");
    if (newPhone === "") {
      setErrorMessages([...errorMessages, errorMessages[0].phoneIsEmpty=true]);
      indicatorOfValidation = 1;
    } else {
      setErrorMessages([...errorMessages, errorMessages[0].phoneIsEmpty=false]);
    }
    if (newPhone.length < 11) {
      setErrorMessages([...errorMessages, errorMessages[1].phoneIsNotFull=true]);
      indicatorOfValidation = 1;
    } else {
      setErrorMessages([...errorMessages, errorMessages[1].phoneIsNotFull=false]);
    }
    return indicatorOfValidation;
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    let indicatorOfValidation = validateformData();
    if (indicatorOfValidation === 0) {
      console.log("Телефон: ", phone);
      setPhone("");
      handleOpen(3);
    } else {
      console.log("Данные полей формы не валидны");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.container}>
      {/* links buttons */}
      <div className={style.loginLinks}>
        <div className={style.linkButton2} onClick={() => handleOpen(0)}>Пароль</div>
        <div className={style.linkButton2} onClick={() => handleOpen(1)}>ЭЦП</div>
        <div className={style.linkButton1}>Телефон</div>
      </div>
      {/* phone */}
      <div className={style.phoneNumberWrapper}>
        <div className={style.title}>Номер</div>
        {/* <input className={style.phoneNumberInput} type="text" /> */}
        <InputMask
          mask="+7 (999) 999-99-99"
          className={style.phoneNumberInput}
          type="text" placeholder='+7 (___) ___-__-__'
          value={phone}
          onChange={handlePhoneChange}
        />
        {errorMessages[0].phoneIsEmpty && <span>{errorMessages[0].message}</span>}
        {!errorMessages[0].phoneIsEmpty && errorMessages[1].phoneIsNotFull && <span>{errorMessages[1].message}</span>}
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

export default PhoneLogin;