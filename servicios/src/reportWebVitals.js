//se utiliza para reportar metricas de rendimiento en una aplicacion web
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);  //Desplazamiento de diseño acumulativo mide la cantidad de cambios inesperados en el diseño
      getFID(onPerfEntry);  //Retraso en la primera entrada mide el tiempo que transcurre desde que un usuario interactúa
      getFCP(onPerfEntry);  //mide el tiempo que tarda una página en mostrar el primer bit de contenido visual al cargar
      getLCP(onPerfEntry);  //Pintado del contenido más grande mide el tiempo que tarda en renderizarse el elemento más grande  
      getTTFB(onPerfEntry); //Tiempo hasta el primer byte mide la cantidad de tiempo que transcurre desde que se hace una solicitud al servidor
    });
  }
};

export default reportWebVitals;