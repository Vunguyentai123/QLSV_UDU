'use client';
import{
    faCalculator,
    faFlask,
    faGlobe,
    faBook,
    faLaptopCode,
    faPalette,
    faComments,
    faPhoneAlt,
    faEnvelope,
    faShareAlt,
    faSearch,
    faSlidersH,
    faFilter,
    faSort,
    faChartPie,
    faTable,
    faDatabase,
    faFileAlt,
    faCamera,
    faQuestion,
} from '@fortawesome/free-solid-svg-icons';

function convertToFaIcons(textIcon){
    switch(textIcon){
        case 'faCalculator':
            return faCalculator;
        case 'faFlask':
            return faFlask;
        case 'faGlobe':
            return faGlobe;
        case 'faBook':
            return faBook;
        case 'faLaptopCode':
            return faLaptopCode;
        case 'faPalette':
            return faPalette;
        case 'faComments':
            return faComments;
        case 'faPhoneAlt':
            return faPhoneAlt;
        case 'faEnvelope':
            return faEnvelope;
        case 'faShareAlt':
            return faShareAlt;
        case 'faSearch':
            return faSearch;
        case 'faSlidersH':
            return faSlidersH;
        case 'faFilter':
            return faFilter;
        case 'faSort':
            return faSort;
        case 'faChartPie':
            return faChartPie;
        case 'faTable':
            return faTable;
        case 'faDatabase':
            return faDatabase;
        case 'faFileAlt':
            return faFileAlt;
        case 'faCamera':
            return faCamera;
        case 'faQuestion':
            return faQuestion;
        default:
            return faQuestion;
    }
}

export default convertToFaIcons;
