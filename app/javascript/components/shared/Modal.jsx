import React, { useEffect, useRef } from "react"
import { useHotkeys } from "react-hotkeys-hook"

const Modal = props => {
	useEffect(() => {
		document.body.classList.add("modal-open")
		return () => document.body.classList.remove("modal-open")
	}, [])

	const modalWrapperRef = useRef(null)

	useHotkeys("esc", props.onClose, { filter: () => true })

	return (
		<div className="modal-mask modal">
			<div
				className="modal-wrapper"
				ref={modalWrapperRef}
				onClick={e => modalWrapperRef.current === e.target && props.onClose()}
			>
				<div className="modal-container">
					<div className="modal-header">
						<h3>{props.title}</h3>

						<a className="close" onClick={props.onClose}>
							<i className="fa fa-times"></i>
						</a>
					</div>

					<div className="modal-body">{props.children}</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
