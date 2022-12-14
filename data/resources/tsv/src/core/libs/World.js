/* eslint-disable no-undef */
import { Model, Prop } from './';
import { Blip } from './Blip';
import { Camera } from './Camera';
import { CloudHat, Weather } from './enums';
import { CameraTypes } from './enums/CameraTypes';
import { VehicleHash } from './hashes';
import { Ped, Vehicle } from './models';
import { Pickup } from './Pickup';
import { RaycastResult } from './Raycast';
import { Rope } from './Rope';
import { Wait, Maths, Vector3 } from './utils';
/**
 * Class with common world manipulations.
 *
 * This class includes methods for creating entities and common world rendering.
 *
 * You can create blips, entities, cameras and more.
 *
 * @abstract
 */
export class World {
  /**
   * Get the current camera that's rendering.
   *
   * @returns The camera that's currently used.
   */
  static get RenderingCamera() {
    return new Camera(GetRenderingCam());
  }
  /**
   * Set the rendering camera. World.RenderingCamera = null to reset.
   *
   * ```typescript
   * const position = new Vector3(-802.311, 175.056, 72.8446);
   * const myCamera = World.createCamera(position, new Vector3(0,0,0), 180);
   * World.RenderingCamera = myCamera;
   *
   * // Reset to default cam
   * World.RenderingCamera = null;
   * ```
   *
   * @param value The camera to render.
   */
  static set RenderingCamera(value) {
    if (value === null) {
      RenderScriptCams(false, false, 3000, true, false);
    } else {
      value.IsActive = true;
      RenderScriptCams(true, false, 3000, true, false);
    }
  }
  /**
   * Whether to create a network world state for Ropes
   * This currently does nothing
   */
  static set RopesCreateNetworkWorldState(value) {
    SetRopesCreateNetworkWorldState(value);
  }
  /**
   * Get the current date in the world.
   *
   * @returns The current date.
   */
  static get CurrentDate() {
    const year = GetClockYear();
    const month = GetClockMonth();
    const day = GetClockDayOfMonth();
    const hour = GetClockHours();
    const minutes = GetClockMinutes();
    const seconds = GetClockSeconds();
    return new Date(year, month, day, hour, minutes, seconds);
  }
  /**
   * Set the current date of the world.
   */
  static set CurrentDate(date) {
    SetClockDate(date.getDate(), date.getMonth(), date.getFullYear());
    NetworkOverrideClockTime(date.getHours(), date.getMinutes(), date.getSeconds());
  }
  /**
   * Disables all emissive textures, street/building/vehicle lights. "EMP" effect.
   *
   * @param value On or off.
   */
  static set Blackout(value) {
    SetBlackout(value);
  }
  /**
   * Get the current cloud hat.
   *
   * @returns The current cloud hat type.
   */
  static get CloudHat() {
    return this.currentCloudHat;
  }
  /**
   * Set the current cloud hat.
   *
   * @param value The type of cloud hat.
   */
  static set CloudHat(value) {
    this.currentCloudHat = value;
    if (this.currentCloudHat === CloudHat.Unknown) {
      this.currentCloudHat = CloudHat.Clear;
      ClearCloudHat();
      return;
    }
    SetCloudHatTransition(this.cloudHatDict.get(this.currentCloudHat) ?? '', 3);
  }
  /**
   * Get the opacity of current cloud hat. Value is between 0-1.
   *
   * @returns The current cloud opacity between 0.0 and 1.0
   */
  static get CloudHatOpacity() {
    return GetCloudHatOpacity();
  }
  /**
   * Set opacity of current cloud hat between 0-1.
   *
   * @param value Opacity between 0.0 and 1.0
   */
  static set CloudHatOpacity(value) {
    SetCloudHatOpacity(Maths.clamp(value, 0, 1));
  }
  /**
   * Get the current weather type.
   *
   * @returns The current type of weather.
   */
  static get Weather() {
    switch (GetPrevWeatherTypeHashName()) {
      case -1750463879:
        return Weather.ExtraSunny;
      case 916995460:
        return Weather.Clear;
      case -1530260698:
        return Weather.Neutral;
      case 282916021:
        return Weather.Smog;
      case -1368164796:
        return Weather.Foggy;
      case 821931868:
        return Weather.Clouds;
      case -1148613331:
        return Weather.Overcast;
      case 1840358669:
        return Weather.Clearing;
      case 1420204096:
        return Weather.Raining;
      case -1233681761:
        return Weather.ThunderStorm;
      case 669657108:
        return Weather.Blizzard;
      case -273223690:
        return Weather.Snowing;
      case 603685163:
        return Weather.Snowlight;
      case -1429616491:
        return Weather.Christmas;
      case -921030142:
        return Weather.Halloween;
      default:
        return Weather.Unknown;
    }
  }
  /**
   * Set the current weather.
   *
   * @param value Type of weather to set.
   */
  static set Weather(value) {
    if (value !== Weather.Unknown) {
      const weather = this.weatherDict[value];
      SetWeatherTypeOverTime(weather, 1);
      setTimeout(() => {
        SetWeatherTypeNow(weather);
      }, 100);
    }
  }
  /**
   * Get the next weather type.
   *
   * @returns The Weather type
   */
  static get NextWeather() {
    switch (GetNextWeatherTypeHashName()) {
      case -1750463879:
        return Weather.ExtraSunny;
      case 916995460:
        return Weather.Clear;
      case -1530260698:
        return Weather.Neutral;
      case 282916021:
        return Weather.Smog;
      case -1368164796:
        return Weather.Foggy;
      case 821931868:
        return Weather.Clouds;
      case -1148613331:
        return Weather.Overcast;
      case 1840358669:
        return Weather.Clearing;
      case 1420204096:
        return Weather.Raining;
      case -1233681761:
        return Weather.ThunderStorm;
      case 669657108:
        return Weather.Blizzard;
      case -273223690:
        return Weather.Snowing;
      case 603685163:
        return Weather.Snowlight;
      case -1429616491:
        return Weather.Christmas;
      case -921030142:
        return Weather.Halloween;
      default:
        return Weather.Unknown;
    }
  }
  /**
   * Set weather type instantly. Similar to World.transitionToWeather with duration 0.
   */
  static set NextWeather(value) {
    if (value !== Weather.Unknown) {
      const weather = this.weatherDict[value];
      SetWeatherTypeOverTime(weather, 0);
    }
  }
  /**
   * Doesn't work
   */
  static get WeatherTransition() {
    const transition = GetWeatherTypeTransition();
    return [this.weatherDict[transition[0]], this.weatherDict[transition[1]], transition[2]];
  }
  /**
   * Doesn't work
   */
  static set WeatherTransition(transition) {
    SetWeatherTypeTransition(transition[0], transition[1], transition[2]);
  }
  /**
   * Transition to different weather type within a certain time.
   *
   * @param weather Weather type to change to.
   * @param duration Time for full weather change (in milliseconds);
   */
  static transitionToWeather(weather, duration) {
    if (weather !== Weather.Unknown) {
      SetWeatherTypeOverTime(this.weatherDict[weather], duration);
    }
  }
  /**
   * Destroys all existing cameras and sets your rendering camera back to GameplayCam.
   */
  static destroyAllCameras() {
    DestroyAllCams(false);
  }
  /**
   * Creates a blip at a given position and optionally radius.
   *
   * ```typescript
   * const position = new Vector3(-802.311, 175.056, 72.8446);
   * const myStoreBlip = World.createBlip(position, 5.0);
   * myStoreBlip.Sprite = BlipSprite.Store;
   * ```
   *
   * @param position World coordinate of blip.
   * @param radius (Optional) Radius of where blip should be shown.
   * @returns Blip object.
   */
  static createBlip(position, radius) {
    if (radius !== null && radius !== undefined) {
      return new Blip(AddBlipForRadius(position.x, position.y, position.z, radius));
    }
    return new Blip(AddBlipForCoord(position.x, position.y, position.z));
  }
  /**
   * Creates a cam that defaults to {@link CameraTypes.Scripted}
   *
   * ```ts
   * const cam = World.createCamera(CameraTypes.Spline, true);
   * ```
   * @param cameraType the camera type to create
   * @param active unknown
   * @returns
   */
  static createCamera(cameraType = CameraTypes.Scripted, active = true) {
    return new Camera(CreateCam(cameraType, active));
  }
  /**
   * Creates a camera using 'DEFAULT_SCRIPTED_CAMERA'.
   *
   * ```typescript
   * const position = new Vector3(-802.311, 175.056, 72.8446);
   * const myCamera = World.createCameraWithParams(position, new Vector3(0,0,0), 180);
   * ```
   *
   * @param position World coordinate where the camera should render.
   * @param rotation Rotation of camera relative to world.
   * @param fieldOfView Field of view angle of camera.
   * @returns Camera object.
   */
  static createCameraWithParams(
    cameraType = CameraTypes.Scripted,
    position,
    rotation,
    fieldOfView,
  ) {
    return new Camera(
      CreateCamWithParams(
        cameraType,
        position.x,
        position.y,
        position.z,
        rotation.x,
        rotation.y,
        rotation.z,
        fieldOfView,
        true,
        2,
      ),
    );
  }
  /**
   * Create a ped at a desired location.
   *
   * ```typescript
   * const position = new Vector3(-802.311, 175.056, 72.8446);
   * const model = new Model("a_f_m_beach_01");
   * const myPed = await World.createPed(model, position);
   * ```
   *
   * @param model Ped model to be spawned.
   * @param position World position (coordinates) of Ped spawn.
   * @param heading Heading of Ped when spawning.
   * @param isNetwork
   * @returns Ped object.
   */
  static async createPed(model, position, heading = 0, isNetwork = true) {
    if (!model.IsPed || !(await model.request(1000))) {
      return null;
    }
    return new Ped(
      CreatePed(26, model.Hash, position.x, position.y, position.z, heading, isNetwork, false),
    );
  }
  /**
   * Creates a [[`Ped`]] with a random model.
   *
   * ```typescript
   * const position = new Vector3(-802.311, 175.056, 72.8446);
   * const randomPed = World.createRandomPed(position);
   * ```
   *
   * @param position World coordinate of Ped spawn.
   * @returns Ped object.
   */
  static createRandomPed(position) {
    return new Ped(CreateRandomPed(position.x, position.y, position.z));
  }
  /**
   * Create a vehicle at a desired location.
   *
   * ```typescript
   * const position = new Vector3(-802.311, 175.056, 72.8446);
   * const model = new Model("adder");
   * const myVehicle = await World.createVehicle(model, position);
   * ```
   *
   * @param model Vehicle model to be spawned.
   * @param position World position (coordinates) of Vehicle spawn.
   * @param heading Heading of Vehicle when spawning.
   * @param isNetwork
   * @returns Vehicle object.
   */
  static async createVehicle(model, position, heading = 0, isNetwork = true) {
    if (!model.IsVehicle || !(await model.request(1000))) {
      return null;
    }
    return new Vehicle(
      CreateVehicle(model.Hash, position.x, position.y, position.z, heading, isNetwork, false),
    );
  }
  /**
   * Create a random vehicle at a desired location.
   *
   * ```typescript
   * const position = new Vector3(-802.311, 175.056, 72.8446);
   * const randomVehicle = await World.createRandomVehicle(position);
   * ```
   *
   * @param position World position (coordinates) of Vehicle spawn.
   * @param heading Heading of Vehicle when spawning.
   * @param isNetwork
   * @returns Vehicle object.
   */
  static async createRandomVehicle(position, heading = 0, isNetwork = true) {
    const vehicleCount = Object.keys(VehicleHash).length / 2; // check
    const randomIndex = Maths.getRandomInt(0, vehicleCount);
    const randomVehicleName = VehicleHash[randomIndex];
    const modelHash = GetHashKey(randomVehicleName);
    const model = new Model(modelHash);
    if (!model.IsVehicle || !(await model.request(1000))) {
      return null;
    }
    return new Vehicle(
      CreateVehicle(model.Hash, position.x, position.y, position.z, heading, isNetwork, false),
    );
  }
  /*
   * Creates a rope at the specified location.
   *
   * ```typescript
   * const position = new Vector3(-802.311, 175.056, 72.8446)
   * const rotation = new Vector3(0,0,0)
   * const rope = await World.createRope(position, rotation, 15.0, RopeType.ThickRope, 3.0, 0.5);
   * ```
   *
   * You should manually call `RopeUnloadTextures()` after you finish using **all** ropes, unlike models requesting rope models is instantaneous
   * If called with collisionOn you will have to LoadRopeData after
   */
  static async createRope(
    position,
    rotation,
    maxLength,
    ropeType,
    initLength,
    minLength,
    lengthChangeRate = 1.0,
    onlyPPU = false,
    collisionOn = false,
    lockFromFront = false,
    timeMultiplier = 1.0,
    breakable = false,
    shouldLoadTextures = true,
  ) {
    if (shouldLoadTextures) {
      if (!RopeAreTexturesLoaded()) {
        RopeLoadTextures();
      }
      while (!RopeAreTexturesLoaded()) {
        await Wait(0);
      }
    }
    const [ropeHandle] = AddRope(
      position.x,
      position.y,
      position.z,
      rotation.x,
      rotation.y,
      rotation.z,
      maxLength,
      ropeType,
      initLength,
      minLength,
      lengthChangeRate,
      onlyPPU,
      collisionOn,
      lockFromFront,
      timeMultiplier,
      breakable,
    );
    return new Rope(ropeHandle);
  }
  /**
   * Spawns a [[`Prop`]] at the given position.
   *
   * ```typescript
   * const position = new Vector3(-802.311, 175.056, 72.8446);
   * const model = new Model("prop_barrel_02a");
   * const myBarrelProp = await World.createProp(model, position, false, true);
   * ```
   *
   * @param model The [[`Model`]] to spawn (must be a Prop)
   * @param position Location of Prop
   * @param dynamic If set to true, the Prop will have physics otherwise it's static.
   * @param placeOnGround If set to true, sets the Prop on the ground nearest to position.
   * @param isNetwork
   * @returns Prop object.
   */
  static async createProp(model, position, dynamic, placeOnGround, isNetwork = true) {
    if (!model.IsProp || !(await model.request(1000))) {
      return null;
    }
    const prop = new Prop(
      CreateObject(model.Hash, position.x, position.y, position.z, isNetwork, true, dynamic),
    );
    if (placeOnGround) {
      prop.placeOnGround();
    }
    return prop;
  }
  /**
   * Create a pickup in a specific position in the world with a specified type and value.
   *
   * @param type The [[`PickupType`]] of pickup.
   * @param position The position in the world it should be spawned.
   * @param model The model of the spawned pickup.
   * @param value Give a value for the pickup when picked up.
   * @param rotation If set, create a rotating pickup with this rotation.
   * @returns Pickup object.
   */
  static async CreatePickup(type, position, model, value, rotation) {
    if (!(await model.request(1000))) {
      return null;
    }
    let handle = 0;
    if (rotation !== undefined)
      handle = CreatePickupRotate(
        type,
        position.x,
        position.y,
        position.z,
        rotation.x,
        rotation.y,
        rotation.z,
        0,
        value,
        2,
        true,
        model.Hash,
      );
    else
      handle = CreatePickup(type, position.x, position.y, position.z, 0, value, true, model.Hash);
    if (handle === 0) {
      return null;
    }
    return new Pickup(handle);
  }
  /**
   * Creates an ambient pickup.
   *
   * @param type The [[`PickupType`]] of the pickup.
   * @param position The position where it should be spawned.
   * @param model The model.
   * @param value The value tied to the pickup.
   * @returns The pickup in form of a Prop.
   */
  static async CreateAmbientPickup(type, position, model, value) {
    if (!(await model.request(1000))) {
      return null;
    }
    const handle = CreateAmbientPickup(
      type,
      position.x,
      position.y,
      position.z,
      0,
      value,
      model.Hash,
      false,
      true,
    );
    if (handle === 0) {
      return null;
    }
    return new Prop(handle);
  }
  /**
   * Draw a marker at a desired location. Careful! Must be drawn every tick.
   *
   * ```typescript
   * const position = new Vector3(-802.311, 175.056, 72.8446);
   * const zeroVector = new Vector3(0,0,0);
   *
   * setTick(() => {
   *  World.drawMarker(MarkerType.ThickChevronUp, position, zeroVector, zeroVector, 1.0, new Color(255,0,0));
   * })
   * ```
   *
   * @param type Type of marker.
   * @param position Location of marker.
   * @param direction Direction facing.
   * @param rotation World rotation.
   * @param scale Size of marker.
   * @param color Color of marker.
   * @param bobUpAndDown Animated movement along marker's own X axis.
   * @param faceCamera Rendering marker facing rendering camera.
   * @param rotateY Rotate along Y axis.
   * @param textureDict Custom texture dictionary for custom marker.
   * @param textureName Custom texture name for custom marker.
   * @param drawOnEntity Render the marker on an entity.
   */
  static drawMarker(
    type,
    position,
    direction,
    rotation,
    scale,
    color,
    bobUpAndDown = false,
    faceCamera = false,
    rotateY = false,
    textureDict = null,
    textureName = null,
    drawOnEntity = false,
  ) {
    DrawMarker(
      Number(type),
      position.x,
      position.y,
      position.z,
      direction.x,
      direction.y,
      direction.z,
      rotation.x,
      rotation.y,
      rotation.z,
      scale.x,
      scale.y,
      scale.z,
      color.r,
      color.g,
      color.b,
      color.a,
      bobUpAndDown,
      faceCamera,
      2,
      rotateY,
      textureDict,
      textureName,
      drawOnEntity,
    );
  }
  /**
   * Creates a light in the world with a certain length (range).
   *
   * @param pos World coordinate where to draw the light.
   * @param color RGB colors of the light.
   * @param range How far to draw the light.
   * @param intensity Intensity of the light ("alpha").
   */
  static drawLightWithRange(pos, color, range, intensity) {
    DrawLightWithRange(pos.x, pos.y, pos.z, color.r, color.g, color.b, range, intensity);
  }
  /**
   * Creates a light in the world. More configurable than World.drawLightWithRange.
   *
   * @param pos World coordinate of spotlight.
   * @param dir Direction to face spotlight.
   * @param color RGB colors of spotlight.
   * @param distance The maximum distance the spotlight can reach.
   * @param brightness Brightness of the spotlight.
   * @param roundness "Smoothness" of the edge of the spotlight.
   * @param radius Radius size of spotlight.
   * @param fadeOut Falloff size of the spotlight's edge.
   */
  static drawSpotLight(pos, dir, color, distance, brightness, roundness, radius, fadeOut) {
    DrawSpotLight(
      pos.x,
      pos.y,
      pos.z,
      dir.x,
      dir.y,
      dir.z,
      color.r,
      color.g,
      color.b,
      distance,
      brightness,
      roundness,
      radius,
      fadeOut,
    );
  }
  /**
   * Creates a light in the world. Same as World.drawSpotlight, but also draws shadows.
   *
   * @param pos World coordinate of spotlight.
   * @param dir Direction to face spotlight.
   * @param color RGB colors of spotlight.
   * @param distance The maximum distance the spotlight can reach.
   * @param brightness Brightness of the spotlight.
   * @param roundness "Smoothness" of the edge of the spotlight.
   * @param radius Radius size of spotlight.
   * @param fadeOut Falloff size of the spotlight's edge.
   */
  static drawSpotLightWithShadow(
    pos,
    dir,
    color,
    distance,
    brightness,
    roundness,
    radius,
    fadeOut,
  ) {
    DrawSpotLightWithShadow(
      pos.x,
      pos.y,
      pos.z,
      dir.x,
      dir.y,
      dir.z,
      color.r,
      color.g,
      color.b,
      distance,
      brightness,
      roundness,
      radius,
      fadeOut,
      0,
    );
  }
  /**
   * Draws a line in the world. It's not possible to change thickness.
   *
   * @param start World coordinate of start position of line.
   * @param end World coordinate of end position of line.
   * @param color RGB color of line.
   */
  static drawLine(start, end, color) {
    DrawLine(start.x, start.y, start.z, end.x, end.y, end.z, color.r, color.g, color.b, color.a);
  }
  /**
   * Draw polygon in the world.
   *
   * @param vertexA World coordinate of first point.
   * @param vertexB World coordinate of second point.
   * @param vertexC World coordinate of third point.
   * @param color RGB color of polygon.
   */
  static drawPoly(vertexA, vertexB, vertexC, color) {
    DrawPoly(
      vertexA.x,
      vertexA.y,
      vertexA.z,
      vertexB.x,
      vertexB.y,
      vertexB.z,
      vertexC.x,
      vertexC.y,
      vertexC.z,
      color.r,
      color.g,
      color.b,
      color.a,
    );
  }
  /**
   * Cast ("shoot") a ray in a certain direction to detect entities in the way.
   *
   * @param source Starting position of raycast.
   * @param direction Direction to cast a ray to.
   * @param maxDistance Max distance to cast the ray.
   * @param options Possible entity types to detect.
   * @param ignoreEntity An entity to ignore (usually player's Ped).
   * @returns RaycastResult object.
   */
  static raycast(source, direction, maxDistance, options, ignoreEntity) {
    const target = Vector3.add(source, Vector3.multiply(direction, maxDistance));
    return new RaycastResult(
      StartExpensiveSynchronousShapeTestLosProbe(
        source.x,
        source.y,
        source.z,
        target.x,
        target.y,
        target.z,
        Number(options),
        ignoreEntity.Handle,
        7,
      ),
    );
  }
  /**
   * Gets the closest object of this model
   */
  static getClosestObject(model, coords, radius = 25.0, isMission = false) {
    const prop = GetClosestObjectOfType(
      coords.x,
      coords.y,
      coords.z,
      radius,
      model.Hash,
      isMission,
      false,
      false,
    );
    if (prop !== 0) {
      return new Prop(prop);
    }
    return null;
  }
  /**
   * Get all [[`Prop`]] entities in your own scope.
   *
   * @returns Array of Props.
   */
  static getAllProps() {
    const handles = GetGamePool('CObject');
    const props = [];
    handles.forEach((handle) => props.push(new Prop(handle)));
    return props;
  }
  /**
   * Get all [[`Rope`]] entities in your own scope.
   *
   * @returns Array of Ropes.
   */
  static getAllRopes() {
    const handles = GetAllRopes();
    const props = [];
    handles.forEach((handle) => props.push(new Rope(handle)));
    return props;
  }
  /**
   * Get all [[`Ped`]] entities in your own scope.
   *
   * @returns Array of Peds.
   */
  static getAllPeds() {
    const handles = GetGamePool('CPed');
    const peds = [];
    handles.forEach((handle) => peds.push(new Ped(handle)));
    return peds;
  }
  /**
   * Get all [[`Vehicle`]] entities in your own scope.
   *
   * @returns Array of Vehicles.
   */
  static getAllVehicles() {
    const handles = GetGamePool('CVehicle');
    const vehicles = [];
    handles.forEach((handle) => vehicles.push(new Vehicle(handle)));
    return vehicles;
  }
  /**
   * Gets the cloest [[`Vehicle`]] to the current coords, or null if none are found
   * @returns the closest vehicle or null
   */
  static getClosestVehicle(coords) {
    const vehicles = this.getAllVehicles();
    let currentVeh = null;
    let lastDistance = 9999.0;
    for (const vehicle of vehicles) {
      if (!currentVeh) {
        currentVeh = vehicle;
        lastDistance = coords.distance(vehicle.Position);
        continue;
      }
      const distance = coords.distance(vehicle.Position);
      if (distance < lastDistance) {
        currentVeh = vehicle;
        lastDistance = distance;
      }
    }
    return currentVeh;
  }
  /**
   * Get all [[`Pickup`]] entities using the GetGamePool.
   * @returns Array of Pickups.
   */
  static getAllPickups() {
    const handles = GetGamePool('CPickup');
    const pickups = [];
    handles.forEach((handle) => pickups.push(new Pickup(handle)));
    return pickups;
  }
}
World.currentCloudHat = CloudHat.Clear;
World.cloudHatDict = new Map([
  [CloudHat.Unknown, 'Unknown'],
  [CloudHat.Altostratus, 'altostratus'],
  [CloudHat.Cirrus, 'Cirrus'],
  [CloudHat.Cirrocumulus, 'cirrocumulus'],
  [CloudHat.Clear, 'Clear 01'],
  [CloudHat.Cloudy, 'Cloudy 01'],
  [CloudHat.Contrails, 'Contrails'],
  [CloudHat.Horizon, 'Horizon'],
  [CloudHat.HorizonBand1, 'horizonband1'],
  [CloudHat.HorizonBand2, 'horizonband2'],
  [CloudHat.HorizonBand3, 'horizonband3'],
  [CloudHat.Horsey, 'horsey'],
  [CloudHat.Nimbus, 'Nimbus'],
  [CloudHat.Puffs, 'Puffs'],
  [CloudHat.Rain, 'RAIN'],
  [CloudHat.Snowy, 'Snowy 01'],
  [CloudHat.Stormy, 'Stormy 01'],
  [CloudHat.Stratoscumulus, 'stratoscumulus'],
  [CloudHat.Stripey, 'Stripey'],
  [CloudHat.Shower, 'shower'],
  [CloudHat.Wispy, 'Wispy'],
]);
World.weatherDict = [
  'EXTRASUNNY',
  'CLEAR',
  'CLOUDS',
  'SMOG',
  'FOGGY',
  'OVERCAST',
  'RAIN',
  'THUNDER',
  'CLEARING',
  'NEUTRAL',
  'SNOW',
  'BLIZZARD',
  'SNOWLIGHT',
  'XMAS',
];
