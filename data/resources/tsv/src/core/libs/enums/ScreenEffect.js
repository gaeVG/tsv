export var ScreenEffect;
(function (ScreenEffect) {
  ScreenEffect[(ScreenEffect['SwitchHudIn'] = 0)] = 'SwitchHudIn';
  ScreenEffect[(ScreenEffect['SwitchHudOut'] = 1)] = 'SwitchHudOut';
  ScreenEffect[(ScreenEffect['FocusIn'] = 2)] = 'FocusIn';
  ScreenEffect[(ScreenEffect['FocusOut'] = 3)] = 'FocusOut';
  ScreenEffect[(ScreenEffect['MinigameEndNeutral'] = 4)] = 'MinigameEndNeutral';
  ScreenEffect[(ScreenEffect['MinigameEndTrevor'] = 5)] = 'MinigameEndTrevor';
  ScreenEffect[(ScreenEffect['MinigameEndFranklin'] = 6)] = 'MinigameEndFranklin';
  ScreenEffect[(ScreenEffect['MinigameEndMichael'] = 7)] = 'MinigameEndMichael';
  ScreenEffect[(ScreenEffect['MinigameTransitionOut'] = 8)] = 'MinigameTransitionOut';
  ScreenEffect[(ScreenEffect['MinigameTransitionIn'] = 9)] = 'MinigameTransitionIn';
  ScreenEffect[(ScreenEffect['SwitchShortNeutralIn'] = 10)] = 'SwitchShortNeutralIn';
  ScreenEffect[(ScreenEffect['SwitchShortFranklinIn'] = 11)] = 'SwitchShortFranklinIn';
  ScreenEffect[(ScreenEffect['SwitchShortTrevorIn'] = 12)] = 'SwitchShortTrevorIn';
  ScreenEffect[(ScreenEffect['SwitchShortMichaelIn'] = 13)] = 'SwitchShortMichaelIn';
  ScreenEffect[(ScreenEffect['SwitchOpenMichaelIn'] = 14)] = 'SwitchOpenMichaelIn';
  ScreenEffect[(ScreenEffect['SwitchOpenFranklinIn'] = 15)] = 'SwitchOpenFranklinIn';
  ScreenEffect[(ScreenEffect['SwitchOpenTrevorIn'] = 16)] = 'SwitchOpenTrevorIn';
  ScreenEffect[(ScreenEffect['SwitchHudMichaelOut'] = 17)] = 'SwitchHudMichaelOut';
  ScreenEffect[(ScreenEffect['SwitchHudFranklinOut'] = 18)] = 'SwitchHudFranklinOut';
  ScreenEffect[(ScreenEffect['SwitchHudTrevorOut'] = 19)] = 'SwitchHudTrevorOut';
  ScreenEffect[(ScreenEffect['SwitchShortFranklinMid'] = 20)] = 'SwitchShortFranklinMid';
  ScreenEffect[(ScreenEffect['SwitchShortMichaelMid'] = 21)] = 'SwitchShortMichaelMid';
  ScreenEffect[(ScreenEffect['SwitchShortTrevorMid'] = 22)] = 'SwitchShortTrevorMid';
  ScreenEffect[(ScreenEffect['DeathFailOut'] = 23)] = 'DeathFailOut';
  ScreenEffect[(ScreenEffect['CamPushInNeutral'] = 24)] = 'CamPushInNeutral';
  ScreenEffect[(ScreenEffect['CamPushInFranklin'] = 25)] = 'CamPushInFranklin';
  ScreenEffect[(ScreenEffect['CamPushInMichael'] = 26)] = 'CamPushInMichael';
  ScreenEffect[(ScreenEffect['CamPushInTrevor'] = 27)] = 'CamPushInTrevor';
  ScreenEffect[(ScreenEffect['SwitchSceneFranklin'] = 28)] = 'SwitchSceneFranklin';
  ScreenEffect[(ScreenEffect['SwitchSceneTrevor'] = 29)] = 'SwitchSceneTrevor';
  ScreenEffect[(ScreenEffect['SwitchSceneMichael'] = 30)] = 'SwitchSceneMichael';
  ScreenEffect[(ScreenEffect['SwitchSceneNeutral'] = 31)] = 'SwitchSceneNeutral';
  ScreenEffect[(ScreenEffect['MpCelebWin'] = 32)] = 'MpCelebWin';
  ScreenEffect[(ScreenEffect['MpCelebWinOut'] = 33)] = 'MpCelebWinOut';
  ScreenEffect[(ScreenEffect['MpCelebLose'] = 34)] = 'MpCelebLose';
  ScreenEffect[(ScreenEffect['MpCelebLoseOut'] = 35)] = 'MpCelebLoseOut';
  ScreenEffect[(ScreenEffect['DeathFailNeutralIn'] = 36)] = 'DeathFailNeutralIn';
  ScreenEffect[(ScreenEffect['DeathFailMpDark'] = 37)] = 'DeathFailMpDark';
  ScreenEffect[(ScreenEffect['DeathFailMpIn'] = 38)] = 'DeathFailMpIn';
  ScreenEffect[(ScreenEffect['MpCelebPreloadFade'] = 39)] = 'MpCelebPreloadFade';
  ScreenEffect[(ScreenEffect['PeyoteEndOut'] = 40)] = 'PeyoteEndOut';
  ScreenEffect[(ScreenEffect['PeyoteEndIn'] = 41)] = 'PeyoteEndIn';
  ScreenEffect[(ScreenEffect['PeyoteIn'] = 42)] = 'PeyoteIn';
  ScreenEffect[(ScreenEffect['PeyoteOut'] = 43)] = 'PeyoteOut';
  ScreenEffect[(ScreenEffect['MpRaceCrash'] = 44)] = 'MpRaceCrash';
  ScreenEffect[(ScreenEffect['SuccessFranklin'] = 45)] = 'SuccessFranklin';
  ScreenEffect[(ScreenEffect['SuccessTrevor'] = 46)] = 'SuccessTrevor';
  ScreenEffect[(ScreenEffect['SuccessMichael'] = 47)] = 'SuccessMichael';
  ScreenEffect[(ScreenEffect['DrugsMichaelAliensFightIn'] = 48)] = 'DrugsMichaelAliensFightIn';
  ScreenEffect[(ScreenEffect['DrugsMichaelAliensFight'] = 49)] = 'DrugsMichaelAliensFight';
  ScreenEffect[(ScreenEffect['DrugsMichaelAliensFightOut'] = 50)] = 'DrugsMichaelAliensFightOut';
  ScreenEffect[(ScreenEffect['DrugsTrevorClownsFightIn'] = 51)] = 'DrugsTrevorClownsFightIn';
  ScreenEffect[(ScreenEffect['DrugsTrevorClownsFight'] = 52)] = 'DrugsTrevorClownsFight';
  ScreenEffect[(ScreenEffect['DrugsTrevorClownsFightOut'] = 53)] = 'DrugsTrevorClownsFightOut';
  ScreenEffect[(ScreenEffect['HeistCelebPass'] = 54)] = 'HeistCelebPass';
  ScreenEffect[(ScreenEffect['HeistCelebPassBw'] = 55)] = 'HeistCelebPassBw';
  ScreenEffect[(ScreenEffect['HeistCelebEnd'] = 56)] = 'HeistCelebEnd';
  ScreenEffect[(ScreenEffect['HeistCelebToast'] = 57)] = 'HeistCelebToast';
  ScreenEffect[(ScreenEffect['MenuMgHeistIn'] = 58)] = 'MenuMgHeistIn';
  ScreenEffect[(ScreenEffect['MenuMgTournamentIn'] = 59)] = 'MenuMgTournamentIn';
  ScreenEffect[(ScreenEffect['MenuMgSelectionIn'] = 60)] = 'MenuMgSelectionIn';
  ScreenEffect[(ScreenEffect['ChopVision'] = 61)] = 'ChopVision';
  ScreenEffect[(ScreenEffect['DmtFlightIntro'] = 62)] = 'DmtFlightIntro';
  ScreenEffect[(ScreenEffect['DmtFlight'] = 63)] = 'DmtFlight';
  ScreenEffect[(ScreenEffect['DrugsDrivingIn'] = 64)] = 'DrugsDrivingIn';
  ScreenEffect[(ScreenEffect['DrugsDrivingOut'] = 65)] = 'DrugsDrivingOut';
  ScreenEffect[(ScreenEffect['SwitchOpenNeutralFib5'] = 66)] = 'SwitchOpenNeutralFib5';
  ScreenEffect[(ScreenEffect['HeistLocate'] = 67)] = 'HeistLocate';
  ScreenEffect[(ScreenEffect['MpJobLoad'] = 68)] = 'MpJobLoad';
  ScreenEffect[(ScreenEffect['RaceTurbo'] = 69)] = 'RaceTurbo';
  ScreenEffect[(ScreenEffect['MpIntroLogo'] = 70)] = 'MpIntroLogo';
  ScreenEffect[(ScreenEffect['HeistTripSkipFade'] = 71)] = 'HeistTripSkipFade';
  ScreenEffect[(ScreenEffect['MenuMgHeistOut'] = 72)] = 'MenuMgHeistOut';
  ScreenEffect[(ScreenEffect['MpCoronaSwitch'] = 73)] = 'MpCoronaSwitch';
  ScreenEffect[(ScreenEffect['MenuMgSelectionTint'] = 74)] = 'MenuMgSelectionTint';
  ScreenEffect[(ScreenEffect['SuccessNeutral'] = 75)] = 'SuccessNeutral';
  ScreenEffect[(ScreenEffect['ExplosionJosh3'] = 76)] = 'ExplosionJosh3';
  ScreenEffect[(ScreenEffect['SniperOverlay'] = 77)] = 'SniperOverlay';
  ScreenEffect[(ScreenEffect['RampageOut'] = 78)] = 'RampageOut';
  ScreenEffect[(ScreenEffect['Rampage'] = 79)] = 'Rampage';
  ScreenEffect[(ScreenEffect['DontTazemeBro'] = 80)] = 'DontTazemeBro';
})(ScreenEffect || (ScreenEffect = {}));
