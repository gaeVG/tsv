export var AnimationFlags;
(function (AnimationFlags) {
  AnimationFlags[(AnimationFlags['None'] = 0)] = 'None';
  AnimationFlags[(AnimationFlags['Loop'] = 1)] = 'Loop';
  AnimationFlags[(AnimationFlags['StayInEndFrame'] = 2)] = 'StayInEndFrame';
  AnimationFlags[(AnimationFlags['UpperBodyOnly'] = 16)] = 'UpperBodyOnly';
  AnimationFlags[(AnimationFlags['AllowRotation'] = 32)] = 'AllowRotation';
  AnimationFlags[(AnimationFlags['CancelableWithMovement'] = 128)] = 'CancelableWithMovement';
  AnimationFlags[(AnimationFlags['RagdollOnCollision'] = 4194304)] = 'RagdollOnCollision';
})(AnimationFlags || (AnimationFlags = {}));
