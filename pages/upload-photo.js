import React, { Component } from "react"

import Router from 'next/router';
import Header from "../components/Header";

class UploadPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };

    this.onImageChange = this.onImageChange.bind(this);
  }
  

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      this.setState({
        image: URL.createObjectURL(img)
      });

    }
  };

 uploadPhoto = async event => {
  event.preventDefault()

  const res = await fetch('/api/photo', {
    body: JSON.stringify({
      photo: this.state.image
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
    Router.push('/final');
  }// если успешно - Готово!

 }

  render() {
    return (
      <>
    <Header />
    <div className="main_content">
    <form onSubmit={this.uploadPhoto}>
          <div>
          <style jsx global>{
        `.slide1 {
          background-color: rgb(245, 243, 243);
        }
        .slide2 {
          background-color: rgb(245, 243, 243);
        }
        .slide3 {
          background-color: rgb(245, 243, 243);
        }`
        
      }
      </style>
      
            <h1>Фотография</h1>
            {this.state.image != null ? <img className="downloaded" src={this.state.image}/> :
          
            <div className="image-upload">
              <label for="file-input">
                <div className="upload_photo"></div>
              </label>

              <input id="file-input" 
               type="file" name="myImage" onChange={this.onImageChange} />
            </div>
         
            }
          </div>
         
       <button type="submit">Далее</button>
       </form>
    </div>
     
      </>
    );
  }
}
export default UploadPhoto;