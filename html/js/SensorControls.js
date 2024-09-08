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
      if (! scope.deviceOrientationMatrix ){
        return;
      }
      
      // acceleration は右手座標系
      //のmdn document 情報
      // x : 西から東に向かう
      // y : 南から北に向かう
      // z : 下から上に向かう
      
      // three は左手座標系なので変換している
      const az = event.acceleration.x;
      const ax = -event.acceleration.y;
      const ay = event.acceleration.z;
      
      // accelerationIncludingGravity は加速度計の生データ
      //const ax = event.accelerationIncludingGravity.x;
      //const ay = event.accelerationIncludingGravity.y;
      //const az = event.accelerationIncludingGravity.z;
      
      const av = new THREE.Vector3(ax, ay, az);
      const imatrix = new THREE.Matrix4().copy(scope.deviceOrientationMatrix);
      
      
      imatrix.invert();
      
      
      //av.applyMatrix4(imatrix);
      
      scope.object.position.x = av.x;
      scope.object.position.y = av.y;
      scope.object.position.z = av.z;
      scope.object.updateMatrixWorld();
    }
    
    function onDeviceOrientation(event) {
      const alpha = event.alpha; // z軸の回転 (0-360)
      const beta = event.beta;   // x軸の回転 (-180-180)
      const gamma = event.gamma; // y軸の回転 (-90-90)
      
      // 回転行列の計算
      const euler = new THREE.Euler(
          beta * THREE.MathUtils.DEG2RAD,
          0, //gamma * THREE.MathUtils.DEG2RAD,
          0, //alpha * THREE.MathUtils.DEG2RAD,
          'YXZ'
      );
      const quaternion = new THREE.Quaternion().setFromEuler(euler);
      const rotationMatrix = new THREE.Matrix4().makeRotationFromQuaternion(quaternion);
      
      scope.object.quaternion.copy(quaternion);
      
      scope.deviceOrientationMatrix = rotationMatrix;
      
      const invmatrix = new THREE.Matrix4().copy(rotationMatrix).invert();
      //console.log(invmatrix.elements);
    }
    
    function onClick(event) {
      console.log("onClick");
      console.log(scope.deviceOrientationMatrix.elements);
      
    }
    
    window.addEventListener("devicemotion", onDeviceMotion);
    window.addEventListener("deviceorientation", onDeviceOrientation);
    window.addEventListener("touchstart", onClick);
  } // end of constructor
}

export { SensorControls };