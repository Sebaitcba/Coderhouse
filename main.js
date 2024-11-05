//Funciones
function calcularCostosFinalPagos(costo){
    const valorTotal = costo * 1.21;
    const costoAnual = valorTotal * 12 * 0.95;
    const cuotaAnual = costoAnual / 3;
    console.log("El valor mensual con Impuestos incluidos es $" + valorTotal);
    console.log("El costo de contratación Anual es $" + costoAnual);
    console.log("Puede pagarlo en 3 cuotas fijas de $" + cuotaAnual);
}


//Principal
function generarCompra(num) {
    let producto = num;
    switch (producto) {
        case 1:
            console.log("Eligió el Plan Personal");
            calcularCostosFinalPagos(5);
        break;
        case 2:
            console.log("Eligió el Plan Pequeñas Empresas");
            calcularCostosFinalPagos(25);
        break;
        case 3:
            console.log("Eligió el Plan Grandes Empresas");
            calcularCostosFinalPagos(45);
        break;
    }
}
