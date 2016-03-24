import {Plugin} from './plugin';
import {Observable} from "rxjs/Observable";

/**
 * @name Battery Status
 * @description
 * Requires Cordova plugin: cordova-plugin-batterystatus. For more info, please see the [BatteryStatus plugin docs](https://github.com/apache/cordova-plugin-battery-status).
 *
 * @usage
 * ```js
 * import {BatteryStatus} from 'ionic-native';
 *
 *
 *
 * // watch change in battery status
 * let subscription = BatteryStatus.onChange().subscribe(
 *  status => {
 *    console.log(status.level, status.isPlugged);
 *  }
 * );
 *
 * // stop watch
 * subscription.unsubscribe();
 *
 * ```
 */
@Plugin({
  plugin: 'cordova-plugin-batterystatus',
  repo: 'https://github.com/apache/cordova-plugin-battery-status',
  platforms: ['Amazon Fire OS', 'iOS', 'Android', 'BlackBerry 10', 'Windows Phone 7', 'Windows Phone 8', 'Windows', 'Firefox OS', 'Browser']
})
export class BatteryStatus {

  /**
   * Watch the change in battery level
   * @returns {Observable} Returns an observable that pushes a status object
   */
  static onChange () : Observable<StatusObject> {
    return getEventObservable("batterylevel");
  }

  /**
   * Watch when the battery level goes low
   * @returns {Observable<StatusObject>} Returns an observable that pushes a status object
   */
  static onLow () : Observable<StatusObject> {
    return getEventObservable("batterylow");
  }

  /**
   * Watch when the battery level goes to critial
   * @returns {Observable<StatusObject>} Returns an observable that pushes a status object
   */
  static onCritical () : Observable<StatusObject> {
    return getEventObservable("batterycritical");
  }

}

export interface StatusObject {
  /**
   * The battery charge percentage
   */
  level : number,

  /**
   * A boolean that indicates whether the device is plugged in
   */
  isPlugged : boolean
}

/**
 * Wrap the event with an observable
 * @param event
 * @returns {Observable}
 */
function getEventObservable (event : string) : Observable<StatusObject> {
  return new Observable(observer => {
    let callback = (status : any) => observer.next(status);
    window.addEventListener(event, callback, false);
    return () => window.removeEventListener(event, callback, false);
  });
}