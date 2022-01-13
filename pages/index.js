
import { useFormik} from 'formik'

import Router from 'next/router'
import Header from '../components/Header'

const validate = values => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'заполните поле';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'допустимо не более 15 символов';
  }

  if (!values.lastName) {
    errors.lastName = 'заполните поле';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'допустимо не более 20 символов';
  }

  if (!values.patronymic) {
    errors.patronymic = 'заполните поле';
  } else if (values.patronymic.length > 20) {
    errors.patronymic = 'допустимо не более 20 символов';
  }

  return errors;
};

export default function Home() {
  const formik = useFormik({
    initialValues: {
       firstName: '',
        lastName: '',
        patronymic: '',
    },
    validate,
    onSubmit: async values => {
           
        const res = await fetch('/api/fio', {
          body: JSON.stringify({
            firstName: values.firstName,
             lastName: values.lastName,
            patronymic: values.patronymic,
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
          Router.push('/contact-info');
        }//если успешно отправлено переходим к следующему шагу
    }
 })
  return (
    <div>
      <Header />
      <style jsx global>{
        `.slide1 {
          background-color: rgb(245, 243, 243);
        }
        `
      }
      </style>
      <div className='main_content'>
      <h1>Личная информация</h1>
      <form onSubmit={formik.handleSubmit}>
       
       <input
         id="firstName"
         name="firstName"
         type="text"
         placeholder='Имя'
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.firstName}
       />
       {formik.touched.firstName && formik.errors.firstName ? <div className="error_message">
         {formik.errors.firstName}</div>: null}


        
       <input
         id="lastName"
         name="lastName"
         placeholder='Фамилия'
         type="text"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.lastName}
       />
       {formik.touched.lastName && formik.errors.lastName ? <div className="error_message">{formik.errors.lastName}</div> : null}
 
       <input
         id="patronymic"
         name="patronymic"
         type="text"
         placeholder='Отчество'
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.email}
       />
       {formik.touched.patronymic && formik.errors.patronymic ? <div className="error_message">{formik.errors.patronymic}</div> : null}
      
       <button type="submit">Далее</button>
       
     </form>
      </div>
      
    
    </div>
  )
  
}
