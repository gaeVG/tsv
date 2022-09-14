import { SkinCharacter } from '../../../core/declares/user';
import { EnumLogContainer, LogData } from '../../../core/declares/log';
import { Log } from '../../../core/libs/log';
import { tsv } from '../../index';
import moduleConfig from './config';

const log: LogData = {
  namespace: `Module${moduleConfig.name.charAt(0).toUpperCase() + moduleConfig.name.slice(1)}`,
  container: EnumLogContainer.Module,
  isModuleDisplay: moduleConfig.debug,
};

class Skin {
  character: SkinCharacter;
  skinId: number;
  skinName: string;
  skinDescription: any;
  skinPrice: number;
  skinImage: number;
  isOtherPed: boolean;

  constructor(
    skinId: number,
    skinName: string,
    skinDescription: any,
    skinPrice: number,
    skinImage: number,
  ) {
    this.skinId = skinId;
    this.skinName = skinName;
    this.skinDescription = skinDescription;
    this.skinPrice = skinPrice;
    this.skinImage = skinImage;
    this.isOtherPed = false;
  }

  applySkin(skin: SkinCharacter, clothes?: any): void {
    const playerPed = PlayerPedId();

    Object.entries(skin).forEach(([key, value]) => {
      this.character[key] = value;
    });

    if (clothes !== null) {
      Object.entries(clothes).forEach(([key, value]) => {
        if (!this.character[key]) {
          this.character[key] = value;
        }
      });
    }

    const face_weight = this.character['face_md_weight'] / 100 + 0.0;
    const skin_weight = this.character['skin_md_weight'] / 100 + 0.0;
    SetPedHeadBlendData(
      playerPed,
      this.character.mom,
      this.character.dad,
      0,
      this.character.mom,
      this.character.dad,
      0,
      face_weight,
      skin_weight,
      0.0,
      false,
    );
    SetPedFaceFeature(playerPed, 0, this.character.nose_1 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 1, this.character.nose_2 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 2, this.character.nose_3 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 3, this.character.nose_4 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 4, this.character.nose_5 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 5, this.character.nose_6 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 6, this.character.eyebrows_5 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 7, this.character.eyebrows_6 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 8, this.character.cheeks_1 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 9, this.character.cheeks_2 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 10, this.character.cheeks_3 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 11, this.character.eye_squint / 10 + 0.0);
    SetPedFaceFeature(playerPed, 12, this.character.lip_thickness / 10 + 0.0);
    SetPedFaceFeature(playerPed, 13, this.character.jaw_1 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 14, this.character.jaw_2 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 15, this.character.chin_1 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 16, this.character.chin_2 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 17, this.character.chin_3 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 18, this.character.chin_4 / 10 + 0.0);
    SetPedFaceFeature(playerPed, 19, this.character.neck_thickness / 10 + 0.0);

    SetPedHairColor(playerPed, this.character.hair_color_1, this.character.hair_color_2);
    SetPedHeadOverlay(playerPed, 3, this.character.age_1, this.character.age_2 / 10 + 0.0);
    SetPedHeadOverlay(
      playerPed,
      0,
      this.character.blemishes_1,
      this.character.blemishes_2 / 10 + 0.0,
    );
    SetPedHeadOverlay(playerPed, 1, this.character.beard_1, this.character.beard_2 / 10 + 0.0);
    SetPedEyeColor(playerPed, this.character.eye_color);
    SetPedHeadOverlay(
      playerPed,
      2,
      this.character.eyebrows_1,
      this.character.eyebrows_2 / 10 + 0.0,
    );
    SetPedHeadOverlay(playerPed, 4, this.character.makeup_1, this.character.makeup_2 / 10 + 0.0);
    SetPedHeadOverlay(
      playerPed,
      8,
      this.character.lipstick_1,
      this.character.lipstick_2 / 10 + 0.0,
    );
    SetPedComponentVariation(playerPed, 2, this.character.hair_1, this.character.hair_2, 2);
    SetPedHeadOverlayColor(playerPed, 1, 1, this.character.beard_3, this.character.beard_4);
    SetPedHeadOverlayColor(playerPed, 2, 1, this.character.eyebrows_3, this.character.eyebrows_4);
    SetPedHeadOverlayColor(playerPed, 4, 2, this.character.makeup_3, this.character.makeup_4);
    SetPedHeadOverlayColor(playerPed, 8, 1, this.character.lipstick_3, this.character.lipstick_4);
    SetPedHeadOverlay(playerPed, 5, this.character.blush_1, this.character.blush_2 / 10 + 0.0);
    SetPedHeadOverlayColor(playerPed, 5, 2, this.character.blush_3, 0);
    SetPedHeadOverlay(
      playerPed,
      6,
      this.character.complexion_1,
      this.character.complexion_2 / 10 + 0.0,
    );
    SetPedHeadOverlay(playerPed, 7, this.character.sun_1, this.character.sun_2 / 10 + 0.0);
    SetPedHeadOverlay(playerPed, 9, this.character.moles_1, this.character.moles_2 / 10 + 0.0);
    SetPedHeadOverlay(playerPed, 10, this.character.chest_1, this.character.chest_2 / 10 + 0.0);
    SetPedHeadOverlayColor(playerPed, 10, 1, this.character.chest_3, 0);

    this.character.bodyb_1 === -1
      ? SetPedHeadOverlay(playerPed, 11, 255, this.character.bodyb_2 / 10 + 0.0)
      : SetPedHeadOverlay(playerPed, 11, this.character.bodyb_1, this.character.bodyb_2 / 10 + 0.0);
    this.character.bodyb_3 === -1
      ? SetPedHeadOverlay(playerPed, 12, 255, this.character.bodyb_4 / 10 + 0.0)
      : SetPedHeadOverlay(playerPed, 12, this.character.bodyb_3, this.character.bodyb_4 / 10 + 0.0);
    this.character.ears_1 === -1
      ? ClearPedProp(playerPed, 2)
      : SetPedPropIndex(playerPed, 2, this.character.ears_1, this.character.ears_2, true);

    SetPedComponentVariation(playerPed, 8, this.character.tshirt_1, this.character.tshirt_2, 2);
    SetPedComponentVariation(playerPed, 11, this.character.torso_1, this.character.torso_2, 2);
    SetPedComponentVariation(playerPed, 3, this.character.arms, this.character.arms_2, 2);
    SetPedComponentVariation(playerPed, 10, this.character.decals_1, this.character.decals_2, 2);
    SetPedComponentVariation(playerPed, 4, this.character.pants_1, this.character.pants_2, 2);
    SetPedComponentVariation(playerPed, 6, this.character.shoes_1, this.character.shoes_2, 2);
    SetPedComponentVariation(playerPed, 1, this.character.mask_1, this.character.mask_2, 2);
    SetPedComponentVariation(playerPed, 9, this.character.bproof_1, this.character.bproof_2, 2);
    SetPedComponentVariation(playerPed, 7, this.character.chain_1, this.character.chain_2, 2);
    SetPedComponentVariation(playerPed, 5, this.character.bags_1, this.character.bags_2, 2);

    this.character.helmet_1 === -1
      ? ClearPedProp(playerPed, 0)
      : SetPedPropIndex(playerPed, 0, this.character.helmet_1, this.character.helmet_2, true);
    this.character.glasses_1 === -1
      ? ClearPedProp(playerPed, 1)
      : SetPedPropIndex(playerPed, 1, this.character.glasses_1, this.character.glasses_2, true);
    this.character.watches_1 === -1
      ? ClearPedProp(playerPed, 6)
      : SetPedPropIndex(playerPed, 6, this.character.watches_1, this.character.watches_2, true);
    this.character.bracelets_1 === -1
      ? ClearPedProp(playerPed, 7)
      : SetPedPropIndex(playerPed, 7, this.character.bracelets_1, this.character.bracelets_2, true);
  }
  loadDefaultModel(malePed: boolean, cb?: () => void): void {
    const playerPed = PlayerPedId();
    let characterModel: number;

    if (malePed) {
      characterModel = GetHashKey('mp_m_freemode_01');
    } else {
      characterModel = GetHashKey('mp_f_freemode_01');
    }

    RequestModel(characterModel);

    if (characterModel) {
      while (!HasModelLoaded(characterModel)) {
        RequestModel(characterModel);
        Wait(0);
      }

      if (IsModelInCdimage(characterModel) && IsModelValid(characterModel)) {
        SetPlayerModel(PlayerId(), characterModel);
        SetPedDefaultComponentVariation(playerPed);
      }

      SetModelAsNoLongerNeeded(characterModel);

      if (cb !== null) {
        cb();
      }

      tsv.events.trigger({ name: 'modelLoaded', module: 'skinchanger' });
    }
  }
  getMaxVals(): SkinCharacter {
    const playerPed = PlayerPedId();

    return {
      sex: 1,
      mom: 45,
      dad: 44,
      face_md_weight: 100,
      skin_md_weight: 100,
      nose_1: 10,
      nose_2: 10,
      nose_3: 10,
      nose_4: 10,
      nose_5: 10,
      nose_6: 10,
      cheeks_1: 10,
      cheeks_2: 10,
      cheeks_3: 10,
      lip_thickness: 10,
      jaw_1: 10,
      jaw_2: 10,
      chin_1: 10,
      chin_2: 10,
      chin_3: 10,
      chin_4: 10,
      neck_thickness: 10,
      age_1: GetPedHeadOverlayNum(3) - 1,
      age_2: 10,
      beard_1: GetPedHeadOverlayNum(1) - 1,
      beard_2: 10,
      beard_3: GetNumHairColors() - 1,
      beard_4: GetNumHairColors() - 1,
      hair_1: GetNumberOfPedDrawableVariations(playerPed, 2) - 1,
      hair_2: GetNumberOfPedTextureVariations(playerPed, 2, this.character.hair_1) - 1,
      hair_color_1: GetNumHairColors() - 1,
      hair_color_2: GetNumHairColors() - 1,
      eye_color: 31,
      eye_squint: 10,
      eyebrows_1: GetPedHeadOverlayNum(2) - 1,
      eyebrows_2: 10,
      eyebrows_3: GetNumHairColors() - 1,
      eyebrows_4: GetNumHairColors() - 1,
      eyebrows_5: 10,
      eyebrows_6: 10,
      makeup_1: GetPedHeadOverlayNum(4) - 1,
      makeup_2: 10,
      makeup_3: GetNumHairColors() - 1,
      makeup_4: GetNumHairColors() - 1,
      lipstick_1: GetPedHeadOverlayNum(8) - 1,
      lipstick_2: 10,
      lipstick_3: GetNumHairColors() - 1,
      lipstick_4: GetNumHairColors() - 1,
      blemishes_1: GetPedHeadOverlayNum(0) - 1,
      blemishes_2: 10,
      blush_1: GetPedHeadOverlayNum(5) - 1,
      blush_2: 10,
      blush_3: GetNumHairColors() - 1,
      complexion_1: GetPedHeadOverlayNum(6) - 1,
      complexion_2: 10,
      sun_1: GetPedHeadOverlayNum(7) - 1,
      sun_2: 10,
      moles_1: GetPedHeadOverlayNum(9) - 1,
      moles_2: 10,
      chest_1: GetPedHeadOverlayNum(10) - 1,
      chest_2: 10,
      chest_3: GetNumHairColors() - 1,
      bodyb_1: GetPedHeadOverlayNum(11) - 1,
      bodyb_2: 10,
      bodyb_3: GetPedHeadOverlayNum(12) - 1,
      bodyb_4: 10,
      ears_1: GetNumberOfPedPropDrawableVariations(playerPed, 2) - 1,
      ears_2: GetNumberOfPedPropTextureVariations(playerPed, 2, this.character.ears_1 - 1),
      tshirt_1: GetNumberOfPedDrawableVariations(playerPed, 8) - 1,
      tshirt_2: GetNumberOfPedTextureVariations(playerPed, 8, this.character.tshirt_1) - 1,
      torso_1: GetNumberOfPedDrawableVariations(playerPed, 11) - 1,
      torso_2: GetNumberOfPedTextureVariations(playerPed, 11, this.character.torso_1) - 1,
      decals_1: GetNumberOfPedDrawableVariations(playerPed, 10) - 1,
      decals_2: GetNumberOfPedTextureVariations(playerPed, 10, this.character.decals_1) - 1,
      arms: GetNumberOfPedDrawableVariations(playerPed, 3) - 1,
      arms_2: 10,
      pants_1: GetNumberOfPedDrawableVariations(playerPed, 4) - 1,
      pants_2: GetNumberOfPedTextureVariations(playerPed, 4, this.character.pants_1) - 1,
      shoes_1: GetNumberOfPedDrawableVariations(playerPed, 6) - 1,
      shoes_2: GetNumberOfPedTextureVariations(playerPed, 6, this.character.shoes_1) - 1,
      mask_1: GetNumberOfPedDrawableVariations(playerPed, 1) - 1,
      mask_2: GetNumberOfPedTextureVariations(playerPed, 1, this.character.mask_1) - 1,
      bproof_1: GetNumberOfPedDrawableVariations(playerPed, 9) - 1,
      bproof_2: GetNumberOfPedTextureVariations(playerPed, 9, this.character.bproof_1) - 1,
      chain_1: GetNumberOfPedDrawableVariations(playerPed, 7) - 1,
      chain_2: GetNumberOfPedTextureVariations(playerPed, 7, this.character.chain_1) - 1,
      bags_1: GetNumberOfPedDrawableVariations(playerPed, 5) - 1,
      bags_2: GetNumberOfPedTextureVariations(playerPed, 5, this.character.bags_1) - 1,
      helmet_1: GetNumberOfPedPropDrawableVariations(playerPed, 0) - 1,
      helmet_2: GetNumberOfPedPropTextureVariations(playerPed, 0, this.character.helmet_1) - 1,
      glasses_1: GetNumberOfPedPropDrawableVariations(playerPed, 1) - 1,
      glasses_2: GetNumberOfPedPropTextureVariations(playerPed, 1, this.character.glasses_1 - 1),
      watches_1: GetNumberOfPedPropDrawableVariations(playerPed, 6) - 1,
      watches_2: GetNumberOfPedPropTextureVariations(playerPed, 6, this.character.watches_1) - 1,
      bracelets_1: GetNumberOfPedPropDrawableVariations(playerPed, 7) - 1,
      bracelets_2: GetNumberOfPedPropTextureVariations(
        playerPed,
        7,
        this.character['bracelets_1'] - 1,
      ),
    };
  }
  loadSkin(skinLoad: SkinCharacter, cb: () => void): void {
    log.location = 'loadSkin()';

    Log.safemode({ ...log });
    Object.entries(skinLoad).forEach(([key, value]) => {
      Log.safemode({
        ...log,
        message: `${key} = ${value}`,
        isChild: true,
      });
    });

    Log.safemode({
      ...log,
      message: 'module.skin.loadSkin.triggerCallback',
      isChild: true,
      isLast: true,
    });
    cb();
  }
}

export { Skin };
