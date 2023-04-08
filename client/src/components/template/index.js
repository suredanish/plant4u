import PeaceLilly from "./peaceLilly";
import GoldenPothos from "./goldenPothos";
import MajesticPalm from "./majesticPalm";
import StringPearl from "./stringPearl";
import HeartLeafPhilodendron from "./heartLeafPhilodendron";
import FicsuBonsai from "./ficusBonsai";

const template = (data) => {
    if(data.metaDescription === 'peaceLilly') {
        return <PeaceLilly />
    }
    else if(data.metaDescription === 'goldenPothos') {
        return <GoldenPothos />
    }
    else if(data.metaDescription === 'majesticPalm') {
        return <MajesticPalm />
    }
    else if(data.metaDescription === 'stringPearl')  {
        return <StringPearl />
    }
    else if(data.metaDescription === 'heartLeafPhilodendron')  {
        return <HeartLeafPhilodendron />
    }
    else if(data.metaDescription === "ficusBonsai") {
        return <FicsuBonsai />
    }
    return;
};
  
export default template;
  