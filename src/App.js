import React, { useState, useEffect } from 'react';
import './App.css';
import searchImage from './search.png' 

function App() {
  const [searchText, setSearchText] = useState('random')
  const [imagesRender, setImagesRender] = useState([])
  /* const [modal, setModal] = useState(false) */

  const clientId = 'bHQPxBXq-GgLBzTlaxQY28uz_s4PP0Z15aTTjYFzzxU'
  const url = `https://api.unsplash.com/search/photos?page=1&per_page=20&query=${searchText}&client_id=${clientId}`

  function imagesFetchRequest() {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data.results)
        setImagesRender(data.results)
      })
  }

  useEffect(imagesFetchRequest, [])

  function handleSearch() {
    imagesFetchRequest()
  }

  function openModal(id) {
    document.getElementById(id).style.display = 'block'

  };

  function closeModal(id) {
    document.getElementById(id).style.display = 'none'
  }

  /*  if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    } */

  /*{modal && (
    <div className="modal">
      <div onClick={toggleModal} className="overlay"></div>
      <div className="modal-content">
        <h2>Hello Modal</h2>
        <p> Lorem </p>
        <button className="close-modal" onClick={toggleModal}>
          &times;
        </button>
      </div>
    </div>
  )}*/

  return (
    <div className='app'>
      <div className='top'>
        <h1>Responsive Image-Gallery App</h1>

        <section className='search-bar'>
          <input
            type='text'
            name='images'
            placeholder='Enter keywords to explore images...'
            onChange={(e) => setSearchText(e.target.value)}
            autocomplete='off'
            className='search-input'
          />
          <img 
            src={searchImage}
            alt='search'
            onClick={handleSearch}
            className='search-lens' />
        </section>
        
      </div>

      <div className='image-container'>
        {imagesRender.map((image) => {
          return (
            <section>
              <div className='vignette-hover-effect' key={image.id}>
                <img
                  src={image.urls.thumb}
                  alt={image.alt_description}
                  onClick={() => openModal(image.id)}
                  className='image'
                />
              </div>

              <div className="modal" id={image.id}>
                <div onClick={closeModal} className="overlay"></div>
                <div className="modal-content">
                  <img
                    src={image.urls.thumb}
                    alt={image.alt_description}
                  />

                  <button className="close-modal" onClick={() => closeModal(image.id)}>
                    &times;
                  </button>
                </div>
              </div>

            </section>
          )
        }
        )}
      </div>
    </div>


  )
}

export default App;