"use client";
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const HomePage: React.FC = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [coursesCount, setCoursesCount] = useState(0);
  const [certCount, setCertCount] = useState(0);

  useEffect(() => {
    // Simulate counting up
    const interval = setInterval(() => {
      setUsersCount(prev => (prev < 10000 ? prev + 100 : prev));
      setCoursesCount(prev => (prev < 500 ? prev + 5 : prev));
      setCertCount(prev => (prev < 15000 ? prev + 150 : prev));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // GSAP ScrollTrigger animations
    const sections = document.querySelectorAll('[data-scroll]');
    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => section.classList.add('inView'),
        onLeaveBack: () => section.classList.remove('inView'),
      });
    });

    // Animate progress bar
    gsap.fromTo(`#progress-bar`, { width: '0%' }, { width: '100%', duration: 3, ease: 'power1.out', scrollTrigger: { trigger: `#progress-bar`, start: 'top 100%' } });

    // Mouse tracker animation
    const tracker = document.getElementById('mouse-tracker');
    if (tracker) {
      const handleMouseMove = (event: MouseEvent) => {
        tracker.style.left = `${event.clientX - 15}px`;
        tracker.style.top = `${event.clientY - 15}px`;
      };
      document.addEventListener('mousemove', handleMouseMove);
      return () => document.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div className="font-sans antialiased bg-black text-white">
      <nav className="fixed w-full bg-black bg-opacity-80 backdrop-blur-md text-white py-4 shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-3xl font-extrabold tracking-wide">SkillForge</div>
          <div className="space-x-6">
            <a href="#home" className="hover:text-gray-400 transition duration-300">Home</a>
            <a href="#about" className="hover:text-gray-400 transition duration-300">About</a>
            <a href="#features" className="hover:text-gray-400 transition duration-300">Features</a>
            <a href="#stats" className="hover:text-gray-400 transition duration-300">Stats</a>
            <a href="#testimonials" className="hover:text-gray-400 transition duration-300">Testimonials</a>
          </div>
        </div>
      </nav>

      <div id="progress-bar" className="fixed top-0 left-0 h-1 bg-gradient-to-r from-green-400 to-blue-500"></div>

      <div id="mouse-tracker" className="fixed w-8 h-8 border-2 border-green-400 rounded-full pointer-events-none"></div>

      <section id="home" className="flex items-center justify-center min-h-screen bg-black text-center py-12" data-scroll>
        <div className="bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
          <h1 className="text-6xl font-extrabold mb-4 tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">SkillForge</h1>
          <p className="text-2xl mb-6">Revolutionizing learning through AI-driven personalization and blockchain certification</p>
          <button className="border border-gray-300 text-gray-300 py-3 px-8 rounded-lg shadow-lg hover:bg-gray-300 hover:text-black transition duration-300">Embark on Your Journey</button>
        </div>
      </section>

      <section id="about" className="flex items-center justify-center min-h-screen bg-black text-center py-12" data-scroll>
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Redefine Your Learning</h2>
          <p className="text-xl mb-6">SkillForge employs cutting-edge AI to create a learning experience as unique as you are...</p>
        </div>
      </section>

      <section id="features" className="flex items-center justify-center min-h-screen bg-black py-12" data-scroll>
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Future-Proof Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
              <h3 className="text-xl font-semibold mb-2">AI-Driven Personalization</h3>
              <p>Our AI adapts course content and pacing to your unique learning style...</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
              <h3 className="text-xl font-semibold mb-2">Gamified Learning</h3>
              <p>Earn points, badges, and level up as you acquire new skills and knowledge...</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
              <h3 className="text-xl font-semibold mb-2">Blockchain Certificates</h3>
              <p>Secure, verifiable proof of your achievements that you can share with employers...</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
              <h3 className="text-xl font-semibold mb-2">Real-time Industry Alignment</h3>
              <p>Course content updated in real-time to match industry trends and demands...</p>
            </div>
          </div>
        </div>
      </section>

      <section id="stats" className="flex items-center justify-center min-h-screen bg-black text-center py-12" data-scroll>
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">SkillForge Impact</h2>
          <div className="flex justify-around space-x-4">
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out w-1/3">
              <div className="text-5xl font-bold">{usersCount}</div>
              <div className="text-xl font-medium">Active Learners</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out w-1/3">
              <div className="text-5xl font-bold">{coursesCount}</div>
              <div className="text-xl font-medium">Courses Available</div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out w-1/3">
              <div className="text-5xl font-bold">{certCount}</div>
              <div className="text-xl font-medium">Certificates Issued</div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="flex items-center justify-center min-h-screen bg-black py-12" data-scroll>
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
              <p className="text-lg mb-2">"SkillForge transformed my career..."</p>
              <p>- Sarah J., Software Developer</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
              <p className="text-lg mb-2">"The gamification aspect made learning addictive..."</p>
              <p>- Michael T., Data Scientist</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
              <p className="text-lg mb-2">"Blockchain certificates gave me a competitive edge..."</p>
              <p>- Emily R., Blockchain Specialist</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
              <p className="text-lg mb-2">"The real-time industry alignment feature ensured I was always learning..."</p>
              <p>- David L., UX Designer</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
              <p className="text-lg mb-2">"SkillForge's personalized learning paths helped me transition into a new field effortlessly..."</p>
              <p>- Anna K., Career Changer</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-500 ease-in-out">
              <p className="text-lg mb-2">"The interactive projects and real-world simulations prepared me for my dream job better than any traditional course could have..."</p>
              <p>- Robert M., Project Manager</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
