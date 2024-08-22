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
      window.removeEventListener("touchstart", onClick);
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
    
    function onClick(event) {
      console.log("onClick");
      // sensor activate
      if (window.DeviceMotionEvent && window.DeviceMotionEvent.requestPermission) {
        window.DeviceMotionEvent.requestPermission()
                     .then((state) => {
                       if (state === 'granted') {
                         // パーミッションを取れた際の処理
                       } else {
                         // パーミッションを取れなかった際の処理
                       }
                     })
                     .catch((err) => {
                       console.error(err.message);
                     });
                     
  } else {
    // window.DeviceMotionEvent.requestPermissionが無いブラウザでの処理
  }
    }
    
    window.addEventListener("devicemotion", onDeviceMotion);
    window.addEventListener("deviceorientation", onDeviceOrientation);
    window.addEventListener("touchstart", onClick);
  } // end of constructor
}

export { SensorControls };