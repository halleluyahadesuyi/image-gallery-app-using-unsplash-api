import React, { useState, useEffect } from 'react';
import './App.css';
// import Modal from './Modal/Modal'

function App() {
  const [searchText, setSearchText] = useState('random')
  const [imagesRender, setImagesRender] = useState([])
  const [modal, setModal] = useState(false)
  const [modalImage, setModalImage] = useState({})

  const clientId = 'bHQPxBXq-GgLBzTlaxQY28uz_s4PP0Z15aTTjYFzzxU'
  const url = `https://api.unsplash.com/search/photos?page=1&per_page=20&query=${searchText}&client_id=${clientId}`

  function imagesFetchRequest() {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data.results)
        setImagesRender(data.results)})
  }

  useEffect(imagesFetchRequest, [])
  
  function handleSearch() {
    imagesFetchRequest()
  } 

  function toggleModal() {
    return (
      setModal(!modal)
    )
  };

  function handleModalImage() {
    setModalImage(() => {
        console.log('displayed')
    })
  }

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

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
        
        <input 
          type='text'
          name='images'
          placeholder='Type in keywords to search for images...'
          onChange={(e) => setSearchText(e.target.value)}
          autocomplete= 'off'
        />
        
        <button 
          type='submit' 
          onClick={handleSearch}
          className='searchBtn'
        >
            Search
        </button>
      </div>
        
      <div className='image-container'>
        {imagesRender.map((image) => {
          return (
            <>
              <div className='image'>
                <img
                  key={image.id}
                  src={image.urls.thumb}
                  alt={image.alt_description}
                  onClick={() => toggleModal()}
                />
              </div>

              {modal && (
                <div className="modal">
                  <div onClick={toggleModal} className="overlay"></div>
                  <div className="modal-content">
                    <img
                      key={image.id}
                      src={image.urls.thumb}
                      alt={image.alt_description}
                    />
                    
                    <button className="close-modal" onClick={toggleModal}>
                      &times;
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        )}
      </div>
    </div>

    
  )
}

export default App;