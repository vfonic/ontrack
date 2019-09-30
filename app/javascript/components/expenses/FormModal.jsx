import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../shared/Modal'
import { Expenses } from '../../api/main'

class FormModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      category_id: this.props.categories.length ? this.props.categories[0].id : '',
      amount: 0,
      paidAt: '',
    };
  }

  handleDescriptionChange = (e) => { this.setState({ description: e.target.value }); }
  handleAmountChange = (e) => { this.setState({ amount: e.target.value.trim() }); }
  handlePaidAtChange = (e) => { this.setState({ paidAt: e.target.value }); }
  handleCategoryChange = (e) => { this.setState({ category_id: e.target.value }); }
  handleSubmit = (e) => {
    e.preventDefault();
    Expenses.create({ description: this.state.description.trim(), category_id: this.state.category_id, amount: this.state.amount, paidAt: this.state.paidAt }).then(
      (resp) => { this.props.onSave(resp) },
      (error) => { console.log(error); },
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
        <div className="input-group">
          <label>Description</label>
          <input type="text" value={this.state.description} onChange={this.handleDescriptionChange}></input>
        </div>

        <div className="input-group">
          <label>Category</label>
          <select value={this.state.category_id} onChange={this.handleCategoryChange}>
            {this.props.categories.map((c) => { return <option key={c.id} value={c.id}>{c.name}</option> })}
          </select>
        </div>

        <div className="input-group">
          <label>Amount</label>
          <input type="text" value={this.state.amount} onChange={this.handleAmountChange}></input>
        </div>

        <div className="input-group">
          <label>Paid At</label>
          <input type="text" value={this.state.paidAt} onChange={this.handlePaidAtChange}></input>
        </div>

        <div className="form-actions">
          <button type="button" className="btn" onClick={this.props.onClose}>Cancel</button>
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
}

FormModal.propTypes = {
  categories: PropTypes.array,
  onClose: PropTypes.func,
  onSave: PropTypes.func,
}

export default FormModal;