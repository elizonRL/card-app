
import { useState } from 'react'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import './App.css'
import FormComponet from './components/FormComponet';
import useCard from './hooks/userCard';
import { masknumber } from './utils/formatted';


function App() {
  const { cardData, handleInputChange, handleInputFocus, handleReset} = useCard();
  /* console.log("errorRef", errorRef.current); */
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
          setCards={setCards}
          cards={cards}
        />
        <section>
          <h2 className='text-2xl font-bold mb-4'>Tarjetas Agregadas</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {cards.map((card) => (
              <div key={card.id} className='p-4 m-2'>
                <Cards
                  number={card.number ? masknumber(card.number) : ''}
                  name={card.name}
                  expiry={card.expiry}
                  cvc={card.cvc}
                  focused={''}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

    </>
  )
}

export default App
