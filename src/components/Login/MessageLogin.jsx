import React, { useEffect, useRef, useState } from 'react';
import style from './MessageLogin.module.css';
import icon2 from '../../assets/icon2.svg';
import InputMask from 'react-input-mask';

function MessageLogin({handleOpen}) {
  const Ref = useRef(null);
  // timer
  const [timer, setTimer] = useState('00:00');
  // для смс-кода
  let arr = new Array(6).fill("");
  const [message, setMessage] = useState(arr);
  // Ошибки ввода
  const [errorMessages, setErrorMessages] =useState([
    {messageIsEmpty: false, message: "Поле обязательно к заполнению"},
    {messageIsNotFull: false, message: "смс - код должен быть не менее 6 цифр"},
  ]);

  // ввод полей
  const handleMessageChange = (e) => {
    let index = Number(e.target.attributes.ordernumber.value);
    let newArr = message.map((item, i) => i === index ? e.target.value : item);
    setMessage(newArr);
  };

  // Валидация ошибок ввода полей
  const validateMessageCode = () => {
    let indicatorOfValidation = 0;
    /* validate message code */
    let newMessage = message.filter(item => item !== "" ? item : "");
    if (newMessage.length === 0) {
      setErrorMessages([...errorMessages, errorMessages[0].messageIsEmpty=true]);
      indicatorOfValidation = 1;
    } else {
      setErrorMessages([...errorMessages, errorMessages[0].messageIsEmpty=false]);
    }
    if (newMessage.length < 6) {
      setErrorMessages([...errorMessages, errorMessages[1].messageIsNotFull=true]);
      indicatorOfValidation = 1;
    } else {
      setErrorMessages([...errorMessages, errorMessages[1].messageIsNotFull=false]);
    }
    return indicatorOfValidation;
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault(e);
    let indicatorOfValidation = validateMessageCode();
    if (indicatorOfValidation === 0) {
      let newArr = new Array(6).fill("");
      setMessage(newArr);
      console.log("смс-код: ", message.join(""));
      clearTimer();
      setTimer('00:00');
    } else {
      console.log("Данные полей формы не валидны");
    }
  };

  // timer part
  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return {
        total, minutes, seconds
    };
  };

  const startTimer = (e) => {
    let { total, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(    
        (minutes > 9 ? minutes : '0' + minutes) + ':'
        + (seconds > 9 ? seconds : '0' + seconds)
      )
    }
  };

  const clearTimer = (e) => {
  // начальное время для обратного отчета в хуке
  setTimer('01:30');

  if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000)
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    // поставим время для обратного отчета
    deadline.setSeconds(deadline.getSeconds() + 90);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  const onClickReset = () => {
    clearTimer(getDeadTime());
    let newArr = new Array(6).fill("");
    setMessage(newArr);
    setErrorMessages([
      {messageIsEmpty: false, message: "Поле обязательно к заполнению"},
      {messageIsNotFull: false, message: "смс - код должен быть не менее 6 цифр"},
    ]);
    console.log("смс-код отправлен");
  };

  return (
    <form onSubmit={handleSubmit} className={style.container}>
      {/* links buttons */}
      <div className={style.loginLinks}>
        <div className={style.linkButton2} onClick={() => handleOpen(0)}>Пароль</div>
        <div className={style.linkButton2} onClick={() => handleOpen(1)}>ЭЦП</div>
        <div className={style.linkButton1}>Телефон</div>
      </div>
      {/* ввод смс-кода */}
      <div className={style.messageInputWrapper}>
        <label className={style.messageLabel}>Введите смс - код</label>
        <div className={style.timer}>{timer}</div>
        <div className={style.pinCode}>
          <InputMask value={message[0]} ordernumber={0} onChange={handleMessageChange} mask="9" maskChar={""}
            type="text" className={style.pinCodeInput}/>
          <InputMask value={message[1]} ordernumber={1} onChange={handleMessageChange} mask="9" maskChar={""}  
            type="text" className={style.pinCodeInput}/>
          <InputMask value={message[2]} ordernumber={2} onChange={handleMessageChange} mask="9" maskChar={""}
            type="text" className={style.pinCodeInput}/>
          <InputMask value={message[3]} ordernumber={3} onChange={handleMessageChange} mask="9" maskChar={""}
            type="text" className={style.pinCodeInput}/>
          <InputMask value={message[4]} ordernumber={4} onChange={handleMessageChange} mask="9" maskChar={""}
            type="text" className={style.pinCodeInput}/>
          <InputMask value={message[5]} ordernumber={5} onChange={handleMessageChange} mask="9" maskChar={""}
            type="text" className={style.pinCodeInput}/>
        </div>
        {errorMessages[0].messageIsEmpty && <span>{errorMessages[0].message}</span>}
        {!errorMessages[0].messageIsEmpty && errorMessages[1].messageIsNotFull && <span>{errorMessages[1].message}</span>}
        {/* timer button */}
        <div className={style.repeatButtonWrapper}>
          <button className={style.repeatButton} type='reset' onClick={onClickReset}>Отправить повторно код</button>
          <img src={icon2} alt="icon2" className={style.icon2} />
        </div>
      </div>
      {/* buttons */}
      <button className={style.loginButton} type='submit'>ВОЙТИ</button>
      <button className={style.backButton} type='button' onClick={() => handleOpen(2)}>Назад</button>
    </form>
  )
};

export default MessageLogin;