import React from "react"
import PropTypes from "prop-types"
import moment from "moment"
import { Numerics } from "../../helpers/main"
import Progress from "../shared/Progress"
import GoalFormModal from "../goals/FormModal"

class Overview extends React.Component {
	constructor(props) {
		super(props)
		this.state = { showGoalModal: false }
	}

	openGoal = () => this.setState({ showGoalModal: true })
	closeGoal = () => this.setState({ showGoalModal: false })
	onGoalSave = () => {
		this.closeGoal()
		this.props.onChange()
	}

	get totalSpend() {
		return this.props.categoriesWithExpensesAndSpend.reduce((sum, cat) => sum + cat.spend, 0)
	}

	get monthlyGoal() {
		return this.props.monthlyGoal
	}

	get remainingSpend() {
		return this.monthlyGoal - this.totalSpend
	}

	percentages() {
		const outOf = Math.max(this.props.monthlyGoal, this.totalSpend)
		return this.props.categoriesWithExpensesAndSpend.map(category => {
			return { percentage: (category.spend / outOf) * 100, color: category.color }
		})
	}

	goalComparisonDisplay() {
		if (!this.props.monthlyGoal) {
			return (
				<a className="text-small" onClick={this.openGoal}>
					Set a monthly total goal
				</a>
			)
		}

		const diffDisplay =
			this.remainingSpend >= 0 ? (
				<b className="text-muted">{Numerics.centsToDollars(this.remainingSpend)} remaining</b>
			) : (
				<b className="text-warning">{Numerics.centsToDollars(Math.abs(this.remainingSpend))} over</b>
			)

		return (
			<div className="flex">
				{diffDisplay}{" "}
				<img className="hover-pointer icon-default dim-til-hover" src={window.iconEdit} onClick={this.openGoal} />
			</div>
		)
	}

	renderRemainingAverageSpending() {
		if (!this.props.monthlyGoal) {
			return
		}

		const daysTillTheEndOfTheMonth = moment().endOf("month").diff(moment().add(-1, "day"), "days")

		const dailyRemainingSpending = Numerics.centsToDollars(this.remainingSpend / daysTillTheEndOfTheMonth)

		return <div style={{ marginTop: "10px" }}>{dailyRemainingSpending} remaining on average per day</div>
	}

	render() {
		return (
			<div>
				{this.state.showGoalModal && (
					<GoalFormModal
						onClose={this.closeGoal}
						onSave={this.onGoalSave}
						goals={{ monthly: this.props.monthlyGoal }}
					/>
				)}
				<div className="mb-10">{moment().format("MMMM")}</div>

				<div className="flex row-flex flex-space-between flex-baseline mb-10">
					<div>
						<h1>{Numerics.centsToDollars(this.totalSpend)}</h1>
					</div>
					<div>{this.goalComparisonDisplay()}</div>
				</div>

				<Progress data={this.percentages()} />

				{this.renderRemainingAverageSpending()}
			</div>
		)
	}
}

Overview.defaultProps = {
	categoriesWithExpensesAndSpend: [],
	monthlyGoal: 0,
}

Overview.propTypes = {
	categoriesWithExpensesAndSpend: PropTypes.array,
	monthlyGoal: PropTypes.number,
	onChange: PropTypes.func,
}

export default Overview
