import Swiper from 'swiper/bundle';
import { Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
//@ts-ignore TS6133: ts(6133): 'swiper' is declared but its value is never read.
const swiper = new Swiper('.swiper', {
  modules: [Pagination],
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  speed: 1000,
  autoplay: {
    delay: 10000,
  },
});
