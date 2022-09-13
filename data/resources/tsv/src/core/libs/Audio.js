/* eslint-disable no-undef */
export class Audio {
  static playSoundAt(position, sound, set, generateSoundId = true) {
    const SOUND_ID = generateSoundId ? GetSoundId() : -1;
    PlaySoundFromCoord(
      SOUND_ID,
      sound,
      position.x,
      position.y,
      position.z,
      set ?? '',
      false,
      0,
      false,
    );
    return SOUND_ID;
  }
  static playSoundFromEntity(entity, sound, set, generateSoundId = true) {
    const SOUND_ID = generateSoundId ? GetSoundId() : -1;
    PlaySoundFromEntity(SOUND_ID, sound, entity.Handle, set ?? '', false, 0);
    return SOUND_ID;
  }
  static playSoundFrontEnd(sound, set, generateSoundId = true) {
    const SOUND_ID = generateSoundId ? GetSoundId() : -1;
    PlaySoundFrontend(SOUND_ID, sound, set ?? '', false);
    return SOUND_ID;
  }
  static stopSound(soundId) {
    StopSound(soundId);
  }
  static releaseSound(soundId) {
    ReleaseSoundId(soundId);
  }
  static hasSoundFinished(soundId) {
    return HasSoundFinished(soundId);
  }
  static setAudioFlag(flag, toggle) {
    if (typeof flag === 'string') {
      SetAudioFlag(flag, toggle);
    } else {
      SetAudioFlag(this.audioFlags[Number(flag)], toggle);
    }
  }
  static playSound(soundFile, soundSet) {
    this.releaseSound(this.playSoundFrontEnd(soundFile, soundSet));
  }
  static playMusic(musicFile) {
    if (!this.cachedMusicFile) {
      CancelMusicEvent(musicFile);
    }
    this.cachedMusicFile = musicFile;
    TriggerMusicEvent(musicFile);
  }
  static stopMusic(musicFile) {
    if (!musicFile) {
      if (!this.cachedMusicFile) {
        CancelMusicEvent(this.cachedMusicFile);
        this.cachedMusicFile = '';
      }
    } else {
      CancelMusicEvent(musicFile ?? '');
    }
  }
}
Audio.audioFlags = [
  'ActivateSwitchWheelAudio',
  'AllowCutsceneOverScreenFade',
  'AllowForceRadioAfterRetune',
  'AllowPainAndAmbientSpeechToPlayDuringCutscene',
  'AllowPlayerAIOnMission',
  'AllowPoliceScannerWhenPlayerHasNoControl',
  'AllowRadioDuringSwitch',
  'AllowRadioOverScreenFade',
  'AllowScoreAndRadio',
  'AllowScriptedSpeechInSlowMo',
  'AvoidMissionCompleteDelay',
  'DisableAbortConversationForDeathAndInjury',
  'DisableAbortConversationForRagdoll',
  'DisableBarks',
  'DisableFlightMusic',
  'DisableReplayScriptStreamRecording',
  'EnableHeadsetBeep',
  'ForceConversationInterrupt',
  'ForceSeamlessRadioSwitch',
  'ForceSniperAudio',
  'FrontendRadioDisabled',
  'HoldMissionCompleteWhenPrepared',
  'IsDirectorModeActive',
  'IsPlayerOnMissionForSpeech',
  'ListenerReverbDisabled',
  'LoadMPData',
  'MobileRadioInGame',
  'OnlyAllowScriptTriggerPoliceScanner',
  'PlayMenuMusic',
  'PoliceScannerDisabled',
  'ScriptedConvListenerMaySpeak',
  'SpeechDucksScore',
  'SuppressPlayerScubaBreathing',
  'WantedMusicDisabled',
  'WantedMusicOnMission',
];
