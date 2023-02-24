import PeaceLilly from "./peaceLilly";

const template = (data) => {
    if(data.metaDescription == 'peaceLilly') {
        return <PeaceLilly />
    }
    else if(data.metaDescription == 'peaceLilly1') {
        return <PeaceLilly />
    }
    return;
};
  
export default template;
  