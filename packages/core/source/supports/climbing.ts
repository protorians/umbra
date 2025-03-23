import type {
  IClimbing,
  IClimbingAsyncTask,
  IClimbingNext,
  IClimbingTask,
  IClimbingYield
} from "../types";


export class Climbing<R> implements IClimbing<R> {

  /**
   * Tableau de réponse
   */
  responses: Array<R> = []

  /**
   * Liste des étapes préparées
   */
  prepared: IClimbingTask<R> | undefined = undefined;


  /**
   * Fonction de rendement
   */
  yield: IClimbingYield<R | undefined>


  constructor(
    public readonly entries: Array<R>,
    public readonly callback: IClimbingAsyncTask<R>,
    public readonly strictMode: boolean = true,
  ) {
    this.yield = this.create(entries, callback);
  }


  /**
   * Déclencher l'escalade
   * @param done Fonction de rappel quand l'escalade est complète
   * @param start Index à laquelle doit commencer l'escalade
   */
  trigger(done: IClimbingNext<R>, start: number = 0) {
    this.next(this.yield(start), done)
    return this;
  }


  /**
   * Création de l'escalade
   * @param entries Tableau d'élément de type <R>
   * @param callback Fonction de rappel pour instancier une nouvelle entrée de l'escalade
   */
  create(
    entries: Array<R>,
    callback: IClimbingAsyncTask<R>
  ): IClimbingYield<R | undefined> {
    const self = this;
    this.responses = [];

    return function* (index) {
      while (index < entries.length) {
        yield new Promise<R | undefined>(async (done, fail) => {
          if (typeof callback == 'function') {
            const treatment = await callback(index)?.catch(er => fail(er))
            if (treatment) done(treatment)
            else {
              if (self.strictMode) fail(true)
              else done(undefined)
            }
          }
        });
        index++;
      }
    };

  }


  /**
   * Prochaine étape dans le tableau de l'escalade
   * @param prepared Préparation de la liste des étapes de l'escalade
   * @param next Fonction de rapel pour la prochaine étape dans l'escalade
   */
  next(prepared: IClimbingTask<R | undefined>, next: IClimbingNext<R>) {
    const instance = prepared.next()

    if (instance.done) {
      if (typeof next == 'function') {
        next(this);
      }
      return true;
    }

    instance.value
      .then(r => {
        if (r) this.responses.push(r);
        this.next(prepared, next);
      })
      .catch(() => (!this.strictMode) ? this.next(prepared, next) : void (0))

    return false;

  }


}
