type MenuItem = {
  name: string;
  link: object;
  icon: string;
};

type MenuGroup = Record<string, MenuItem[]>;

export function mergeMenus(menus: MenuGroup[]): MenuGroup {
  const merged = menus.reduce((acc, menu) => {
    Object.keys(menu).forEach((key) => {
      if (acc[key]) {
        acc[key].push(...menu[key]);
      } else {
        acc[key] = [...menu[key]];
      }
    });
    return acc;
  }, {} as MenuGroup);

  Object.keys(merged).forEach((key) => {
    merged[key].sort((a, b) => a.name.localeCompare(b.name));
  });

  const compareKeys = (a: string, b: string): number => {
    const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
    const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);
    if (numA !== numB) {
      return numA - numB;
    }
    return a.localeCompare(b);
  };

  const sortedKeys = Object.keys(merged).sort(compareKeys);
  const sortedMenuGroup: MenuGroup = {};

  sortedKeys.forEach((key) => {
    sortedMenuGroup[key] = merged[key];
  });

  return sortedMenuGroup;
}
