import { useRef,useState } from "react";
//import { formatExpiryt } from "../utils/formatted";
/* 
    Hook personalizado para manejar el estado de la tarjeta 
    y la lógica de los inputs del formulario
    - number: número de la tarjeta
    - name: nombre del titular
    - expiry: fecha de vencimiento
    - cvc: código de seguridad
    - focus: campo actualmente enfocado
    - handleInputChange: función para manejar cambios en los inputs
    - handleInputFocus: función para manejar el enfoque en los inputs
    - handleReset: función para resetear los datos de la tarjeta
    - masknumber: función para enmascarar el número de la tarjeta
    - Validación de la fecha de vencimiento con expresión regular
    - Validación de la fecha de vencimiento con expresión regular
  
*/

const useCard = () => {
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: ""
  });
  const errorRef = useRef(false);

  // Maneja los cambios en los inputs del formulario

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Validaciones específicas para cada campo
    if (name === "number") {
      //validar que solo se ingresen números y espacios
      // Remover espacios y caracteres no numéricos
      let input = value.replace(/\D/g, '');
      // Limitar a 16 dígitos
      if (input.length > 16) return;
      // Formatear con espacios cada 4 dígitos
      let formatted = input.replace(/(\d{4})(?=\d)/g, '$1 ');
      setCardData({ ...cardData, [name]: formatted });
      return;
    }
    if (name === "expiry") {
      // Limitar a 5 caracteres (MM/YY)
      if (value.length > 5) return;
      // Formatear MM/YY
      let input = value.replace(/\D/g, '');
      let formatted = input;
      if (input.length > 2) {
        formatted = input.slice(0, 2) + '/' + input.slice(2, 4);
      }
      if (formatted.length === 5) {
        // Expresión regular
        const regex = /^(0[1-9]|1[0-2])\/(2[2-9]|[3-4][0-9]|50)$/;

        if (!regex.test(formatted)) {
          // Si no pasa la validación, no actualizar el estado
          errorRef.current=true;
          return;
        }
      }
      errorRef.current=false;
      setCardData({ ...cardData, [name]: formatted });
      return;
    }
    if (name === "cvc") {
      // Limitar a 4 dígitos
      if (value.length > 4) return;
    }
    if (name === "name") {
      // Permitir solo letras y espacios, limitar a 20 caracteres
      let input = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '')
      if (value.length > 20) return;

      setCardData({ ...cardData, [name]: input })
      return;
    }
    // Actualizar el estado para otros campos
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

  return {
    cardData,
    handleInputChange,
    handleInputFocus,
    handleReset,
    errorRef
  }
}

export default useCard; 