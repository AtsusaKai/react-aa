import PhotoModel from "./photo"

const photo: PhotoModel = {
    id: "",
    url: "",
    filename: "",
    description: "",
    uploadedBy: "",
    createdAt: "",
    updatedAt: "",
    dimensions: {
        width: 0,
        height: 0
    },
    resolution: {
        width: 0,
        height: 0
    },
    sizeInBytes: 0,
    sharedWith: [],
    favorited: false
};

export const ModelDefaults = { photo }