 import { useState } from 'react';

const FormComponet = ({handleInputChange, handleInputFocus, handleReset, cardData, setCards, errorExpiry}) => {
  const [errorMessage, setErrorMessage] = useState("");
  if (errorExpiry) {
    console.log("errorExpiry", errorExpiry);
    setErrorMessage("Fecha de expiración no válida");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    if (cardData.number.length === 0) {
      setErrorMessage("Este campo es obligatorio");
      return;
    }else if (cardData.name.length === 0) {
      setErrorMessage("Este campo es obligatorio");
      return;
    }else if (cardData.expiry.length === 0) {
      setErrorMessage("Este campo es obligatorio");
      return;
    }else if (cardData.cvc.length === 0) {
      setErrorMessage("Este campo es obligatorio");
      return;
    }
    
    setCards(cards.concat(cardData)); // Agregar la tarjeta al estado
    handleReset();
    setErrorMessage("");
  }; 
  
    return (
        <>
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
            {errorMessage && <p className='text-red-500 text-sm mt-1 transition-all ease-in-out'>{errorMessage}</p>}
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
            {errorMessage && <p className='text-red-500 text-sm mt-1 transition-all ease-in-out'>{errorMessage}</p>}
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
            {errorMessage && <p className='text-red-500 text-sm mt-1 transition-all ease-in-out'>{errorMessage}</p>}
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
            {errorMessage && <p className='text-red-500 text-sm mt-1 transition-all ease-in-out'>{errorMessage}</p>}
          </div>
          <div className='mt-4 gap-4 flex'>
            <button type="submit" onClick={handleSubmit} className='py-1 px-5 rounded-2xl items-center bg-[#4741de] text-white border-1 border-[#706cec]  hover:bg-[#544feb] transition'>Agregar</button>
            <button type="reset" onClick={handleReset} className='py-1 px-5 bg-gray-300 text-gray-700 rounded-2xl hover:bg-gray-400 transition'>Cancelar</button>
          </div>
        </form>
        </>
      );
}

export default FormComponet;