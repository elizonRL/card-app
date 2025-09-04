import { useState } from "react";

const useCard = ()=>{
    const [cardData, setCardData]= useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
        focus: ""
    })

const handleInputChange = (e) => {
    const { name, value } = e.target;
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
      if(value.length > 4) return;
    }
    if(name === "name"){
      
      let input = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '')
      if(value.length>20) return; 
      
      setCardData({...cardData, [name]: input})
      return;
    }
  
    setCardData({ ...cardData, [name]: value });
  };

  // Para resaltar el campo activo en la tarjeta
  const handleInputFocus = (e) => {
    setCardData({ ...cardData, focus: e.target.name });
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

  return{
    cardData,
    handleInputChange,
    handleInputFocus,
    handleReset
  }

}

export default useCard; 