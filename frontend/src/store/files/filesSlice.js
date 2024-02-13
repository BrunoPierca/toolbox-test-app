import { createSlice } from "@reduxjs/toolkit";

export const filesSlice = createSlice({
    name: "files",

    initialState: {
        status: "loading",
        fileList: null,
        files: null,
        activeFile: null,
        errorMessage: null
    },

    reducers: {
        loadFileList: (state, { payload }) => {
            state.fileList = payload.fileList;
            state.errorMessage = null;

        },
        loadAllFiles: (state, { payload }) => {
            state.status = "ready";
            state.files = payload.files;
            state.errorMessage = null;
        },
        setActiveFile: (state, { payload }) => {
            state.status = "ready";
            state.activeFile = payload.activeFile;
        },
        setStatus: (state, { payload }) => {
            state.status = payload.status;
        },
        setError: (state, {payload}) => {
            state.status = payload.status
            state.errorMessage = payload.errorMessage
        }
    },
});

// Action creators are generated for each case reducer function
export const { loadFileList, loadAllFiles, setActiveFile, setStatus, setError } = filesSlice.actions;