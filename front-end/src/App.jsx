import { useState } from 'react'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import './App.css'
import FormComponet from './hooks/components/FormComponet';


function App() {
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: ""
  });

  // Manejo de cambios
  

  return (
    <>
      <main className='m-auto p-4 flex flex-col md:flex-col gap-4 justify-center items-center min-h-screen'>
        <Cards
          number={cardData.number}
          name={cardData.name}
          expiry={cardData.expiry}
          cvc={cardData.cvc}
          focused={cardData.focus}
        />
        <FormComponet cardData={cardData} setCardData={setCardData} />
      </main>

    </>
  )
}

export default App
