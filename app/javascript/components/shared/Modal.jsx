import React, { useEffect } from "react"

const Modal = props => {
	useEffect(() => {
		document.body.classList.add("modal-open")
		return () => document.body.classList.remove("modal-open")
	}, [])

	return (
		<div className="modal-mask modal">
			<div className="modal-wrapper">
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
