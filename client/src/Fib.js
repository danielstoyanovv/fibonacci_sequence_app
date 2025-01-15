import React, {Component} from "react";
import axios from 'axios';

class Fib extends Component {
    state = {
        number: '',
        values: {},
        errorMessage: ""
    };
    componentDidMount() {
        this.fetchValues();
    }

    async fetchValues() {
        const values = await axios.get("http://localhost:4000/api/v1/values/current");
        this.setState({ values: values.data.data });
    }

    renderValues() {
        const entries = [];

        for (let key in this.state.values) {
            entries.push(
                <div key={key}>
                    For index {key} I calculated {this.state.values[key]}
                </div>
            );
        }

        return entries;
    }

    handleChange = this.handleChange.bind(this);
    handleSubmit = this.handleSubmit.bind(this);
    handleChange(event) {
        const { name, value } = event.target;
        this.setState({
            [name]: value, // Update the corresponding field in state
        });
    }

    async handleSubmit(event) {
            event.preventDefault();
            const errorStatuses = [
                422,
                500
            ]
            const response = await fetch("http://localhost:4000/api/v1/values", {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"

                }
            })
            const json = response.json()
            if (response.ok) {
                // Optionally, clear the form
                this.setState({
                    number: "",
                });
                this.setState({
                    errorMessage: "",
                });
            }

            if (errorStatuses.includes(response.status)) {
                json.then(result => {
                    this.setState({errorMessage: result.message})
                    console.log(result.message)
                }).catch(errors => {
                    console.log(errors)
                })
            }

        }
        render()
        {
            return (
                <div>
                    <div className="error-messages">
                        <i>{this.state.errorMessage}</i>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="name">Number:</label>
                            <input
                                type="number"
                                id="number"
                                name="number"
                                value={this.state.number}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Submit</button>
                    </form>

                    <h3>Calculated Values:</h3>
                    {this.renderValues()}
                </div>
            )
        }
}

export default Fib