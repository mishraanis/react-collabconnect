
import React from "react";
import "./Step1.css";
import PropTypes from "prop-types";
import Card from 'react-bootstrap/Card';
import {isMobile} from "react-device-detect";
import SvgIcon from "../../../../common/SvgIcon";

class Step1 extends React.Component {
    static propTypes = {
            Contact:PropTypes.string.isRequired,
            Github:PropTypes.string.isRequired,
            Linkedin:PropTypes.string.isRequired,
            currentStep:PropTypes.number.isRequired,
            handle:PropTypes.string.isRequired,
            handleChangeContact:PropTypes.func.isRequired,
            handleChangeGithub:PropTypes.func.isRequired,
            handleChangeHandle:PropTypes.func.isRequired,
            handleChangeLinkedin:PropTypes.func.isRequired,
            handleNext: PropTypes.func.isRequired
    };

    shouldComponentUpdate () {
        return true;
    }

    nextButton(){
        return (
            <button 
                className="btn btn-primary col-5"
                onClick={this.props.handleNext}
                type="button"
                value="Next"
            >
                Next
            </button>
        )
    }
    render (){
        if (this.props.currentStep !== 1) {
                        return null
                    }
        else
            return (
                <section className="container-fluid lowwl mt-0">
                    <div className="row" >
                        <div className="col container" >
                            <Card className="card rounded-4 profilecard container border-primary">

                                <Card.Header className="card-hf-color">
                                    <h2>
                                        Hey ! We see you are eager to help others !
                                    </h2>

                                    <br />
                                    In order to help others Please register with us
                                </Card.Header>

                                <Card.Body className="pt-0 mt-0">
                                    <form
                                        className="card-body"
                                        onSubmit={this.props.handleNext}
                                    >
                                        <div className="form-group">
                                            <div className="col-auto form-inline col-form-label">

                                                <label>
                                                    Telegram Username
                                                </label>

                                            </div>

                                            <div>
                                                <input
                                                    className="form-control col-auto"
                                                    onChange={this.props.handleChangeHandle}
                                                    required
                                                    type='text'
                                                    value={this.props.handle}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="col-auto form-inline col-form-label">

                                                <label>
                                                    Contact Number
                                                </label>


                                            </div>

                                            <div className="row-auto">
                                                <input
                                                    className="form-control col-auto"
                                                    onChange={this.props.handleChangeContact}
                                                    placeholder="Mobile Number"
                                                    required
                                                    type='number'
                                                    value={this.props.Contact}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-auto form-inline col-form-label">
                                                Github Profile
                                            </label>

                                            <div>
                                                <input
                                                    className="form-control col-auto"
                                                    onChange={this.props.handleChangeGithub}
                                                    placeholder="Github account"
                                                    required
                                                    type='text'
                                                    value={this.props.Github}
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="col-auto form-inline col-form-label">
                                                LinkedIn Profile
                                            </label>

                                            <div>
                                                <input
                                                    className="form-control col-auto"
                                                    onChange={this.props.handleChangeLinkedin}
                                                    placeholder="paste your LinkedIn URL"
                                                    required
                                                    type='text'
                                                    value={this.props.Linkedin}
                                                />
                                            </div>
                                        </div>

                                        <button 
                                            className="btn btn-primary col-5"
                                            type="submit"
                                            value="submit"
                                        >
                                            Next
                                        </button>                                    
                                    </form>
                                </Card.Body>

                            </Card>
                        </div>

                        {isMobile?null:(
                            <div className="col container">
                                <div className=" float-right mr-5 mt-5">
                                    <SvgIcon
                                        className="profile-image mt-5"
                                        height="100%"
                                        src="product-launch.svg"
                                        width="120%"
                                    />

                                    <h4 className="">
                                        Help in building a stronger community for the IIITD and let the brainstroming begin
                                    </h4>
                                </div>
                            </div>)}
                    </div>
                </section>
            );
  }
}

export default Step1;
