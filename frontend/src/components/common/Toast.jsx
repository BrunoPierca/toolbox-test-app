import { useEffect, useState } from 'react'
import BootstrapToast from 'react-bootstrap/Toast'
import { useDispatch, useSelector } from 'react-redux'
import { setError } from '../../store/files'


export const Toast = () => {
    const [show, setShow] = useState(false)
    const { errorMessage } = useSelector((state) => state.files)
    const dispatch = useDispatch()

    const handleClose = () => {
        setShow(false)
        dispatch(setError({
            errorMessage: null
        }))
    }

    useEffect(() => {
        if (errorMessage) setShow(true)
    }, [errorMessage])

    return (
        <BootstrapToast onClose={handleClose} show={show} delay={2500} autohide bg="dark">
            <BootstrapToast.Header>
                <strong className="me-auto">Error</strong>
            </BootstrapToast.Header>
            <BootstrapToast.Body className='text-white'>{errorMessage}</BootstrapToast.Body>
        </BootstrapToast>
    )
}
