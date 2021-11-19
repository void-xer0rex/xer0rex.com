import { getGists } from "./github-manager";


window.onload = async () => {  
    
    console.log('loaded file');

    return await getGists()
    .then((result: any) => {
        console.log('running main');
        console.log(result);
    })
    .catch((e: any) => {
        console.error(e);
    });
};

console.log('end of file')
