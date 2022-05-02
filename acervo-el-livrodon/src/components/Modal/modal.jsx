import { Overlay } from "../Overlay/Overlay";
import "./modal.css"

export function Modal({children, closeModal}) {
    const handleClick = (e, canClose) => {
        e.stopPropagation();

        if(canClose) closeModal();
    };

    return (
        <Overlay overlayClick={closeModal}>
            <div className="Modal" onClick={handleClick}>
                <span className="Modal__close" onClick={(e) => handleClick(e, true)}>+</span>
                <div className="Modal__body">{children}</div>
            </div>
        </Overlay>
    )
}