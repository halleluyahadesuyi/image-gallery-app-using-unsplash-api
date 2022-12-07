import React, { useState, useEffect } from 'react';
import './App.css';
import searchImage from './search.png'
import likeIcon from './like_icon.png'

function App() {
  // default states for 'search keyword (i.e food)' and a 
  // corresponding empty array to save returned (searched) data

  const [searchText, setSearchText] = useState('food')
  const [imagesRender, setImagesRender] = useState([])
  const [modalToggle, setModalToggle] = useState(false)

  // unsplash api base url, with query string parameters

  const url = `https://api.unsplash.com/search/photos?
                page=1&per_page=20&query=${searchText}
                &client_id=${process.env.REACT_APP_ACCESS_KEY}`

  // api fetch --- save returned data in setImagesRender()
  // to offset default rendered images

  function imagesFetchRequest() {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setImagesRender(data.results)
      })
  }

  // render default images (i.e food) only once when browser loads

  useEffect(imagesFetchRequest, [])

  // invoke callback function in handleSearch() when form is submitted by 
  // pressing 'Enter' on the keyboard, or clicking the 'search lens' image

  function handleSearch(e) {
    e.preventDefault()

    imagesFetchRequest()
  }

  // make modal visible, and disable vertical scrollbar

  function openModal(id) {
    document.getElementById(id).style.display = 'block'
    document.body.classList.add('active-modal')
  }

  // make modal invisible, and enable vertical scrollbar

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

      <p className='click-notice'>***Click on preferred image for more info <span>👇</span></p>

      <div className='img-container'>
        {imagesRender.map((image) => {
          return (
            <section key={image.id}>
              <div className='img-wrapper'>
                <img
                  src={image.urls.thumb}
                  alt={image.alt_description}
                  className='img'
                />
                <div className='img-overlay' onClick={() => openModal(image.id)}>
                  <p>View Image Details...</p>
                </div>
              </div>

              <div className='modal' id={image.id}>
                <div onClick={() => closeModal(image.id)} className='overlay'></div>
                <div className='modal-content'>
                  <img
                    src={image.urls.thumb}
                    alt={image.alt_description}
                    className='modal-img'
                  />

                  <div className='modal-img-info'>
                    <div className='photographer'>
                      <img src={image.user.profile_image.small} alt='user profile image' className='photographer-img' />
                      <p>{image.user.name}</p>
                    </div>

                    <div className='likes'>
                      <img src={likeIcon} alt='likes' className='likes-icon' />
                      <p>{image.likes}</p>
                    </div>
                  </div>

                  <button className='btn-close-modal' onClick={() => closeModal(image.id)}>
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