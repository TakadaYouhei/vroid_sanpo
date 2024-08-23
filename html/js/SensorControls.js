"use strict";

import * as THREE from 'three';

/*
 * ジャイロと加速度センサーで object の向きと位置をコントロールする
 */
class SensorControls {
  constructor( object, domElement ) {
    this.object = object;
    this.domElement = domElement;
    this.deviceOrientationMatrix = null;
    
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
      scope.object.updateMatrixWorld();
    }
    
    function onDeviceOrientation(event) {
      const alpha = event.alpha; // z軸の回転 (0-360)
      const beta = event.beta;   // x軸の回転 (-180-180)
      const gamma = event.gamma; // y軸の回転 (-90-90)
      
      // 回転行列の計算
      const euler = new THREE.Euler(
          beta * THREE.MathUtils.DEG2RAD,
          gamma * THREE.MathUtils.DEG2RAD,
          alpha * THREE.MathUtils.DEG2RAD,
          'YXZ'
      );
      const quaternion = new THREE.Quaternion().setFromEuler(euler);
      const rotationMatrix = new THREE.Matrix4().makeRotationFromQuaternion(quaternion);
      
      scope.object.quaternion.copy(quaternion);
      
      scope.deviceOrientationMatrix = rotationMatrix;
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