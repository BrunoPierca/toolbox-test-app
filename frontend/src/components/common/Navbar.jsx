import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import BootstrapNavbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getFileList, getFile, setActiveFile, setStatus } from '../../store/files';

export const Navbar = () => {
    const { activeFile, fileList, status } = useSelector((state) => state.files)
    const dispatch = useDispatch()

    const handleSelect = (fileName) => {
        dispatch(setStatus({ status: "loading" }))
        dispatch(getFile(fileName))
    };
    useEffect(() => {
        dispatch(getFileList())
    }, [dispatch])
    return <BootstrapNavbar className="navbar">
        <Container className='d-flex flex-column flex-sm-row gap-1'>
            <BootstrapNavbar.Brand className='text-white fw-bold'>React Test App</BootstrapNavbar.Brand>
            <Nav variant="pills" onSelect={handleSelect}>
                <Nav.Item onClick={() => dispatch(setActiveFile({ activeFile: null }))} className={`${!activeFile ? 'border-bottom border-info' : ''} me-2`}>
                    <Nav.Link className='text-white fw-bold'>
                        View all files
                    </Nav.Link>
                </Nav.Item>

                {
                    fileList && <NavDropdown
                        title={activeFile ? activeFile.file : "Choose a file"}
                        disabled={status === "loading"}
                        className={`navDropdown ${status === "loading" ? 'disabledBtn' : ""} ${activeFile ? 'border-bottom border-info' : ''} text-decoration-none fw-bold`}>
                        {
                            fileList.map((file, i) => {
                                return <NavDropdown.Item active={activeFile && file === activeFile.file} key={file + i} eventKey={file}>{file}</NavDropdown.Item>
                            })
                        }
                    </NavDropdown>
                }
            </Nav>
        </Container>
    </BootstrapNavbar>
}
