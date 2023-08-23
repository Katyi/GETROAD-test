import React, { useState } from 'react';
import style from './ContactUs.module.css';
import InputMask from 'react-input-mask';
import icon5 from '../../assets/icon5.svg';

function ContactUs() {
  // Данные формы
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    messageText: "",
  });
  // Ошибки ввода
  const [errorMessages, setErrorMessages] =useState([
    {fullNameIsEmpty: false, message: "Поле обязательно к заполнению"},
    {fullNameIsNotValidLength: false, message: "ФИО должно быть не менее 2 и не более 200 букв"},
    {emailIsNotValid: false, message: "Не соответствует формату электронной почты"},
    {phoneIsEmpty: false, message: "Поле обязательно к заполнению"},
    {phoneIsNotFull: false, message: "Номер телефон должен быть не менее 11 цифр"},
    {messageTextIsEmpty: false, message: "Поле обязательно к заполнению"},
    {messageTextIsNotValidLength: false, message: "Текстовое обращение должно быть не менее 2 и не более 600 букв"},
  ]);

  // Валидация ошибок ввода полей
  const validationFormdata = () => {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    let indicatorOfValidation = 0;

    /* valide fullName */
    if (formData.fullName.length === 0 ) {
      setErrorMessages([...errorMessages, errorMessages[0].fullNameIsEmpty=true]);
      indicatorOfValidation = 1;
    } else {
      setErrorMessages([...errorMessages, errorMessages[0].fullNameIsEmpty=false]);
    }
    
    if (formData.fullName.length < 2 || formData.fullName.length > 200) {
      setErrorMessages([...errorMessages, errorMessages[1].fullNameIsNotValidLength=true]);
      indicatorOfValidation = 1;
    } else {
      setErrorMessages([...errorMessages, errorMessages[1].fullNameIsNotValidLength=false]);
    }
    
    /* validate email */
    if (!regex.test(formData.email)) {
      setErrorMessages([...errorMessages, errorMessages[2].emailIsNotValid=true]);
      indicatorOfValidation = 1;
    } else {
      setErrorMessages([...errorMessages, errorMessages[2].emailIsNotValid=false]);
    }

    /* validate phone */
    let newPhone = formData.phone.split("").filter(item => item !== "(" && item !== ")" && item !== "-" && item !== "_" && item !== " " && item !== "+" ? item : "").join("");
    if (newPhone === "") {
      setErrorMessages([...errorMessages, errorMessages[3].phoneIsEmpty=true]);
      indicatorOfValidation = 1;
    } else {
      setErrorMessages([...errorMessages, errorMessages[3].phoneIsEmpty=false]);
    }
    if (newPhone.length < 11) {
      setErrorMessages([...errorMessages, errorMessages[4].phoneIsNotFull=true]);
      indicatorOfValidation = 1;
    } else {
      setErrorMessages([...errorMessages, errorMessages[4].phoneIsNotFull=false]);
    }

    // valid textMessage
    if (formData.messageText.length === 0 ) {
      setErrorMessages([...errorMessages, errorMessages[5].messageTextIsEmpty=true]);
      indicatorOfValidation = 1;
    } else {
      setErrorMessages([...errorMessages, errorMessages[5].messageTextIsEmpty=false]);
    }
    
    if (formData.messageText.length < 2 || formData.messageText.length > 600) {
      setErrorMessages([...errorMessages, errorMessages[6].messageTextIsNotValidLength=true]);
      indicatorOfValidation = 1;
    } else {
      setErrorMessages([...errorMessages, errorMessages[6].messageTextIsNotValidLength=false]);
    }
    return indicatorOfValidation;
  };

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    let indicatorOfValidation = validationFormdata();
    if (indicatorOfValidation === 0) {
      console.log("Данные формы: ", formData);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        messageText: "",
      });
    } else {
      console.log("Данные полей формы не валидны");
    }
  };

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      {/* title part */}
      <div className={style.part1}>
        <div className={style.title}>Свяжитесь с нами</div>
        <div className={style.description}>для получения дополнительной информации или предложения о сотрудничестве</div>
      </div>
      {/* main part */}
      <div className={style.part2}>
        {/* ФИО */}
        <div className={style.registrationInputWrapper1}>
          <label className={style.registrationInputLabel}>ФИО</label>
          <input type="text" placeholder='ФИО' className={style.registrationInput} value={formData.fullName} onChange={(e)=>setFormData({... formData, fullName: e.target.value})}/>
          {errorMessages[0].fullNameIsEmpty && <span>{errorMessages[0].message}</span>}
          {!errorMessages[0].fullNameIsEmpty && errorMessages[1].fullNameIsNotValidLength && <span>{errorMessages[1].message}</span>}
        </div>
        {/* email */}
        <div className={style.registrationInputWrapper2}>
          <label className={style.registrationInputLabel}>Электронная почта</label>
          <input type="email" placeholder='email@gmail.com' className={style.registrationInput1} value={formData.email} onChange={(e)=>setFormData({... formData, email: e.target.value})}/>
          {errorMessages[2].emailIsNotValid && <span>{errorMessages[2].message}</span>}
        </div>
        {/* phone */}
        <div className={style.registrationInputWrapper2}>
          <label className={style.registrationInputLabel}>Номер телефона</label>
          <InputMask
              mask="+7 (999) 999-99-99"
              className={style.registrationInput1}
              type="text" placeholder='+7 (___) ___-__-__'
              value={formData.phone}
              onChange={(e)=>setFormData({... formData, phone: e.target.value})}
            />
            {errorMessages[3].phoneIsEmpty && <span>{errorMessages[3].message}</span>}
            {!errorMessages[3].phoneIsEmpty && errorMessages[4].phoneIsNotFull && <span>{errorMessages[4].message}</span>}
        </div>
        {/* Текст обращения */}
        <div className={style.registrationInputWrapper3}>
          <textarea rows="4" cols="50" placeholder='Текст обращения...' className={style.MessageText} 
            value={formData.messageText} onChange={(e)=>setFormData({...formData, messageText: e.target.value})}>
          </textarea>
          {errorMessages[5].messageTextIsEmpty && <span>{errorMessages[5].message}</span>}
          {!errorMessages[5].messageTextIsEmpty && errorMessages[6].messageTextIsNotValidLength && <span>{errorMessages[6].message}</span>}
        </div>
        {/* Button */}
        <button className={style.contactUsButton} type='submit'>ОТПРАВИТЬ</button>
      </div>
      {/* icons */}
      <div className={style.part1}>
        <img src={icon5} alt="icon5" className={style.icon5}/>
      </div>
    </form>
  )
};

export default ContactUs;