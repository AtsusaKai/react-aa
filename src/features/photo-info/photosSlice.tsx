import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPhotos } from "../../api/client";
import { RootState } from "../../app/store";
import { ModelDefaults } from "../../factory";
import PhotoModel from "../../photo";

export interface PhotosState {
    data: PhotoModel[];
    status: 'idle' | 'pending' | 'failed';
    error: string;
    selectedId: string;
    selectedPhoto: PhotoModel | null;
    hasSelected: boolean;
}

const initialState: PhotosState = {
    data: [],
    status: 'idle',
    error: '',
    selectedId: '',
    selectedPhoto: ModelDefaults.photo,
    hasSelected: false
};

export const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        setSelectedId: (state, id: PayloadAction<string>) => {
            state.selectedId = id.payload;
            state.hasSelected = true;
        },

        selectedPhoto: (state, photo: PayloadAction<PhotoModel>) => {
            state.selectedId = photo.payload.id;
            state.selectedPhoto = photo.payload;
            state.hasSelected = true;
        },

        unselectPhoto: (state) => {
            state.selectedId = '';
            state.selectedPhoto = null;
            state.hasSelected = false;
        },

        deletePhoto: (state, id: PayloadAction<string>) => {

            Object.keys(state.data).forEach((item: any) => {
                if (state.data[item] && state.data[item].id === id.payload) {
                    let filtered = state.data.filter((photo: any) => photo.id !== id.payload);
                    state.data = filtered;
                    state.selectedId = '';
                }
            });

        },

        toggleFavorite: (state, id: PayloadAction<string>) => {
            
            Object.keys(state.data).forEach((item: any) => {
                if (state.data[item].id === id.payload) {
                    state.data[item].favorited = !state.data[item].favorited;
                }
            });
        }
    },
    extraReducers: (builder) => {

        builder.addCase(getPhotos.pending, (state, action) => {
            if (state.status === 'idle') {
                state.status = 'pending';
            }
        });

        builder.addCase(getPhotos.fulfilled, (state, action) => {
            if (state.status === 'pending') {
                state.data = action.payload;
                state.status = 'idle';
            }
        });

        builder.addCase(getPhotos.rejected, (state, action) => {
            if (state.status === 'pending') {
                state.status = 'failed';
                state.error = 'Error occured';
            }
        });
    }
});

export const { setSelectedId, selectedPhoto, unselectPhoto, deletePhoto, toggleFavorite } = photosSlice.actions;
export const selectedPhotoId = (state: RootState) => state.photos.selectedId;
export const hasSelection = (state: RootState) => state.photos.hasSelected;
export const photosCache = (state: RootState) => state.photos.data;

export default photosSlice.reducer;