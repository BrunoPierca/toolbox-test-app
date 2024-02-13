import { store } from '../store/store';
import { loadFileList, loadAllFiles, setActiveFile, setStatus, setError } from '../store/files/filesSlice';
import { singleFile } from './variables';


describe('Redux Store and Slice Tests', () => {
  // Test the initial state of the store
  it('should have correct initial state', () => {
    const initialState = store.getState();
    expect(initialState.files).toEqual({
      status: 'loading',
      fileList: null,
      files: null,
      activeFile: null,
      errorMessage: null
    });
  });

  // Test the loadFileList reducer
  it('should handle loadFileList action', () => {
    const fileList = ['file1.csv', 'file2.csv'];
    store.dispatch(loadFileList({ fileList }));

    const newState = store.getState().files;
    expect(newState.fileList).toEqual(fileList);
    expect(newState.errorMessage).toBeNull();
  });

  // Test the loadAllFiles reducer
  it('should handle loadAllFiles action', () => {
    const files = [singleFile, singleFile];
    store.dispatch(loadAllFiles({ files }));

    const newState = store.getState().files;
    expect(newState.status).toEqual('ready');
    expect(newState.files).toEqual(files);
    expect(newState.errorMessage).toBeNull();
  });

  // Test the setActiveFile reducer
  it('should handle setActiveFile action', () => {
    const activeFile = 'file1';
    store.dispatch(setActiveFile({ activeFile }));

    const newState = store.getState().files;
    expect(newState.status).toEqual('ready');
    expect(newState.activeFile).toEqual(activeFile);
  });

  // Test the setStatus reducer
  it('should handle setStatus action', () => {
    const status = 'ready';
    store.dispatch(setStatus({ status }));

    const newState = store.getState().files;
    expect(newState.status).toEqual(status);
  });

  // Test the setError reducer
  it('should handle setError action', () => {
    const errorData = {
      status: 'error',
      errorMessage: 'An error occurred'
    };
    store.dispatch(setError(errorData));

    const newState = store.getState().files;
    expect(newState.status).toEqual(errorData.status);
    expect(newState.errorMessage).toEqual(errorData.errorMessage);
  });
});