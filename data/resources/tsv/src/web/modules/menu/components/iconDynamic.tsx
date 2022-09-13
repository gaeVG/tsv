// Dependencies
import { useEffect, useState } from 'react';
// DECLARES
import { IconLibraryEnum } from '../../../../core/declares/nui';
// ICONS
import FaIcons from 'react-icons/fa';
import AiIcons from 'react-icons/ai';
import IoIcons from 'react-icons/io';
import MdIcons from 'react-icons/md';
import TiIcons from 'react-icons/ti';

type LibraryIconType = 
  | typeof FaIcons
  | typeof AiIcons
  | typeof IoIcons
  | typeof MdIcons
  | typeof TiIcons;

function getIconLibrary (iconLibrary: string) {
  switch (iconLibrary) {
    case IconLibraryEnum.FontAwesome:
      return FaIcons;
    case IconLibraryEnum.AntDesignIcons:
      return AiIcons;
    case IconLibraryEnum.Ionicons4:
    case IconLibraryEnum.Ionicons5:
      return IoIcons;
    case IconLibraryEnum.MaterialDesignIcons:
      return MdIcons;
    case IconLibraryEnum.TypIcons:
      return TiIcons;
    default:
      throw Error('Icon library not found');
      return null;
  }
}

function DynamicIcon ({ library, icon, size, color } : { library: string, icon: string, size: number, color: string }) {
  const [libraryIcon, setLibraryIcon] = useState<LibraryIconType>();
  const [iconComponent, setIconComponent] = useState<JSX.Element>();

  useEffect(() => {
    if (libraryIcon === undefined) {
      setLibraryIcon(getIconLibrary(library));
    }
  });

  useEffect(() => {
    if (iconComponent === undefined) {
      setIconComponent(libraryIcon[icon]);
    }
  }, [libraryIcon]);

  useEffect(() => {
    if (iconComponent === null) {
      setIconComponent(AiIcons.AiOutlineQuestion);
    }
  }, [iconComponent]);

  return (iconComponent && (iconComponent.props = {
    ...iconComponent.props,
    size,
    color
  }))
}

export { DynamicIcon };
