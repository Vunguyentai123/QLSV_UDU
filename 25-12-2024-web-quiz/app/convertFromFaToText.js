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

function convertFromFaToText(icon){

    if (icon === faCalculator){
        return 'faCalculator';
    }else if(icon === faFlask){
        return 'faFlask';
    }else if(icon === faGlobe){
        return 'faGlobe';
    }else if(icon === faBook){
        return 'faBook';
    }else if(icon === faLaptopCode){
        return 'faLaptopCode';
    }else if(icon === faPalette){
        return 'faPalette';
    }else if(icon === faComments){
        return 'faComments';
    }else if(icon === faPhoneAlt){
        return 'faPhoneAlt';
    }else if(icon === faEnvelope){
        return 'faEnvelope';
    }
    else if(icon === faShareAlt){
        return 'faShareAlt';
    }else if(icon === faSearch){
        return 'faSearch';
    }else if(icon === faSlidersH){
        return 'faSlidersH';
    }else if(icon === faFilter){
        return 'faFilter';
    }else if(icon === faSort){
        return 'faSort';
    }else if(icon === faChartPie){
        return 'faChartPie';
    }else if(icon === faTable){
        return 'faTable';
    }else if(icon === faDatabase){
        return 'faDatabase';
    }else if(icon === faFileAlt){
        return 'faFileAlt';
    }else if(icon === faCamera){
        return 'faCamera';
    }else if(icon === faQuestion){
        return 'faQuestion';
    }else{
        return 'faQuestion';
    }
}

export default convertFromFaToText;
