import React, {Component} from 'react';
import Clublist from 'components/ClubList/ClubList.js';
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import {SvgIcon} from "common/SvgIcon";
import ClubAdminModal from "components/ClubAdmin/modal";
import axios from "../../utils/axios";
import {withRouter} from "next/router";
import PropTypes from "prop-types";
import {ListGroup} from "react-bootstrap";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import Button from "react-bootstrap/Button";
import {getAuth, signInWithCustomToken} from 'firebase/auth';
import RCarousel from "react-multi-carousel";
import ClubCard from "components/ClubList/ClubCard";

class ClubAdminPage extends Component {

static propTypes = {
        clubName: PropTypes.string.isRequired,
        router: PropTypes.shape(
            {
                isReady: PropTypes.bool.isRequired,
                query: PropTypes.shape({
                    clubName: PropTypes.string.isRequired
                }),

            }
        ).isRequired
    }

    constructor(props) {
        super(props)
        this.image1Ref = React.createRef()
        this.image2Ref = React.createRef()
        this.image3Ref = React.createRef()
        this.state = {
            token:null,
            image1:null,
            image2:null,
            image3:null,
            setImage:null,
            basicInformation: null,
            competitions:null,
            announcements: null,
            isLoading: true,
            basicInformationStatic:{
                logoLink: "http://tasveer.iiitd.edu.in/images/logo.png",
                joinDate:"26122020",
                clubBanners:["https://via.placeholder.com/1600X480","https://via.placeholder.com/1600X480","https://via.placeholder.com/1600X480"],
                eventList: [
                    {name: "Event1", logo: "https://via.placeholder.com/70X70"},
                    {name: "Event2", logo: "https://via.placeholder.com/70X70"},
                    {name: "Event3", logo: "https://via.placeholder.com/70X70"},
                    {name: "Event3", logo: "https://via.placeholder.com/70X70"},
                    {name: "Event4", logo: "https://via.placeholder.com/70X70"},
                    {name: "Event5", logo: "https://via.placeholder.com/70X70"},
                    {name: "Event6", logo: "https://via.placeholder.com/70X70"},
                    {name: "Event7", logo: "https://via.placeholder.com/70X70"},
                    {name: "Event8", logo: "https://via.placeholder.com/70X70"},
                    {name: "Event9", logo: "https://via.placeholder.com/70X70"},
                    {name: "Event10", logo: "https://via.placeholder.com/70X70"},
                    {name: "Event11", logo: "https://via.placeholder.com/70X70"},
                ],
            },

            }
    }

    componentDidMount() {
    const auth = getAuth();
    axios.get("/authenticate/get-firebase-token").then((res) => {
                        this.setState({token: res.data.firebaseToken})
    //         const auth = getAuth();
            signInWithCustomToken(auth, res.data.firebaseToken).then(() => console.log(9999999999999))
        const storage = getStorage();
        getDownloadURL(ref(storage, 'data/'+ "byld" + '/uneditable/logo.png'))
                    .then(url => console.log(url))

    })
        return true
    }

    shouldComponentUpdate(){
        return true
    }

    componentDidUpdate(){
        if (this.props.router.isReady){
            if (this.state.basicInformation === null)
                axios.get("club/club/"+ this.props.router.query.clubName +"/").then((res) => {
                    this.setState({basicInformation: res.data, isLoading: false});
            if (this.state.announcements === null)
                axios.get("club/clubannouncements/" + this.props.router.query.clubName + "/").
                    then((res) => {
                        this.setState({announcements : res.data})
                    });
            if (this.state.competitions === null)
                axios.get("club/clubcompetitions/" + this.props.router.query.clubName + "/").
                    then((res) => {
                        this.setState({competitions: res.data})
                    });
            });
            console.log(this.state)
        }
    }

    handleSubmitDescription(values) {
        const description = values[0]
        this.setState((prevState) => {
            return (
                {
                    ...prevState,
                    basicInformation: {
                        ...(prevState.basicInformation),
                        description: description
                    }
                }
                )
        })
        this.handleCloseModal()

        const payload = {
            description: this.state.basicInformation.description
        }
        axios.patch("club/club/"+ this.props.router.query.clubName +"/" ,payload)
            .then(() => this.setState(payload))
    }

