import ReactDOM from 'react-dom';

function Modal({ children }) {
    return ReactDOM.createPortal(
        <div className="modal">
            {children}
        </div>,
        document.body
    )
}
export default Modal;