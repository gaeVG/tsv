export var ParachuteLandingType;
(function (ParachuteLandingType) {
  ParachuteLandingType[(ParachuteLandingType['None'] = -1)] = 'None';
  ParachuteLandingType[(ParachuteLandingType['Stumbling'] = 1)] = 'Stumbling';
  ParachuteLandingType[(ParachuteLandingType['Rolling'] = 2)] = 'Rolling';
  ParachuteLandingType[(ParachuteLandingType['Ragdoll'] = 3)] = 'Ragdoll';
})(ParachuteLandingType || (ParachuteLandingType = {}));
export var ParachuteState;
(function (ParachuteState) {
  ParachuteState[(ParachuteState['None'] = -1)] = 'None';
  ParachuteState[(ParachuteState['FreeFalling'] = 0)] = 'FreeFalling';
  ParachuteState[(ParachuteState['Deploying'] = 1)] = 'Deploying';
  ParachuteState[(ParachuteState['Gliding'] = 2)] = 'Gliding';
  ParachuteState[(ParachuteState['LandingOrFallingToDoom'] = 3)] = 'LandingOrFallingToDoom';
})(ParachuteState || (ParachuteState = {}));
