export const getServerName = (key) => {
  switch (key) {
    case 'cain':
      return '카인';
    case 'diregie':
      return '디레지에';
    case 'siroco':
      return '시로코';
    case 'prey':
      return '프레이';
    case 'casillas':
      return '카시야스';
    case 'hilder':
      return '힐더';
    case 'anton':
      return '안톤';
    case 'bakal':
      return 'bakal';
    default:
      break;
  }
};

export const getItemRarityColor = (key) => {
  switch (key) {
    case '커먼':
      return '#FFFFFF';
    case '언커먼':
      return '#68D5ED';
    case '레어':
      return '#B36BFF';
    case '유니크':
      return '#FF00FF';
    case '에픽':
      return '#FFB400';
    case '크로니클':
      return '#FF6666';
    case '레전더리	':
      return '#FF7800';
    case '신화':
      return 'deeppink';
    default:
      break;
  }
};

// NumberCommaGen Functions
export function numberWithCommas(x, defaultZero = '0') {
  if (x === 0) {
    return defaultZero;
  } else {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

// 장착장비 드랍정보 요약 생성
export const makeItemDropInfoSummary = (items) => {
  let dropInfoSummary = new Map();
  if (items) {
    items.forEach(item => {
      item.dropInfos && item.dropInfos.forEach(dropInfo => {
        if (dropInfoSummary.has(dropInfo)) {
          const getItem = dropInfoSummary.get(dropInfo);
          dropInfoSummary.set(dropInfo, getItem + 1);
        } else {
          dropInfoSummary.set(dropInfo, 1);
        }
      })
    })
  }
  let mountItemDropInfoSummary = Array.from(dropInfoSummary, ([name, value]) => ({ name, value }));
  mountItemDropInfoSummary.sort(({ name, value }, { name: bName, value: bValue }) => {
    if (bValue > value) {
      return 1;
    } else if (bValue < value) {
      return -1;
    } else {
      if (name > bName) {
        return 1;
      } else if (name < bName) {
        return -1;
      }
    }
    return 0;
  });
  return mountItemDropInfoSummary;
};