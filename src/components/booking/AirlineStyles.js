import qantas from '../../images/qantas.jpeg';
import jetstar from '../../images/jetstar.png';
import airnewzealand from '../../images/airnewzealand.png';
import unknown from '../../images/unknown-carrier.png';

export const backgroundStyles = {
  QF: `linear-gradient(8deg, transparent 15px, #08090a 46px), 
         linear-gradient(#cccccc 45%, #f6bbbb9c 26%, #830808f7 70%)`,
  JQ: `linear-gradient(8deg, transparent 15px, rgb(8, 9, 10) 46px), 
        linear-gradient(rgb(204, 204, 204) 45%, rgba(246, 187, 187, 0.61) 26%, rgb(229 79 15 / 80%) 70%)`,
  ANZ: `linear-gradient(8deg, transparent 15px, rgb(8, 9, 10) 46px), linear-gradient(rgb(204, 204, 204) 45%, 
        rgba(246, 187, 187, 0.61) 26%, rgb(161 161 161 / 80%) 70%)`,
  default: `linear-gradient(8deg, transparent 15px, #08090a 46px), 
              linear-gradient(#cccccc 45%, #f6bbbb9c 26%, #830808f7 70%)`,
};

export const backgroundColors = {
  QF: '#080808',
  JQ: '#131314',
  ANZ: '#feffff',
  default: 'white',
};

export const airlineImages = {
  QF: qantas,
  JQ: jetstar,
  ANZ: airnewzealand,
  default: unknown,
};
