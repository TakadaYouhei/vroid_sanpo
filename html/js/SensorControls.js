"use strict";

/*
 * ジャイロと加速度センサーで object の向きと位置をコントロールする
 */
class SensorControls {
  constructor( object, domElement ) {
    this.object = object;
    this.domElement = domElement;
    
    this.dispose = function() {
      window.removeEventListener("devicemotion", onDeviceMotion);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
    }
    
    const scope = this;
    
    function onDeviceMotion(event) {
      const ax = event.accelerationIncludingGravity.x;
      const ay = event.accelerationIncludingGravity.y;
      const az = event.accelerationIncludingGravity.z;
      
      scope.object.position.x = ax;
      scope.object.position.y = ay + 9.8;
      scope.object.position.z = az;
      scope.object.updateMatixWorld();
    }
    
    function onDeviceOrientation(event) {
      
    }
    
    window.addEventListener("devicemotion", onDeviceMotion);
    window.addEventListener("deviceorientation", onDeviceOrientation);
  } // end of constructor
}

export { SensorControls };