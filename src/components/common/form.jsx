import { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validateProperty = ({ id, value }) => {
    const obj = { [id]: value };
    const schema = { [id]: this.schema[id] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  validate = () => {
    const errors = {};
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMsg = this.validateProperty(input);
    if (errorMsg) errors[input.id] = errorMsg;
    else delete errors[input.id];
    const data = { ...this.state.data };
    data[input.id] = input.value;
    this.setState({ data, errors });
  };
  handleFormSubmission = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    // server call
    this.doSubmit();
  };
  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary m-2">
        {label}
      </button>
    );
  };
  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        value={data[name]}
        name={name}
        label={label}
        onChange={this.handleChange}
        type={type}
        error={errors[name]}
      />
    );
  };

  renderDropDown = (name, label, options) => {
    const { data, errors } = this.state;
    const selectedOption = data.genreId;
    const error = errors[name];
    return (
      <div className="form-group m-2">
        <label>{label}</label>
        <select
          value={selectedOption}
          id={name}
          className="form-control form-select"
          onChange={this.handleChange}
        >
          {options.map((option) => (
            <option value={option._id} key={option._id}>
              {option.name}
            </option>
          ))}
        </select>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    );
  };
}

export default Form;
