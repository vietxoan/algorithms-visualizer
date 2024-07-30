import React from 'react';
import '../About/About.css';

function About() {
  const content = 'I write this webpage to demo my ReactJS skills';
  const sign = 'Author: Nguyen Quang Viet';
  return (
    <div>
      <div className='title'>About</div>
      <div className='content'>{content} <br/> {sign}</div>
    </div>
  )
}

export default About