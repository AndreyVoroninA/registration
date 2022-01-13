import { useFormik } from 'formik'

import Router from 'next/router';
import Header from '../components/Header';

const validate = values => {
   const errors = {};
   if (!values.num) {
    
   } else if (values.num.length != 11) {
     errors.num = 'Номер содержит 11 цифр';
   }
 
   if (!values.email) {
  
   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
     errors.email = 'Некорректный email';
   }
 
   return errors;
 };

export default function ContactInfo() {



const formik = useFormik({
   initialValues: {
      num: '',
      email: '',
   },
   validate,
   onSubmit: async values => {
        
    const res = await fetch('/api/contact', {
      body: JSON.stringify({
        num: values.num,
        email: values.email,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }) // передаю данные с формы
  
    const result = await res.json()
    console.log(result.status) /*
    получаю ответ status: 1, если успешно
    status: 0, если не удалось отправить
    */
    if (result.status == 1) {
      Router.push('/upload-photo');
    }// если успешно отправлено переходим к следующему шагу
}
})

  return (
    <div>
      <Header />
      <style jsx global>{
        `.slide1 {
          background-color: rgb(245, 243, 243);
        }
        .slide2 {
          background-color: rgb(245, 243, 243);
        }`
      }
      </style>
      <div className='main_content'>
      <h1>Контактная информация</h1>
      <form onSubmit={formik.handleSubmit}>
       <input
         id="num"
         name="num"
         type="text"
         placeholder='+7 (999) 999-99-99'
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.num}
       />
       {formik.touched.num && formik.errors.num ? <div className="error_message">{formik.errors.num}</div> : null}

 
       <input
         id="email"
         name="email"
         type="email"
         placeholder='email@example.com'
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.email}
       />
       {formik.touched.email && formik.errors.email ? <div className="error_message">{formik.errors.email}</div> : null}
       <button type="submit">Далее</button>
     </form>
      </div>
      
    </div>
  )
}