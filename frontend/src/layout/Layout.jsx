import Container from 'react-bootstrap/Container';
import { Navbar } from '../components/common/Navbar';
import { Toast } from '../components/common/Toast';

export const Layout = ({ children }) => {
    return (
        <Container fluid className='px-0 min-vh-100'>
            <Navbar />
            <main>
                <Container className='px-2 px-md-5 py-4 h-100'>
                    {children}
                    <Toast />
                </Container>
            </main>
        </Container>
    )
}
