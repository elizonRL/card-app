
import { useState } from 'react'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import './App.css'
import FormComponet from './components/FormComponet';
import useCard from './hooks/userCard';


function App() {
  const { cardData, handleInputChange, handleInputFocus, handleReset, errorRef } = useCard();
  console.log("errorRef", errorRef.current);
    const [cards, setCards] = useState([]);

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
        <FormComponet
          handleInputChange={handleInputChange}
          handleInputFocus={handleInputFocus}
          handleReset={handleReset}
          cardData={cardData}
          errorExpiry={errorRef.current}
          setCards={setCards}
        />

      </main>

    </>
  )
}

export default App
