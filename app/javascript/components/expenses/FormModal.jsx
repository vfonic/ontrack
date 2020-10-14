import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../shared/Modal'
import DatePicker from '../shared/DatePicker'
import CurrencyInput from '../shared/CurrencyInput'
import FieldErrors from '../shared/FieldErrors'
import { Expenses } from '../../api/main'
import { Alerts } from '../../helpers/main'

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    let categoryId = this.props.categoryId;
    if (!categoryId && this.props.categories.length) {
      categoryId = this.props.categories[0].id
    }

    this.state = {
      description: '',
      category_id: categoryId,
      amount: 0,
      currency: 'HRK',
      paidAt: new Date(),
      errors: {},
      submitted: false,
    };
  }

  handleDescriptionChange = (e) => this.setState({ description: e.target.value });
  handleAmountChange = (num) => this.setState({ amount: num });
  handleCurrencyChange = (e) => this.setState({ currency: e.target.value });
  handlePaidAtChange = (val) => this.setState({ paidAt: val });
  handleCategoryChange = (e) => this.setState({ category_id: e.target.value });
  handleErrors = (key, errs) => this.setState({ errors: Object.assign(this.state.errors, { [key]: errs }) });

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ submitted: true });
    if (Object.values(this.state.errors).flat().length) {
      return;
    }

    Expenses.create({
      description: this.state.description.trim(),
      category_id: this.state.category_id,
      amount: this.state.amount,
      currency: this.state.currency,
      paid_at: this.state.paidAt,
    }).then(
      (resp) => this.props.onSave(resp),
      (error) => Alerts.genericError(),
    )
  }

  renderForm() {
    if (!this.props.categories.length) {
      return (
        <div className="text-center">
          <h4>Add a category before adding an expense!</h4>
        </div>
      )
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="input-group five columns">
            <label className="required">Date</label>
            <DatePicker onChange={this.handlePaidAtChange} />
            <FieldErrors label="Date" val={this.state.paidAt} validations={{ required: true }}
                         show={this.state.submitted} handleErrors={this.handleErrors} />
          </div>

          <div className="input-group twelve columns">
            <label className="required">Amount</label>
            <CurrencyInput focus initialValue={this.state.amount} currency={this.state.currency}
                           onChange={this.handleAmountChange} onCurrencyChange={this.handleCurrencyChange} />
            <FieldErrors label="Amount" val={this.state.amount} validations={{ required: true }}
                         show={this.state.submitted} handleErrors={this.handleErrors} />
          </div>

          <div className="input-group seven columns">
            <label className="required">Category</label>
            <select value={this.state.category_id} onChange={this.handleCategoryChange}>
              {this.props.categories.map((c) => {
                return <option key={c.id} value={c.id}>{c.name}</option>
              })}
            </select>
          </div>

          <div className="input-group twelve columns">
            <label>Description</label>
            <input type="text" value={this.state.description} onChange={this.handleDescriptionChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-dark">Save</button>
        </div>
      </form>
    );
  }

  render() {
    return (
      <Modal title="Create Expense" onClose={this.props.onClose}>
        {this.renderForm()}
      </Modal>
    );
  }
}

FormModal.defaultProps = {
  categories: [],
  categoryId: 0,
}

FormModal.propTypes = {
  categories: PropTypes.array,
  categoryId: PropTypes.number,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
}

export default FormModal;
