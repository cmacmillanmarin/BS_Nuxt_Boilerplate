/* eslint-disable */
//
// assets/js/core/Loader.js

export const loadAssets = (assets)=>{
    return new Promise(async(resolve)=>{
        if (!process.browser) resolve(assets);
        const _assets = [];
        let assetsLoaded = 0;
        for (const asset of assets) {
            _assets.push(await loadAsset(asset));
            assetsLoaded = assetsLoaded + 1;
            if (assetsLoaded === assets.length) resolve(_assets);
        }
    });
};

export const loadAsset = (asset)=>{
    return new Promise((resolve)=>{
        if (!process.browser) resolve(asset);
        const image = new Image();
        try {
            image.src = asset;
            image.decode()
                .then(()=>{ resolve(image); })
                .catch(()=>{ throw new Error(`Could not load/decode ${asset}.`); });
        } catch (error) {
            image.onload = ()=>{
                resolve(image);
            };
            image.src = asset;
        }
    });
};

export default {
    loadAsset,
    loadAssets
}
