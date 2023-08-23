import React, { useEffect, useRef, useState } from 'react';
import style from './Restore.module.css';
import icon2 from '../../assets/icon2.svg';
import icon4 from '../../assets/icon4.svg';
import InputMask from 'react-input-mask';

function Restore() {
  const Ref = useRef(null);
  // timer
  const [timer, setTimer] = useState('00:00');
  // открытие форм
  const [showFormPart, setShowFormPart] = useState([true, false, false, false]);
  // данные формы
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    phone: "",
    messageText: ""
  });
  // сообщение смс-код
  let arr = new Array(6).fill("");
  const [message, setMessage] = useState(arr);
  // Ошибки ввода
  const [errorMessages, setErrorMessages] =useState([
    {emailIsNotValid: false, message: "Не соответствует формату электронной почты"},
    {passwordIsEmpty: false, message: "Поле обязательно к заполнению"},
    {passwordIsNotValidLength: false, message: "Имя должно быть не менее 6 и не более 10 букв"},
    {repeatPasswordIsEmpty: false, message: "Поле обязательно к заполнению"},
    {isNotnotEqualToPassword: false, message: "Не равно паролю"},
    {phoneIsEmpty: false, message: "Поле обязательно к заполнению"},
    {phoneIsNotFull: false, message: "Номер телефон должен быть не менее 11 цифр"},
    {messageIsEmpty: false, message: "Поле обязательно к заполнению"},
    {messageIsNotFull: false, message: "смс - код должен быть не менее 6 цифр"},
  ]);

  // Валидация ошибок ввода полей
  const validationFormdata = (index) => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let indicatorOfValidation = 0;
    if (index === 1) {
      /* validate email */
      if (!regex.test(formData.email)) {
        setErrorMessages([...errorMessages, errorMessages[0].emailIsNotValid=true]);
        indicatorOfValidation = 1;
      } else {
        setErrorMessages([...errorMessages, errorMessages[0].emailIsNotValid=false]);
      }
    };

    if (index === 2) {
      /* validate password */
      if (formData.password.length === 0 ) {
        setErrorMessages([...errorMessages, errorMessages[1].passwordIsEmpty=true]);
        indicatorOfValidation = 1;
      } else {
        setErrorMessages([...errorMessages, errorMessages[1].passwordIsEmpty=false]);
      }
      
      if (formData.password.length < 6 || formData.password.length > 10) {
        setErrorMessages([...errorMessages, errorMessages[2].passwordIsNotValidLength=true]);
        indicatorOfValidation = 1;
      } else {
        setErrorMessages([...errorMessages, errorMessages[2].passwordIsNotValidLength=false]);
      }
    
      /* validate repeatPassword */
      if (formData.repeatPassword.length === 0 ) {
        setErrorMessages([...errorMessages, errorMessages[3].repeatPasswordIsEmpty=true]);
        indicatorOfValidation = 1;
      } else {
        setErrorMessages([...errorMessages, errorMessages[3].repeatPasswordIsEmpty=false]);
      }

      // check equality to password
      if (formData.password !== formData.repeatPassword) {
        setErrorMessages([...errorMessages, errorMessages[4].isNotnotEqualToPassword=true]);
        indicatorOfValidation = 1;
      } else {
        setErrorMessages([...errorMessages, errorMessages[4].isNotnotEqualToPassword=false]);
      }
    }
    
    if (index === 3) {
      /* validate phone */
      let newPhone = formData.phone.split("").filter(item => item !== "(" && item !== ")" && item !== "-" && item !== "_" && item !== " " && item !== "+" ? item : "").join("");
      if (newPhone === "") {
        setErrorMessages([...errorMessages, errorMessages[5].phoneIsEmpty=true]);
        indicatorOfValidation = 1;
      } else {
        setErrorMessages([...errorMessages, errorMessages[5].phoneIsEmpty=false]);
      }
      if (newPhone.length < 11) {
        setErrorMessages([...errorMessages, errorMessages[6].phoneIsNotFull=true]);
        indicatorOfValidation = 1;
      } else {
        setErrorMessages([...errorMessages, errorMessages[6].phoneIsNotFull=false]);
      }
    }

    if (index === 4) {
      /* validate message */
      let newMessage = message.filter(item => item !== "" ? item : "");
      if (newMessage.length === 0) {
        setErrorMessages([...errorMessages, errorMessages[7].messageIsEmpty=true]);
        indicatorOfValidation = 1;
      } else {
        setErrorMessages([...errorMessages, errorMessages[7].messageIsEmpty=false]);
      }
      if (newMessage.length < 6) {
        setErrorMessages([...errorMessages, errorMessages[8].messageIsNotFull=true]);
        indicatorOfValidation = 1;
      } else {
        setErrorMessages([...errorMessages, errorMessages[8].messageIsNotFull=false]);
      }
    }

    return indicatorOfValidation;
  };

  // открытие форм
  const handleOpenPart = (index) => {
    let indicatorOfValidation = validationFormdata(index);
    if (indicatorOfValidation === 0) {
      let newArr = showFormPart.map((item, i) => i === index ? true : false);
      setShowFormPart(newArr);
    } else {
      console.log("Поле формы не валидно");
    }
  };

  // для смс-кода
  const handleMessageChange = (e) => {
    let index = Number(e.target.attributes.ordernumber.value);
    let newArr = message.map((item, i) => i === index ? e.target.value : item);
    setMessage(newArr);
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    let indicatorOfValidation = validationFormdata(4);
    if (indicatorOfValidation === 0) {
      console.log("Данные формы: ", formData);
      setFormData({
        email: "",
        password: "",
        repeatPassword: "",
        phone: "",
        messageText: ""
      });
      let newArr = new Array(6).fill("");
      setMessage(newArr);
      clearTimer();
      setTimer('00:00');
    } else {
      console.log("Поле формы не валидно");
    }
    console.log("Данные формы: ", formData);
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
      {emailIsNotValid: false, message: "Не соответствует формату электронной почты"},
      {passwordIsEmpty: false, message: "Поле обязательно к заполнению"},
      {passwordIsNotValidLength: false, message: "Имя должно быть не менее 6 и не более 10 букв"},
      {repeatPasswordIsEmpty: false, message: "Поле обязательно к заполнению"},
      {isNotnotEqualToPassword: false, message: "Не равно паролю"},
      {phoneIsEmpty: false, message: "Поле обязательно к заполнению"},
      {phoneIsNotFull: false, message: "Номер телефон должен быть не менее 11 цифр"},
      {messageIsEmpty: false, message: "Поле обязательно к заполнению"},
      {messageIsNotFull: false, message: "смс - код должен быть не менее 6 цифр"},
    ]);
    console.log("смс-код отправлен");
  };

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      {/* title */}
      <img src={icon4} alt="icon4" className={style.icon4}/>
      <div className={style.title}>Восстановление доступа</div>
      {/* form 1 */}
      {showFormPart[0] &&
      <div className={style.part}>
        {/* email */}
        <div className={style.restoreInputWrapper}>
          <label className={style.restoreInputLabel}>Ваш Email</label>
          <input type="email" placeholder='email@gmail.com' className={style.restoreInput} value={formData.email} onChange={(e)=>setFormData({... formData, email: e.target.value})}/>
          {errorMessages[0].emailIsNotValid && <span>{errorMessages[0].message}</span>}
          <div className={style.description1}>Укажите электронную почту как основную для Вашего аккаунта</div>
        </div>
        <button className={style.restoreButton} type='button' onClick={()=>handleOpenPart(1)}>ДАЛЕЕ</button>
      </div>
      }
      {/* form 2 */}
      {showFormPart[1] &&
      <div className={style.part}>
        {/* password */}
        <div className={style.restoreInputWrapper1}>
          <label className={style.restoreInputLabel}>Новый пароль</label>
          <input type="text" placeholder='Пароль' className={style.restoreInput} value={formData.password} onChange={(e)=>setFormData({... formData, password: e.target.value})}/>
          {errorMessages[1].passwordIsEmpty && <span>{errorMessages[1].message}</span>}
          {!errorMessages[1].passwordIsEmpty && errorMessages[2].passwordIsNotValidLength && <span>{errorMessages[2].message}</span>}
        </div>
        {/* repeatpassword */}
        <div className={style.restoreInputWrapper2}>  
          <label className={style.restoreInputLabel}>Повторите</label>
          <input type="text" placeholder='Пароль' className={style.restoreInput} value={formData.repeatPassword} onChange={(e)=>setFormData({... formData, repeatPassword: e.target.value})}/>
          {errorMessages[3].repeatPasswordIsEmpty && <span>{errorMessages[3].message}</span>}
          {!errorMessages[3].repeatPasswordIsEmpty && errorMessages[4].isNotnotEqualToPassword && <span>{errorMessages[4].message}</span>}
        </div>
        <button className={style.restoreButton1} type='button' onClick={()=>handleOpenPart(2)}>ДАЛЕЕ</button>
      </div>
      }
      {/* form 3 */}
      {showFormPart[2] &&
      <div className={style.part}>
        {/* phone */}
        <div className={style.restoreInputWrapper}>
          <label className={style.restoreInputLabel}>Номер</label>
          <InputMask
            mask="+7 (999) 999-99-99"
            className={style.restoreInput1}
            type="text" placeholder='+7 (___) ___-__-__'
            value={formData.phone}
            onChange={(e)=>setFormData({... formData, phone: e.target.value})}
          />
          {errorMessages[5].phoneIsEmpty && <span>{errorMessages[5].message}</span>}
          {!errorMessages[5].phoneIsEmpty && errorMessages[6].phoneIsNotFull && <span>{errorMessages[6].message}</span>}
        </div>
        <button className={style.restoreButton} type='button' onClick={()=>handleOpenPart(3)}>ПОДТВЕРДИТЬ</button> 
      </div>
      }
      {/* form 4 */}
      {showFormPart[3] &&
      <div className={style.part}>
        {/* смс-код */}
        <div className={style.restoreInputWrapper3}>
          <label className={style.restoreInputLabel}>Введите смс - код</label>
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
          {errorMessages[7].messageIsEmpty && <span>{errorMessages[7].message}</span>}
          {!errorMessages[7].messageIsEmpty && errorMessages[8].messageIsNotFull && <span>{errorMessages[8].message}</span>}
          <div className={style.repeatButtonWrapper}>
            <button className={style.repeatButton} type='reset' 
              onClick={onClickReset}
            >Отправить повторно код</button>
            <img src={icon2} alt="icon2" className={style.icon2} />
          </div>
        </div>
        <button className={style.restoreButton} type='submit' onClick={()=>setFormData({...formData, messageText: message.join('') })}>ПОДТВЕРДИТЬ</button>
      </div>
      }
    </form>
  )
};

export default Restore;