//Populate types
export const TYPE_UPDATE_CHANNELS = "TYPE_UPDATE_CHANNELS";

export function updateResources(result, populateKey, type) {
    return {
        type: type,
        payload: result,
        populateKey: populateKey
    };
}

export function updateResourcesWithIds(result, populateKey, type, channelId) {
    return {
        type: type,
        payload: result,
        populateKey: populateKey,
        channelId: channelId
    };
}