    handleSubmitAnnouncements(values){
        axios.post("club/announcements/" + this.props.router.query.clubName,{
            // club: "Byld",
            content: values[0]
        }).then((ress) => {
                    this.setState((prevState) => {
                        return (
                            {
                                ...(prevState.announcements),
                                announcements:[...(prevState.announcements), {id:ress.data.id, content:ress.data.content}]
                            })
                    })
        });
        this.handleCloseModal()
    }

    handleSubmitPanel(values){
        this.setState((prevState) => {
            return (
                {
                    ...prevState,
                    basicInformation: {
                        ...(prevState.basicInformation),
                        facebook: values[0],
                        instagram: values[1],
                        linkedin: values[2],
                        website: values[3],
                        tagline: values[4]
                    }
                })
        })
        this.handleCloseModal()
    }

    handleUpload1(){
    this.image1Ref.current.click();
        const storage = getStorage();
        const storageRef = ref(storage, "/data/"+ this.props.router.query.clubName +"/editable/" +
            (new Date().getTime()));

        if(this.state.image1 == null)
            return;
          uploadBytes(storageRef, this.state.image1).then(() => {console.log('Uploaded a blob or file!');});
    }

    handleUpload2(){
    this.image2Ref.current.click()
        const storage = getStorage();
        const storageRef = ref(storage, "/data/"+ this.props.router.query.clubName +"/editable/" +
            (new Date().getTime()));

        if(this.state.image2 == null)
            return;
          uploadBytes(storageRef, this.state.image2).then(() => {console.log('Uploaded a blob or file!');});
    }

    handleUpload3(image){
        // this.image3Ref.current.click()
        this.setState({image3: image})
        console.log("sike bro1")
        const storage = getStorage();
        const storageRef = ref(storage, "/data/"+ this.props.router.query.clubName +"/editable/" +
            (new Date().getTime()));
        console.log("sike bro2")

        if(image == null)
            return;
        console.log("sike bro3")
        uploadBytes(storageRef, image).then(() => {console.log('Uploaded a blob or file!');})
             .catch(() => {console.log("error bro")});
    }

    handleCloseModal() {
        this.setState({
            currentModal: null,
        })
    }

