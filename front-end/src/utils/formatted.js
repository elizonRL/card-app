/**
 * @description Formatea la fecha de expiración en MM/YY
 * @name formatExpiryt
 * @param {*} input 
 * Formatea la fecha de expiración en MM/YY
 *  Agrega una barra después de los primeros dos dígitos
 *  Valida que el mes esté entre 01 y 12 y el año entre 22 y 50
 * 
 * @returns 
 */
export const formatExpiryt = (input) => {
    let formatted = input;
    if (input.length > 2) {
        formatted = input.slice(0, 2) + '/' + input.slice(2, 4);
    }
    /* if (formatted.length === 5) {
        // Expresión regular
        const regex = /^(0[1-9]|1[0-2])\/(2[2-9]|[3-4][0-9]|50)$/;

        if (!regex.test(formatted)) {
            // Si no pasa la validación, no actualizar el estado
            return;
        }
    } */

    return formatted;
}

export const masknumber = (num) => { 
/*El campo de número de tarjeta se debe mostrar enmascarado, solo mostrar los 
2 primeros y 4 últimos dígitos (ej. 41********1234). */
// eliminar espacios entre números
let noSpaces = num.replace(/\s+/g, '');
let start = noSpaces.slice(0, 2);
let end = noSpaces.slice(-4);
let middle = '*'.repeat(noSpaces.length - 6);
return start + middle + end;

}
export const lengthCheck = (cardData)=>{
    let checknumber = !/^\d{16}$/.test(cardData.number.replace(/\s+/g, ''))
    return checknumber;
};