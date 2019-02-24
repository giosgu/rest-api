import { Component, ElementRef, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MapsProvider } from './../../providers/maps/maps';
import { CasoUrgencia } from 'casosUrgencias';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

/**
 * Generated class for the MapCasosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;
@IonicPage()
@Component({
  selector: 'page-map-casos',
  templateUrl: 'map-casos.html',
})
export class MapCasosPage implements OnInit {
  
  location: {
    latitude: number,
    longitude: number
  };
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  //representa la lista de marcadores del mapa
  public markers: any[] = [];
  //Array en memoria con los casos de urgencia
  protected casos: CasoUrgencia[] = [];
  //boolean para manejar la necesidad de refrescar la lista
  private isListaCasosActualizada = false; 
  
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public geolocation: Geolocation, public mapsProvider: MapsProvider, private locationAccuracy: LocationAccuracy,
    public events: Events, public changeDetector: ChangeDetectorRef) {
      this.casos = navParams.get("casos")
  }

  ionViewDidLoad() {
    this.ubicarCentroMapa();
  }

  ionViewDidLeave() {
    //console.log("FIXME - Dejar de geolocalizar para ahorrar batería")
    console.log(this.constructor.name + ": Dejo de geolocalizar, para ahorrar batería")
    this.mapsProvider.setMyLocationEnabled(false);
  }
  //cuando se carga la página, si t engo una copia anterior, refresco los marcadores de casos
  //el listado de casos se puede actualizar en ngOnInit()
  ionViewWillEnter(){
    this.mapsProvider.setMyLocationEnabled(true);
    if(this.isListaCasosActualizada){
      this.mapsProvider.clearMarkers().then((res: any) => {
        this.mapsProvider.addMarkers(this.casos)
        this.isListaCasosActualizada = false;
      });
    }
  }
  private ubicarCentroMapa(){
    //si tengo acceso a la ubicación, el centro del mapa es donde se encuentra el usuario
    //caso contrario, la cancha de river
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      
      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            this.ubicarUsuario();
          },
          error => {
            this.ubicarDefault()}
        );
      }else{
        this.ubicarDefault();
      }
    });

  }
  ubicarUsuario(): any {
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };

    this.geolocation.getCurrentPosition(options).then((position) => {

      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      this.mapsProvider.init(this.location, this.mapElement);
      this.marcarCasosAsignados();

     }).catch((error) => {
      console.log('Error getting location', error);
      alert("Se proodujo un error al iniciar la geolocalizacion")
    });
  }

  ubicarDefault(): any {
    this.location = {
      latitude: -34.6757026,
      longitude: -58.5939137
    };
    this.mapsProvider.init(this.location, this.mapElement);
    this.marcarCasosAsignados();
  }

  marcarCasosAsignados(){
    this.mapsProvider.addMarkers(this.casos);
  }

  ngOnInit() {
    //suscribo la actualización de casos, por si hay que actualizar marcadores.
    this.events.subscribe('casos:actualizacion', (casos:CasoUrgencia[], time:Date) => {
      console.log( this.constructor.name + ": evento 'casos:actualizacion' recibido. Cantidad de casos: " + casos.length);
      this.casos = casos;
      this.isListaCasosActualizada = true;
    });
  }

  ngOnDestroy() {
    this.events.unsubscribe('casos:actualizacion');
    console.log(this.constructor.name + ": desuscripto a evento casos:actualizacion")
  }

}
