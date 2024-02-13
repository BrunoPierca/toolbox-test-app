import { FileTable } from './components/files/FileTable'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFiles } from './store/files';
import { Loader } from './components/common/Loader';
import { Error } from './components/common/Error';


function App() {
  const dispatch = useDispatch()
  const { status, activeFile, files } = useSelector((state) => state.files)

  useEffect(() => {
    dispatch(getAllFiles())
  }, [dispatch])
  if (status === "loading") return <Loader />
  if ((status === "error" || status === undefined) && (!files && !activeFile)) return <Error />
  return (
    <>
      {activeFile ?
        <FileTable data={[activeFile]} />
        :
        <FileTable data={files} />
      }
    </>
  )
}

export default App;
