import React from 'react'
import Header from './components/Header'
import TODOHero from './components/TODOHero'
import Form from './components/Form'
import TODOList from './components/TODOList'
import { ToastContainer } from 'react-toastify';
import BtnSummary from './components/BtnSummary'

const App = () => {
  return (
    <div className='h-screen w-screen bg-black p-[1%] '>
     <div className='flex justify-between items-center'>
          <Header/>
      <BtnSummary/>
     </div>
      <div className=' flex flex-col items-center gap-7'>
        <TODOHero/>
        <Form/>
        <TODOList/>
      </div>
       <ToastContainer />  
      
    </div>
  )
}

export default App