import React from 'react'
import Image from 'next/image'
import flaskImage from '@/assets/images/flask.png'
import './goart.css'
export default function page() {
  return (
    <div className='unit-AiArt'>
      <div className='effects'>
        <div className='header-effects'>
          <Image src={flaskImage} alt="Flask icon" width={24} height={24} className='flask-icon' />
          <h1 className='title'>AI Art Effects</h1>
        </div>
        <input type="text" name="" id="" placeholder='Search effects' />
        <div className='list-effects'>
          <ul className='category' >
            <li>Favorite</li>
            <li>All</li>
            <li>Popular</li>
            <li>Cartoon</li>
            <li>Sketch</li>
            <li>Watercolor</li>
            <li>Universal</li>
          </ul>
        </div>
      </div>

      <div className='finish'></div>
    </div>
  )
}
