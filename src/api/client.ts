import { createAsyncThunk } from "@reduxjs/toolkit";

export const getPhotos = createAsyncThunk('photos/getPhotos', async () => {

    const response = await fetch('https://agencyanalytics-api.vercel.app/images.json')
    .then((response: Response) => {
        return response.json();
    })
    .then((data: any) => {
        return data;
    });

    return response;
});