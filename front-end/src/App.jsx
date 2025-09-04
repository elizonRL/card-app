import { useState } from 'react'
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import './App.css'
import { useMask } from '@react-input/mask';

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
    console.log("value imput",value);
    if(name === "number") {
      // Remover espacios y caracteres no numéricos
      let input = value.replace(/\D/g, '');
      // Limitar a 16 dígitos
      if(input.length > 16) return;
      // Formatear con espacios cada 4 dígitos
      let formatted = input.replace(/(\d{4})(?=\d)/g, '$1 ');
      setCardData({ ...cardData, [name]: formatted });
      return;
    }
    if(name === "expiry") {
      // Limitar a 5 caracteres (MM/YY)
      if(value.length > 5) return;
      // Formatear MM/YY
      let input = value.replace(/\D/g, '');
      if (input.length > 2) {
        input = input.slice(0, 2) + '/' + input.slice(2, 4);
      }
      setCardData({ ...cardData, [name]: input });
      return;
    }
    if(name === "cvc") {
      // Limitar a 4 dígitos
      if(value.length > 4) return;
    }
    setCardData({ ...cardData, [name]: value });
  };

  // Para resaltar el campo activo en la tarjeta
  const handleInputFocus = (e) => {
    setCardData({ ...cardData, focus: e.target.name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log(cardData);
  };
  const handleReset = () => {
    setCardData({
      number: "",
      name: "",
      expiry: "",
      cvc: "",
      focus: ""
    });
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
              type="text"
              name="number"
              placeholder="Card Number"
              value={cardData.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              maxLength="19"
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
              className='p-2 border border-gray-300 rounded cvv-input'
            />
          </div>
          <div className='mt-4 gap-4 flex'>
            <button type="submit" onClick={handleSubmit} className='py-1 px-5 rounded-2xl items-center bg-[#4741de] text-white border-1 border-[#706cec]  hover:bg-[#544feb] transition'>Agregar</button>
            <button type="reset" onClick={handleReset} className='py-1 px-5 bg-gray-300 text-gray-700 rounded-2xl hover:bg-gray-400 transition'>Cancelar</button>
          </div>
        </form>
      </main>

    </>
  )
}

export default App
