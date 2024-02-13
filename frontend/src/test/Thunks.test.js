import { loadFileList, loadAllFiles, setActiveFile } from '../store/files/filesSlice';
import { axiosAPIInstance, getAllFiles, getFile, getFileList } from '../store/files/thunks';


describe('Thunks tests', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    const getAPIResults = async () => {
        const { data: list } = await axiosAPIInstance.get('/list')
        const { data: filesData } = await axiosAPIInstance.get('/data')
        const { data: file } = await axiosAPIInstance.get(`/data?fileName=${filesData[0].file}`);
        return {
            list, filesData, file
        }
    }

    test('getFileList should fetch all files available in external API', async () => {
        const { list } = await getAPIResults()
        await getFileList()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith(loadFileList({ fileList: list.files }));
    })


    test('LoadAllFiles should fetch all files from API', async () => {

        const { filesData } = await getAPIResults()
        await getAllFiles()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(loadAllFiles({ files: filesData }));

    });

    test('LoadFile should fetch one file from API', async () => {

        const { filesData, file } = await getAPIResults()
        await getFile(filesData[0].file)(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(setActiveFile({ activeFile: file }));

    });

});