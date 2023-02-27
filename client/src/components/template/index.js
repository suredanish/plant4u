import PeaceLilly from "./peaceLilly";
import GoldenPothos from "./goldenPothos";
import MajesticPalm from "./majesticPalm";
import StringPearl from "./stringPearl";
import HeartLeafPhilodendron from "./heartLeafPhilodendron";

const template = (data) => {
    if(data.metaDescription == 'peaceLilly') {
        return <PeaceLilly />
    }
    else if(data.metaDescription == 'peaceLilly1') {
        return <PeaceLilly />
    }
    else if(data.metaDescription == 'goldenPothos') {
        return <GoldenPothos />
    }
    else if(data.metaDescription == 'majesticPalm') {
        return <MajesticPalm />
    }
    else if(data.metaDescription == 'stringPearl')  {
        return <StringPearl />
    }
    else if(data.metaDescription == 'heartLeafPhilodendron')  {
        return <HeartLeafPhilodendron />
    }
    return;
};
  
export default template;
  