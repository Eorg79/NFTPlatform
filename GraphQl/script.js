const axios = require('axios');

const main = async () => {
    try {

        const result = await axios.post('https://api.studio.thegraph.com/query/28346/skystamps/0.1', {
            query:`{
                collections(first: 5) {
                    id
                    creator
                    collectionName
                    collectionSymbol
                }
            }`
        }
        );
        console.log(result.data.data.collections);
    } catch(error) {
        console.error(error);
    }
};
main();