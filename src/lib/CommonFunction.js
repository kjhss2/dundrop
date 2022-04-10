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