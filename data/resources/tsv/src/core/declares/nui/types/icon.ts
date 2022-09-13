import { IconLibraryEnum } from '..';

type IconLibraryType =
  | IconLibraryEnum.AntDesignIcons
  | IconLibraryEnum.BootstrapIcons
  | IconLibraryEnum.BoxIcons
  | IconLibraryEnum.DevIcons
  | IconLibraryEnum.Feather
  | IconLibraryEnum.FlatColorIcons
  | IconLibraryEnum.FontAwesome
  | IconLibraryEnum.GameIcons
  | IconLibraryEnum.GithubOcticonsIcons
  | IconLibraryEnum.GrommetIcons
  | IconLibraryEnum.HeroIcons
  | IconLibraryEnum.IcoMoonFree
  | IconLibraryEnum.Ionicons4
  | IconLibraryEnum.Ionicons5
  | IconLibraryEnum.MaterialDesignIcons
  | IconLibraryEnum.RemixIcons
  | IconLibraryEnum.SimpleIcons
  | IconLibraryEnum.TablerIcons
  | IconLibraryEnum.TypIcons
  | IconLibraryEnum.VSCodeIcons
  | IconLibraryEnum.CSSGG;

type IconType = {
  name: string;
  library: IconLibraryType;
  size?: number;
  color?: string;
};

export { IconLibraryType, IconType };
