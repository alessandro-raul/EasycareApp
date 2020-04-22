

 export default function generateUniqueId(){
    var numero_aleatorio = Math.random();
    numero_aleatorio = Math.floor(numero_aleatorio * 100000);
    return numero_aleatorio;
}