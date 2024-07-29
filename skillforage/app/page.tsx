"use client"
import React, { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    // JavaScript code to handle animations and other effects
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('.nav-item');
    const progressBar = document.getElementById('progress-bar');

    const options = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const sectionId = entry.target.getAttribute('id');
          navItems.forEach(item => {
            if (item instanceof HTMLElement) {
              item.classList.toggle('active', item.dataset.section === sectionId);
            }
          });
        }
      });
    }, options);

    sections.forEach(section => {
      observer.observe(section);
    });

    const handleScroll = () => {
      if (progressBar) {
        const scrollY = window.scrollY;
        const scrollHeight = document.body.scrollHeight - window.innerHeight;
        const progress = (scrollY / scrollHeight) * 100;
        progressBar.style.width = `${progress}%`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    const handleNavClick = (event) => {
      const targetId = event.target.dataset.section;
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      }
    };

    navItems.forEach(item => {
      item.addEventListener('click', handleNavClick);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      navItems.forEach(item => {
        item.removeEventListener('click', handleNavClick);
      });
    };
  }, []);

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>SkillForge - Redefining Learning</title>
      <style dangerouslySetInnerHTML={{ __html: `
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;700&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body, html {
    font-family: 'Raleway', sans-serif;
    background-color: #000;
    color: #fff;
    overflow-x: hidden;
  }
  
  #canvas-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  
  .section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 50px 20px;
    position: relative;
    opacity: 0;
    transition: opacity 1s ease;
  }

  .section.visible {
    opacity: 1;
  }
  
  h1, h2 {
    font-size: 5vw;
    font-weight: 700;
    margin-bottom: 20px;
    transition: opacity 1s ease;
  }
  
  p {
    font-size: 2vw;
    max-width: 800px;
    margin-bottom: 30px;
    transition: opacity 1s ease;
  }
  
  .cta-button {
    background: none;
    border: 2px solid #fff;
    color: #fff;
    padding: 15px 30px;
    font-size: 1.5vw;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .cta-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  #navigation {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 20px;
    z-index: 100;
    background: rgba(0, 0, 0, 0.7); /* Background with opacity */
    padding: 10px 20px;
    border-radius: 10px;
  }
  
  .nav-item {
    cursor: pointer;
    font-size: 1.2vw;
    color: #fff;
    transition: opacity 1s ease;
  }
  
  .nav-item.active {
    font-weight: bold;
  }
  
  #progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    height: 5px;
    background-color: #fff;
    width: 0;
    z-index: 100;
  }
  
  .feature-box {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 20px;
    margin: 20px;
    width: 300px;
    opacity: 1;
    transform: translateY(0);
  }
  
  .feature-box h3 {
    font-size: 1.5vw;
    margin-bottom: 10px;
  }
  
  .feature-box p {
    font-size: 1vw;
    opacity: 1;
  }
  
  .feature-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .stats-container {
    display: flex;
    justify-content: space-around;
    width: 100%;
    max-width: 1000px;
    margin-top: 50px;
  }
  
  .stat-item {
    text-align: center;
    opacity: 1;
    transition: opacity 1s ease;
  }
  
  .stat-number {
    font-size: 4vw;
    font-weight: 700;
    margin-bottom: 10px;
  }
  
  .stat-label {
    font-size: 1.5vw;
  }
  
  #testimonials .section-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .testimonial {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 20px;
    opacity: 1;
    transform: translateX(0);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .testimonial:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(255, 255, 255, 0.2);
  }
  
  .testimonial p {
    font-size: 1vw;
    margin-bottom: 10px;
    opacity: 1;
  }
  
  .testimonial-author {
    font-style: italic;
    text-align: right;
    font-size: 0.8vw;
  }
  
  .testimonial:nth-child(3n+1) { grid-column: 1 / span 2; }
  .testimonial:nth-child(3n+2) { grid-column: 2 / span 2; }
  .testimonial:nth-child(3n) { grid-column: 1 / span 1; }
  .testimonial:nth-child(4n) { grid-column: 3 / span 1; }
  
  @media (max-width: 768px) {
    #testimonials .section-content {
      grid-template-columns: 1fr;
    }
    .testimonial:nth-child(n) {
      grid-column: 1;
    }
  }
  
  @media (max-width: 768px) {
    h1, h2 { font-size: 8vw; }
    p { font-size: 4vw; }
    .cta-button { font-size: 3vw; }
    .nav-item { font-size: 3vw; }
    .feature-box h3 { font-size: 5vw; }
    .stat-number { font-size: 8vw; }
    .stat-label { font-size: 4vw; }
  }
  
  #cursor {
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: all 0.1s ease;
    transform: translate(-50%, -50%);
  }
  
  .expand {
    transform: scale(2) translate(-25%, -25%) !important;
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  #subtitle {
    opacity: 1;
  }
`}} />
      <div id="canvas-container" />
      <div id="cursor" />
      <nav id="navigation">
        <div className="nav-item" data-section="home">Home</div>
        <div className="nav-item" data-section="about">About</div>
        <div className="nav-item" data-section="features">Features</div>
        <div className="nav-item" data-section="stats">Stats</div>
        <div className="nav-item" data-section="testimonials">Testimonials</div>
      </nav>
      <div id="progress-bar"></div>
      <section id="home" className="section">
        <h1 id="main-title">SkillForge</h1>
        <p id="subtitle">Revolutionizing learning through AI-driven personalization and blockchain certification</p>
        <button className="cta-button">Embark on Your Journey</button>
      </section>
      <section id="about" className="section">
        <h2>Redefine Your Learning</h2>
        <p>SkillForge employs cutting-edge AI to create a learning experience as unique as you are. Our platform adapts to your learning style, pace, and goals, ensuring maximum efficiency and engagement.</p>
      </section>
      <section id="features" className="section">
        <h2>Future-Proof Skills</h2>
        <div className="feature-container">
          <div className="feature-box">
            <h3>AI-Driven Personalization</h3>
            <p>Our AI adapts course content and pacing to your unique learning style and goals. By analyzing your progress and preferences, it tailors the material to ensure you get the most effective and engaging learning experience possible, helping you to master new skills faster and with greater retention.</p>
          </div>
          <div className="feature-box">
            <h3>Gamified Learning</h3>
            <p>Earn points, badges, and level up as you acquire new skills and knowledge. Our gamified approach makes learning fun and motivating, encouraging you to continuously challenge yourself and achieve higher levels of expertise. Each milestone you reach will be a testament to your hard work and dedication.</p>
          </div>
          <div className="feature-box">
            <h3>Blockchain Certification</h3>
            <p>Receive immutable, verifiable credentials for your accomplishments. Our blockchain-based certification system ensures that your achievements are secure, tamper-proof, and recognized globally, providing you with a trusted and permanent record of your skills and knowledge.</p>
          </div>
        </div>
      </section>
      <section id="stats" className="section">
        <h2>Our Impact</h2>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">12000</div>
            <div className="stat-label">Active Learners</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">∞</div>
            <div className="stat-label">Courses</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">5000</div>
            <div className="stat-label">Certificates Issued</div>
          </div>
        </div>
      </section>
      <section id="testimonials" className="section">
        <h2>What Our Users Say</h2>
        <div className="section-content">
        <div className="testimonial">
    <p>"SkillForge has revolutionized my approach to learning. The interactive modules and real-world projects made complex concepts easy to grasp. I’ve seen a tangible improvement in my skills."</p>
    <div className="testimonial-author">- Emily Johnson</div>
  </div>
  <div className="testimonial">
    <p>"The personalized learning path provided by SkillForge is incredible. The AI-driven recommendations have helped me focus on what truly matters for my career growth. Highly recommended!"</p>
    <div className="testimonial-author">- Michael Brown</div>
  </div>
  <div className="testimonial">
    <p>"SkillForge offers an unparalleled learning experience. The blend of theory and practical exercises keeps me engaged, and the certification adds real value to my professional profile."</p>
    <div className="testimonial-author">- Lisa Davis</div>
  </div>
  <div className="testimonial">
    <p>"What sets SkillForge apart is its dedication to user engagement. The gamified learning approach not only makes the process enjoyable but also ensures deeper understanding and retention of knowledge."</p>
    <div className="testimonial-author">- Alex Martinez</div>
  </div>
  <div className="testimonial">
    <p>"I’ve tried various learning platforms, but SkillForge stands out for its innovative teaching methods and effective use of technology. The impact on my professional development has been profound."</p>
    <div className="testimonial-author">- Jordan Lee</div>
  </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;