import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Audit from './pages/Audit'
import SampleReport from './pages/SampleReport'
import GradientCursor from './components/GradientCursor'
import './styles/main.css' // Make sure this is imported
import './styles/animations.css'
import Preloader from './components/Preloader';


function App() {
  
  useEffect(() => {
    // Initialize scroll effects
    const handleScroll = () => {
      const elements = document.querySelectorAll('.scroll-effect')
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top
        const windowHeight = window.innerHeight
        if (elementTop < windowHeight * 0.85) {
          element.classList.add('animate')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Trigger on initial load
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Router>
      <GradientCursor />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/sample-report" element={<SampleReport />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App