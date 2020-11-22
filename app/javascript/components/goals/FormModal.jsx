import React, { useState } from "react"
import Modal from "../shared/Modal"
import CurrencyInput from "../shared/CurrencyInput"
import { Goals } from "../../api/main"
import { Alerts } from "../../helpers/main"

const FormModal = ({ onClose, onSave, goals = { monthly: 0 } }) => {
	const [goal, setGoal] = useState(goals.monthly)

	const handleGoalChange = num => setGoal(num)

	const handleSubmit = e => {
		e.preventDefault()

		Goals.update({ monthly_goal: goal }).then(
			resp => onSave(resp),
			() => Alerts.genericError()
		)
	}

	return (
		<Modal title="Edit Goal" onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="six columns input-group">
						<label>Total Monthly Goal</label>
						<CurrencyInput initialValue={goal} onChange={handleGoalChange} />
					</div>
				</div>

				<div className="form-actions">
					<button type="submit" className="btn btn-dark">
						Save
					</button>
				</div>
			</form>
		</Modal>
	)
}

export default FormModal
