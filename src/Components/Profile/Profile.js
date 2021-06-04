import React from 'react'
import "./Profile.css";
import axios from "axios";
import backend from "../../env";
import './Profile.css'

class Profile extends React.Component{

    constructor(props) {
        super(props);
        this.handleChangeDegree = this.handleChangeDegree.bind(this);
        this.handleChangeCourse = this.handleChangeCourse.bind(this);
        this.handleChangeHandle = this.handleChangeHandle.bind(this);
        this.handleChangeContact = this.handleChangeContact.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        const data = [{
            FirstName: '',
            LastName:'',
            degree: '',
            course:'',
            Handle:'',
            Contact:0
        }]
        this.state ={
            data: data,
        }

        axios.get(backend+"connect/profile?format=json")
            .then(res => {
                const data = res.data;
                this.setState({data});
            })
    }

    shouldComponentUpdate () {
        return true;
    }


    handleChangeDegree(e) {
        this.setState({ degree: e.target.value })
    }

    handleChangeCourse(e) {
        this.setState({ course: e.target.value })
    }

    handleChangeHandle(e) {
        this.setState({ Handle: e.target.value })
    }

    handleChangeContact(e) {
        this.setState({ Contact: e.target.value })
    }

    handleSubmit(e) {

        let payload = {
            "First_Name":this.state.data[0]["First_Name"],
            "Last_Name":this.state.data[0]["Last_Name"],
            "Gender":"",
            "Degree":this.state.degree,
            "Course":this.state.course,
            "Handle":"",
            "IsTeacher":false}

        axios.post(backend+"connect/profile/", payload)
            .then(() => {
            alert("Profile update successful")
          })

        e.preventDefault();

    }



  render() {
    return (
        <div className="Custom-form-dialog">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group row">
                    <label className="col-auto col-form-label">
                        First Name
                    </label>

                <div>
                    <input
                        className="form-control col-auto"
                        disabled
                        placeholder={this.state.data[0]["First_Name"]}
                        type='text'
                        value={this.state.data[0]["First_Name"]}
                    />
                </div>
            </div>

                <br />

                <div className="form-group row">
                    <label className="col-auto col-form-label">
                        Last Name
                    </label>

                <div className="row-auto">
                    <input
                        className="form-control col-auto"
                        disabled
                        placeholder={this.state.data[0]["Last_Name"]}
                        type='text'
                        value={this.state.data[0]["Last_Name"]}
                    />



                    </div>
                </div>

                <br />

                <div className="form-group row">
                    <label className="col-auto col-form-label">
                        Email
                    </label>

                <div>
                    <input
                        className="form-control col-auto"
                        disabled
                        type='text'
                        value={this.state.data[0]["email"]}
                    />
                </div>
            </div>

                <br />

                <div className="form-group row">
                    <label className="col-auto col-form-label">
                        Handle
                    </label>

                    <div>
                        <input
                            className="form-control col-auto"
                            onChange={this.handleChangeHandle}
                            placeholder={this.state.Handle}
                            type='text'
                            value={this.state.Handle}
                        />
                    </div>
                </div>

                <br />

                <div className="form-group row">
                    <label className="col-auto col-form-label">
                        Contact
                    </label>

                    <div>
                        <input
                            className="form-control col-auto"
                            onChange={this.handleChangeContact}
                            type='number'
                            value={this.state.Contact}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-auto col-form-label">
                        Degree:
                        <select
                            className="form-control col-auto form-select"
                            onChange={this.handleChangeDegree}
                            value={this.state.degree}
                        >
                            <option
                                selected
                                value=""
                            >
                                ---Select Degree---
                            </option>

                            <option value="M" >
                                M-Tech
                            </option>

                            <option value="B">
                                B-Tech
                            </option>
                        </select>
                    </label>

                    <label className="col-auto col-form-label">
                        Course:
                        <select
                            className="form-control col-auto form-select"
                            onChange={this.handleChangeCourse}
                            value={this.state.course}
                        >
                            <option
                                selected
                                value=""
                            >
                                ---Select Course---
                            </option>

                            <option value="CSAI">
                                CSAI
                            </option>

                            <option value="CSE">
                                CSE
                            </option>

                            <option value="CSB">
                                CSB
                            </option>

                            <option value="CSD">
                                CSD
                            </option>

                            <option value="CSS">
                                CSS
                            </option>

                            <option value="CSAM">
                                CSAM
                            </option>

                            <option value="ECE">
                                ECE
                            </option>

                        </select>
                    </label>

                </div>

                <br />

                <br />

                <button
                    className="btn btn-primary mb-2 col-2"
                    onChange={this.handleChange}
                    type="submit"
                    value="Submit"
                >
                    Submit
                </button>

                <button
                    className="btn btn-primary mb-2 col-2"
                    type="button"
                >
                    Help
                </button>

            </form>
        </div>
    );
  }
}

export default Profile;