    render(){
    const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: {max: 4000, min: 3000},
                items: 5
            },
            desktop: {
                breakpoint: {max: 3000, min: 1024},
                items: 3
            },
            tablet: {
                breakpoint: {max: 1024, min: 464},
                items: 2
            },
            mobile: {
                breakpoint: {max: 464, min: 0},
                items: 1
            }
        };

        if (this.state.isLoading || this.state.announcements === null || this.state.competitions === null){
            return "loading"; // LOADING SCREEN
        }
        console.log(this.state.basicInformation)
        console.log(this.state.competitions)
        console.log(this.state.announcements)
        return (
            <div className="row m-1">
                <div className="col-3 d-flex justify-content-around">
                    <div className="position-fixed">
                        <div className="row">
                            <Card
                                className="pt-2"
                                style={{ width: '18rem' }}
                            >

                                <button
                                    className="align-self-end btn btn-outline-warning col-2 material-icons"
                                    onClick={() => {
                                            this.setState({
                                                currentModal: "panel",
                                            });
                                        }}
                                    type="button"
                                >
                                    edit
                                </button>

                                <ClubAdminModal
                                    handleClose={this.handleCloseModal.bind(this)}
                                    handleSubmit={this.handleSubmitPanel.bind(this)}
                                    initialValues={[this.state.basicInformation.facebook,
                                    this.state.basicInformation.instagram,
                                    this.state.basicInformation.linkedin,
                                    this.state.basicInformation.website,
                                    this.state.basicInformation.tagline]}
                                    labels={['Facebook','Instagram','LinkedIn','Other website','Enter Your Clubs Catchphrase ']}
                                    show={this.state.currentModal === 'panel'}
                                />

                                <Card.Img
                                    src={this.state.basicInformationStatic.logoLink}
                                    variant="top"
                                />

                                <Card.Body>
                                    <Card.Title className='fs-2 fw-bold text-start pb-2'>
                                        {this.state.basicInformation.name}
                                    </Card.Title>


                                    <Card.Subtitle className=" text-start pb-2">
                                        {this.state.basicInformation.tagline}
                                    </Card.Subtitle>

                                    <br />

                                    <div className="col text-center">
                                        <Card.Link
                                            className=""
                                            href={this.state.basicInformation.facebook}
                                            target="_blank"
                                        >
                                            <SvgIcon
                                                height="20px"
                                                src="linkedin.svg"
                                                width="20px"
                                            />
                                        </Card.Link>

                                        <Card.Link
                                            className=""
                                            href={this.state.basicInformation.instagram}
                                            target="_blank"
                                        >
                                            <SvgIcon
                                                height="20px"
                                                src="linkedin.svg"
                                                width="20px"
                                            />
                                        </Card.Link>

                                        <Card.Link
                                            href={this.state.basicInformation.linkedin}
                                            target="_blank"
                                        >
                                            <SvgIcon
                                                height="25px"
                                                src="github.svg"
                                                width="25px"
                                            />
                                        </Card.Link>

                                        <Card.Link
                                            className=""
                                            href={this.state.basicInformation.website}
                                            target="_blank"
                                        >
                                            <SvgIcon
                                                height="20px"
                                                src="linkedin.svg"
                                                width="20px"
                                            />
                                        </Card.Link>
                                    </div>

                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className="col-9 justify-content-around">
                    <Card>
                        <Card.Body>
                            <div className="">
                                <Carousel
                                    nextIcon={
                                        <span
                                            aria-hidden="true"
                                            className="carousel-control-next-icon"
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='blue'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e")`,
                                            }}
                                        />
                                    }
                                    prevIcon={
                                        <span
                                            aria-hidden="true"
                                            className="carousel-control-prev-icon "
                                            style={{
                                                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='blue'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e")`,
                                            }}
                                        />
                                    }
                                >
                                    <Carousel.Item>
                                        <img
                                            alt="First slide"
                                            className="d-block w-100"
                                            src={this.state.basicInformationStatic.clubBanners[0]}
                                        />

                                        <Carousel.Caption>

                                            <p>
                                                Nulla vitae elit libero, a pharetra augue mollis interdum.
                                            </p>
                                        </Carousel.Caption>
                                    </Carousel.Item>

                                    <Carousel.Item>
                                        <img
                                            alt="Second slide"
                                            className="d-block w-100"
                                            src={this.state.basicInformationStatic.clubBanners[1]}
                                        />

                                        <Carousel.Caption>

                                            <p>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            </p>
                                        </Carousel.Caption>
                                    </Carousel.Item>

                                    <Carousel.Item>
                                        <img
                                            alt="Third slide"
                                            className="d-block w-100"
                                            src={this.state.basicInformationStatic.clubBanners    [2]}
                                        />

                                        <Carousel.Caption>

                                            <p>
                                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                            </p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                                
                                <div className="column">
                                    <input
                                        className="d-none"
                                        onChange={(e)=>{this.setState({image1: e.target.files[0]})}}
                                        ref={this.image1Ref}
                                        type="file"
                                    />

                                    <Button
                                        className="material-icons"
                                        onClick={this.handleUpload1.bind(this)}
                                    >
                                        add_circle
                                    </Button>

                                    <input
                                        className="d-none"
                                        onChange={(e)=>{this.setState({image2: e.target.files[0]})}}
                                        ref={this.image2Ref}
                                        type="file"
                                    />

                                    <Button
                                        className="material-icons"
                                        onClick={this.handleUpload2.bind(this)}
                                    >
                                        add_circle
                                    </Button>

                                    <input
                                        className="d-none"
                                        onChange={(e)=>this.handleUpload3(e.target.files[0])}
                                        ref={this.image3Ref}
                                        type="file"
                                    />

                                    <Button
                                        className="material-icons"
                                        onClick={()=> this.image3Ref.current.click()}
                                    >
                                        add_circle
                                    </Button>
    
                                </div>
                                
                                <br />

                                <div>
                                    <ClubAdminModal
                                        handleClose={this.handleCloseModal.bind(this)}
                                        handleSubmit={this.handleSubmitDescription.bind(this)}
                                        initialValues={[this.state.basicInformation.description]}
                                        labels={['Description','picture']}
                                        show={this.state.currentModal === 'description'}
                                    />

                                    <div>
                                        Coordinators:
                                        {this.state.basicInformation.admins.map(item => (
                                            <div key={item}>
                                                {item}
                                            </div>
                                        ))}
                                    </div>

                                    <div>
                                        Member Size:
                                        {' '}

                                        {this.state.basicInformation.memberSize}
                                    </div>
                                </div>

                                <hr />


                                <div className="d-flex">
                                    <div className="col-5">
                                        <div className="text-center h2">
                                            Description

                                            {" "}

                                        </div>

                                        <p className="text-start h6">
                                            {this.state.basicInformation.description}
                                        </p>

                                    </div>

                                    <div className="col-auto">
                                        <button
                                            className="btn btn-outline-warning material-icons col-auto"
                                            onClick={() => {
                                                    this.setState({
                                                        currentModal: "description",
                                                    });
                                                }}
                                            type="button"
                                        >
                                            edit
                                        </button>
                                    </div>

                                    <div className="offset-1 col-5">
                                        <div className="text-center h2">
                                            Announcements
                                            {" "}

                                            <button
                                                className="align-self-end  btn btn-outline-success material-icons"
                                                onClick={() => {
                                                    this.setState({
                                                        currentModal: "Announcements",
                                                    });
                                                }}
                                                type="button"
                                            >
                                                add_circle
                                            </button>

                                            <ClubAdminModal
                                                handleClose={this.handleCloseModal.bind(this)}
                                                handleSubmit={this.handleSubmitAnnouncements.bind(this)}
                                                initialValues={["Add here"]}
                                                labels={['Add Announcements']}
                                                show={this.state.currentModal === 'Announcements'}
                                            />
                                        </div>

                                        <div className="">
                                            <ul className="list">
                                                {this.state.announcements.reverse().map(item => (
                                                    <ul key={item}>
                                                        <ListGroup
                                                            as="ol"
                                                        >
                                                            <ListGroup.Item
                                                                as="li"
                                                                className="d-flex justify-content-between align-items-start my-2"
                                                            >
                                                                <div className="ms-2 me-auto">
                                                                    <div className="fw-bold">
                                                                        {item["content"]}
                                                                    </div>

                                                                    {this.state.currentTime - item["timestamp"].split("t")}
                                                                </div>

                                                                <span
                                                                    className="position-absolute start-95  p-1
                                                                    bg-primary border border-light rounded-circle"
                                                                >
                                                                    <span className="visually-hidden">
                                                                        New alerts
                                                                    </span>
                                                                </span>
                                                            </ListGroup.Item>
                                                        </ListGroup>
                                                    </ul>
                                                ))}
                                            </ul>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </Card.Body>
                    </Card>

                    <br />

                    <Card className="row">
                        <Card.Body className="mt-3">
                            <Card.Title className="card-title fs-2 header-color text-left">
                                Events

                                {" "}

                                <button
                                    className="align-self-end  btn btn-outline-success material-icons"
                                    onClick={() => {
                                        this.setState({
                                            currentModal: "Announcements",
                                        });
                                    }}
                                    type="button"
                                >
                                    edit
                                </button>
                            </Card.Title>

                            <br />

                            <Card.Text className="card-text h5 text-muted col-12">
                                <div>
                                    <RCarousel responsive={responsive}>
                                        {this.state.competitions.map((option, index) => (
                                            <ClubCard
                                                Type="Event"
                                                element={option}
                                                key={option.description}
                                                value={index}
                                            />
                                        ))}
                                    </RCarousel>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <br />
                </div>
            </div>

        );
    }
}

export default withRouter (ClubAdminPage);
