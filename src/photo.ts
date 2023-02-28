
export interface Size {
    width: number,
    height: number
}

export default interface PhotoModel {
    id: string;
    url: string;
    filename: string;
    description: string;
    uploadedBy: string;
    createdAt: string;
    updatedAt: string;
    dimensions: Size;
    resolution: Size;
    sizeInBytes: number;
    sharedWith: any[];
    favorited: boolean
}