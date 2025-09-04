import { useState } from 'react'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: ""
  });

  // Manejo de cambios
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  // Para resaltar el campo activo en la tarjeta
  const handleInputFocus = (e) => {
    setCardData({ ...cardData, focus: e.target.name });
  };

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
        <form className='grid grid-cols-2 gap-4 m-13'>
          <div className='flex flex-col'>
            <label htmlFor="number" className='block mb-2 font-medium text-gray-700'>Número de Tatjeta</label>
            <input
              type="number"
              name="number"
              placeholder="Card Number"
              value={cardData.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength="16"
              className='p-2 border border-gray-300 rounded'
            />
          </div>
          <div className='flex flex-col'>
            <label htmlFor="expiry" className='block mb-2 font-medium text-gray-700'>Fecha Vencimiento</label>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY Expiry"
              value={cardData.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength="5"
              className='p-2 border border-gray-300 rounded'
            />
          </div>
          <div>
            <label htmlFor="name" className='block mb-2 font-medium text-gray-700'>Nombre titular</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={cardData.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className='p-2 border border-gray-300 rounded'
            />
          </div>
          <div>
            <label htmlFor="cvc" className='block mb-2 font-medium text-gray-700'>CVV</label>
            <input
              type="number"
              name="cvc"
              placeholder="CVC"
              value={cardData.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength="4"
              className='p-2 border border-gray-300 rounded'
            />
          </div>
          <div className='mt-4 gap-4 flex'>
            <button type="submit" className='py-1 px-5 rounded-2xl items-center bg-[#4741de] text-white border-1 border-[#706cec]  hover:bg-[#544feb] transition'>Agregar</button>
            <button type="reset" className='py-1 px-5 bg-gray-300 text-gray-700 rounded-2xl hover:bg-gray-400 transition'>Cancelar</button>
          </div>
        </form>
      </main>

    </>
  )
}

export default App
