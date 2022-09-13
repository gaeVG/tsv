/* eslint-disable no-undef */
export class NetworkedScene {
  constructor(pos, rot, rotationOrder, holdLastFrame, looped, sceneHash, animTime, animSpeed) {
    this.scene = NetworkCreateSynchronisedScene(
      pos.x,
      pos.y,
      pos.z,
      rot.x,
      rot.y,
      rot.z,
      rotationOrder,
      holdLastFrame,
      looped,
      sceneHash,
      animTime + 0.0,
      animSpeed + 0.0,
    );
  }
  addPed(ped, animDict, animName, blendInSpeed, blendOutSpeed, duration, flag, playbackRate, p9) {
    NetworkAddPedToSynchronisedScene(
      ped.Handle,
      this.scene,
      animDict,
      animName,
      blendInSpeed,
      blendOutSpeed,
      duration,
      flag,
      playbackRate,
      p9,
    );
  }
  addEntity(entity, animDict, animName, speed, speedMultiplier, flag) {
    NetworkAddEntityToSynchronisedScene(
      entity.Handle,
      this.scene,
      animDict,
      animName,
      speed,
      speedMultiplier,
      flag,
    );
  }
  start() {
    NetworkStartSynchronisedScene(this.scene);
  }
  stop() {
    NetworkStopSynchronisedScene(this.scene);
  }
}
