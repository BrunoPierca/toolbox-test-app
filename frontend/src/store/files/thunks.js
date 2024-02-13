import { loadFileList, loadAllFiles, setActiveFile, setError } from "./";
import axios from "axios";


const axiosAPIInstance = axios.create({
    baseURL: "http://localhost:5000/files",
})


export const getFileList = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosAPIInstance.get("/list");
            dispatch(loadFileList({ fileList: data.files }));
        } catch (error) {
            dispatch(setError({ status: "error", errorMessage: "Error retrieving file list" }));
        }
    };
};


export const getAllFiles = () => {
    return async (dispatch) => {
        try {
            const { data: files } = await axiosAPIInstance.get("/data");
            dispatch(loadAllFiles({ files }));

        } catch (error) {
            dispatch(setError({ status: "error", errorMessage: "Error retrieving files" }));
        }
    };
};

export const getFile = (fileName) => {
    return async (dispatch) => {
        try {
            const { data: activeFile } = await axiosAPIInstance.get(`/data?fileName=${fileName}`);
            dispatch(setActiveFile({ activeFile }));
        } catch (error) {
            if (error.response.status === 404) return dispatch(setError({ status: "error", errorMessage: `File: "${fileName}" not found` }));

            if (error.response.status === 500) return dispatch(setError({ status: "error", errorMessage: "External API error" }));

            return dispatch(setError({ status: "error", errorMessage: `Error retrieving: ${fileName}` }));
        }
    };
}

