import React, { useState, useEffect } from 'react';
import './App.css';
import searchImage from './search.png'
import likeIcon from './like_icon.png'

function App() {
  const [searchText, setSearchText] = useState('random')
  const [imagesRender, setImagesRender] = useState([])

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

  function handleSearch(e) {
    e.preventDefault()

    imagesFetchRequest()
  }

  function openModal(id) {
    document.getElementById(id).style.display = 'block'
    document.body.classList.add('active-modal')
  }

  function closeModal(id) {
    document.getElementById(id).style.display = 'none'
    document.body.classList.remove('active-modal')
  }

  return (
    <div className='app'>
      <div className='top'>
        <h1>Responsive Image-Gallery App</h1>

        <form onSubmit={handleSearch} className='search-bar'>
          <input
            type='text'
            name='images'
            placeholder='Enter keywords to explore images...'
            onChange={(e) => setSearchText(e.target.value)}
            autoComplete='off'
            className='search-input'
          />
          <img
            src={searchImage}
            alt='search'
            onClick={handleSearch}
            className='search-lens'
          />
        </form>
      </div>

      <div className='image-container'>
        {imagesRender.map((image) => {
          return (
            <section key={image.id}>
              <div className='img-wrapper'>
                <img
                  src={image.urls.thumb}
                  alt={image.alt_description}
                  className='image'
                />
                <div className="img-overlay" onClick={() => openModal(image.id)}>
                  Click to view image details...
                </div>
              </div>

              <div className="modal" id={image.id}>
                <div onClick={() => closeModal(image.id)} className="overlay"></div>
                <div className="modal-content">
                  <img
                    src={image.urls.thumb}
                    alt={image.alt_description}
                    className='modal-image'
                  />

                  <div className='modal-image-info'>
                    <div className="photographer">
                      <img src={image.user.profile_image.small} alt='user profile image' className='photographer-image' />
                      <p>{image.user.name}</p>
                    </div>

                    <div className="likes">
                      <img src={likeIcon} alt='likes' className='likes-icon' />
                      <p>{image.likes}</p>
                    </div>
                  </div>

                  <button className="btn-close-modal" onClick={() => closeModal(image.id)}>
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