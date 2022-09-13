  // Dependencies
import React, { useEffect, useState } from 'react';
import { IconType as ReactIconsType } from 'react-icons';
// DECLARES
import { IconLibraryEnum, IconType } from '../../core/declares/nui';
// ICONS
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as MdIcons from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import * as GoIcons from 'react-icons/go';
import * as GrIcons from 'react-icons/gr';

function getDynamicIcon(icon: IconType) {
  try {
    switch (icon.library) {
      case IconLibraryEnum.FontAwesome:
        return FaIcons[icon.name];
      case IconLibraryEnum.AntDesignIcons:
        return AiIcons[icon.name];
      case IconLibraryEnum.MaterialDesignIcons:
        return MdIcons[icon.name];
      case IconLibraryEnum.Ionicons4:
        return IoIcons[icon.name];
      case IconLibraryEnum.GithubOcticonsIcons:
        return GoIcons[icon.name];
      case IconLibraryEnum.GrommetIcons:
        return GrIcons[icon.name];
    }
  } catch (error) {
    return FaIcons.FaQuestion;
  }
}

function IconDynamic ({ icon } : { icon: IconType }) {
  const [iconComponent, setIconComponent] = useState<ReactIconsType>();

  useEffect(() => {
    if (iconComponent === undefined) {
      setIconComponent(getDynamicIcon(icon));
    }
  });

  return (
    <>
      {iconComponent}
    </>
  );
}

export { IconDynamic };
