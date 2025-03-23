import type {
  IEventDispatcher, IEventDispatcherCallback,
  IEventDispatcherEntries,
  IEventDispatcherProgations,
  IEventDispatcherScheme
} from "../types";

/**
 * Protorian EventDispatcher — Emetteur d'émission
 * @description Gestionnaire d'évènements
 * @example new EventDispatcher<EmitScheme>()
 */
export class EventDispatcher<Scheme extends IEventDispatcherScheme> implements IEventDispatcher<Scheme> {

  /**
   * Gestion de la propagation
   */
  propagations: IEventDispatcherProgations<Scheme> = {} as IEventDispatcherProgations<Scheme>;

  /**
   * Stockage des émissions
   */
  entries: IEventDispatcherEntries<Scheme> = {} as IEventDispatcherEntries<Scheme>;

  /**
   * Ecouter une émission de l'émetteur
   * @description Ecouteur d'évèvements par rapport à un "SLUG". Utiliser un retour "TRUE" pour stopper la propagation de l'instance déclenchée
   * @param type Type d'émission déclaré dans le `Scheme` de l'instanciation
   * @param callback Fonction de rappel content en `argument[0]` les données définit par le dispatcher
   * @param force Forcer
   * @example emitter.listen<ReturnType>( 'emitterNameInKeyOfScheme', ( data : ReturnType ) => ... )
   */
  listen<I extends keyof Scheme>( 
    
    type : I, 
    
    callback : IEventDispatcherCallback<Scheme[I]>,

    force ?: boolean | undefined
    
  ) : this{

    this.entries[ type ] = this.entries[ type ] || []

    this.entries[ type ].push( { callback, force })

    this.propagations[ type ] = false;

    return this;
    
  }

  /**
   * Déclencheur un type d'émission de l'émetteur
   * @description Déclencheur les écouteurs par rapport au `type`
   * @param type Type d'émission déclaré dans le `Scheme` de l'instanciation
   * @param data Donnée à renvoyer aux écouteurs d'émission de l'émeteur
   * @example emitter.dispatch( 'emitterNameInKeyOfScheme', ... )
   * 
   */
  dispatch( type : keyof Scheme, data: any ) : this{

    if( this.entries[ type ] ){

      this.entries[ type ].map( (entry) => {

        if( this.propagations[ type ] === true ){ return; }

        const stop = entry.callback( data )

        if( stop === true ){ this.propagations[ type ] = true; }
        
      })
      
      this.propagations[ type ] = false;
      
    }

    return this;
    
  }
  

}
