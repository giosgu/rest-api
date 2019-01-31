declare module 'casosUrgencias'{
    interface RootObject {
        CasoUrgencias: CasoUrgencia[];
      }
      
      interface CasoUrgencia {
        numero: string;
        tipoVisita: string;
        horaAsignacion: string;
        estado: string;
        socio: Socio;
        direccion: Direccion;
        sintomas: string;
      }
      
      interface Direccion {
        calle: string;
        entreCalles: string;
        ciudad: string;
        provincia: string;
        barrio: string;
        codigoPostal: string;
        coordenadas: Coordenadas;
      }
      
      interface Coordenadas {
        latitud: string;
        longitud: string;
      }
      
      interface Socio {
        numero: string;
        plan: string;
        nombre: string;
        apellido: string;
        edad: string;
        telefono: string;
        marcas: Marcas;
      }
      
      interface Marcas {
        cronico: string;
        socioInterno: string;
        pmi: string;
      }
}