import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import {SvgIcon} from "common/SvgIcon";
import ClubAdminModal from "components/ClubAdmin/modal";
import Loading from "components/Loading";
import {FirebaseContext} from "firebaseProvider";
import axios from "utilities/axios";
import {withRouter} from "next/router";
import PropTypes from "prop-types";
import {ListGroup} from "react-bootstrap";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
// import Button from "react-bootstrap/Button";
import RCarousel from "react-multi-carousel";
import ClubCard from "components/ClubList/ClubCard";
import "react-multi-carousel/lib/styles.css";
import styles from "pages/club/styles.module.scss";
import Link from "common/Link";
import lodashMap from "lodash/map";
import Image from "react-bootstrap/Image";

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
        const today = new Date();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + " " +
            today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
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
            currentDateTime : date,
            bannerLinks:null,
            bannerPaths :null,
            basicInformationStatic:{
                joinDate:"26122020",
                clubBanners:["https://via.placeholder.com/1600X480","https://via.placeholder.com/1600X480","https://via.placeholder.com/1600X480"],
            },
            logoUrl:null,
            }
    }

    componentDidMount() {
        this.componentDidUpdate()
    }

    shouldComponentUpdate(){
        return true
    }

    componentDidUpdate(){
        if (this.props.router.isReady){
            if (!this.state.logoUrl) {
                const storage = getStorage();
                getDownloadURL(ref(storage, "data/" + this.props.router.query.clubName + "/uneditable/logo.png"))
                    .then(url => this.setState({logoUrl: url}));
            }
            if (this.state.basicInformation === null)
                axios.get("club/club/"+ this.props.router.query.clubName +"/").then((res) => {
                    this.setState({basicInformation: res.data, isLoading: false,bannerPaths:res.data.picture});
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



            if (this.state.bannerLinks === null && this.state.bannerPaths !== null) {
                const firebase = this.context;
                const storage = firebase ? getStorage(firebase) : getStorage();

                JSON.parse(this.state.bannerPaths).map((link, index) => {
                    getDownloadURL(ref(storage, link)).then((url) => {
                        this.setState((prevState) => ({
                            ...prevState,
                            bannerLinks: {
                                ...(prevState.bannerLinks),
                                [index]: url,
                            }
                        }))
                    })
                })
            }
    }}

    renderFacebook(){
         if (this.state.basicInformation.facebook){
            return(
                <Card.Link
                    className=""
                    href={this.state.basicInformation.facebook}
                    target="_blank"
                >
                    <SvgIcon
                        height="20px"
                        src="facebook.svg"
                        width="20px"
                    />
                </Card.Link>
            )
        }
    }

    renderInstagram(){
        if(this.state.basicInformation.instagram){
            return(
                <Card.Link
                    className=""
                    href={this.state.basicInformation.instagram}
                    target="_blank"
                >
                    <SvgIcon
                        height="20px"
                        src="instagram.svg"
                        width="20px"
                    />
                </Card.Link>
            )
        }
    }

    renderDiscord(){
        if(this.state.basicInformation.discord){
            return(
                <Card.Link
                    className=""
                    href={this.state.basicInformation.discord}
                    target="_blank"
                >
                    <SvgIcon
                        height="20px"
                        src="discord.svg"
                        width="20px"
                    />
                </Card.Link>
            )
        }
    }

    renderLinkedin(){
        if(this.state.basicInformation.linkedin){
            return(
                <Card.Link
                    className=""
                    href={this.state.basicInformation.linkedin}
                    target="_blank"
                >
                    <SvgIcon
                        height="20px"
                        src="linkedin.svg"
                        width="20px"
                    />
                </Card.Link>
            )
        }

    }

    renderTelegram(){
        if(this.state.basicInformation.telegram){
            return(
                <Card.Link
                    href={this.state.basicInformation.telegram}
                    target="_blank"
                >
                    <SvgIcon
                        height="25px"
                        src="telegram.svg"
                        width="25px"
                    />
                </Card.Link>
            )
        }
    }

    renderGithub(){
        if(this.state.basicInformation.github){
            return(
                <Card.Link
                    className=""
                    href={this.state.basicInformation.github}
                    target="_blank"
                >
                    <SvgIcon
                        height="20px"
                        src="github.svg"
                        width="20px"
                    />
                </Card.Link>
            )
        }
    }

    renderMail(){
        if(this.state.basicInformation.mail){
            return(
                <Card.Link
                    className=""
                    href={this.state.basicInformation.mail}
                    target="_blank"
                >
                    <SvgIcon
                        height="20px"
                        src="mail.svg"
                        width="20px"
                    />
                </Card.Link>
            )
        }
    }

    renderOther(){
        if(this.state.basicInformation.other){
            return(
                <Card.Link
                    className=""
                    href={this.state.basicInformation.other}
                    target="_blank"
                >
                    <SvgIcon
                        height="20px"
                        src="website.svg"
                        width="20px"
                    />
                </Card.Link>
            )
        }
    }

    static contextType = FirebaseContext;

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
        axios.post("club/announcements/",{
            club: this.props.router.query.clubName,
            content: values[0]
        }).then((ress) => {
                    this.setState((prevState) => {
                        return (
                            {
                                ...(prevState.announcements),
                                announcements:[{id:ress.data.id, content:ress.data.content, timestamp:ress.data.timestamp},...(prevState.announcements)]
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

    bannerControl(args,num) {
        if (args[num] !== undefined && args !== undefined){
            return(
                <div>
                    <Image
                        alt="Carousel Image"
                        className="m-auto"
                        fluid
                        height="130"
                        rounded
                        src={args[num]}
                        width="130"
                    />
                </div>

            )
        }
        else{
            return(
                <SvgIcon
                    height="40px"
                    src="plus.svg"
                    width="40px"
                />
            )
        }
    }

    handleUpload1(image){
        // this.image3Ref.current.click()
        this.setState({image1: image})
        const storage = getStorage();
        const storageRef = ref(storage, "/data/"+ this.props.router.query.clubName +"/editable/" +
            (new Date().getTime()));
        if(image == null)
            return;
        uploadBytes(storageRef, image).then((args) => {console.log("test again",args);})
             .catch(() => {console.log("error bro")});
    }

    handleUpload2(image){
    this.image2Ref.current.click()
        // this.image3Ref.current.click()
        this.setState({image2: image})
        const storage = getStorage();
        const storageRef = ref(storage, "/data/"+ this.props.router.query.clubName +"/editable/" +
            (new Date().getTime()));
        if(image == null)
            return;
        uploadBytes(storageRef, image).then((args) => {console.log("test again",args);})
             .catch(() => {console.log("error bro")});
    }

    handleUpload3(image){
        // this.image3Ref.current.click()
        this.setState({image3: image})
        const storage = getStorage();
        const storageRef = ref(storage, "/data/"+ this.props.router.query.clubName +"/editable/" +
            (new Date().getTime()));
        if(image == null)
            return;
        uploadBytes(storageRef, image).then((args) => {console.log("test again",args);})
             .catch(() => {console.log("error bro")});
    }

    handleCloseModal() {
        this.setState({
            currentModal: null,
        })
    }

    getNotification(date1,date2){
        date1 = new Date(date1)
        date2 = new Date(date2.split("T")[0] +" " + date2.split("T")[1].split(".")[0])
        if (Math.floor((Math.abs(date2 - date1)) / (1000 * 60 * 60)) <= 1){
            return(
                <span
                    className="position-absolute start-93  p-1
                    bg-primary border border-light rounded-circle"
                >
                    <span className="visually-hidden">
                        New alerts
                    </span>
                </span>
            )
        }
    }

    getDate(date1,date2){
        let year1 = new Date (date2.split("T")[0])
        let year2 = new Date(date1.split(" ")[0])
        date1 = new Date(date1)
        date2 = new Date(date2.split("T")[0] +" " + date2.split("T")[1].split(".")[0])

        if (Math.floor((Math.abs(year2-year1))/(1000*60*60*24))>0){
            return(Math.floor((Math.abs(year2-year1))/(1000*60*60*24)) + " days ago")
        }

        else{
            if (Math.floor((Math.abs(date2-date1))/(1000*60))<=0 && Math.floor((Math.abs(date2-date1))/(1000*60*60))<=0){
                return(" seconds ago")
            }
            else if (Math.floor((Math.abs(date2-date1))/(1000*60*60)) <= 0 && Math.floor((Math.abs(date2-date1))/(1000*60)) > 0){
                return(Math.floor((Math.abs(date2-date1))/(1000*60)) + " mins ago")
            }
            else{
                return(Math.floor((Math.abs(date2-date1))/(1000*60*60))+ " hrs ago")
            }
        }
    }

    render(){
        console.log("test" ,  this.state);
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
            return <Loading />;
        }
        return (
            <div className="row m-md-3">
                <div className="mx-3 col-md-2 col-lg-2 col-sm-12 d-flex justify-content-around">
                    <div className={styles.clubcard}>
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
                                    src={this.state.logoUrl}
                                    variant="top"
                                />

                                <Card.Body>
                                    <Card.Title className='fs-2 fw-bold text-start pb-2'>
                                        {this.state.basicInformation.name}
                                    </Card.Title>

                                    <Card.Subtitle className={styles.tagline}>
                                        {this.state.basicInformation.tagline}
                                    </Card.Subtitle>

                                    <br />

                                    <div className="col text-center">
                                        {this.renderFacebook()}

                                        {this.renderInstagram()}

                                        {this.renderDiscord()}

                                        {this.renderLinkedin()}

                                        {this.renderTelegram()}

                                        {this.renderGithub()}

                                        {this.renderMail()}

                                        {this.renderOther()}
                                    </div>

                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>

                <div className={styles.clubBox + " col-md-9 col-lg-9 col-sm-12 justify-content-around"}>
                    <Card className={styles.leftCard1}>
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
                                    {lodashMap(this.state.bannerLinks, (image) => {
                                    return (
                                        <Carousel.Item
                                            key={image}
                                        >
                                            <div className="w-100 d-flex">
                                                <Image
                                                    alt="Carousel Image"
                                                    className="m-auto"
                                                    fluid
                                                    rounded
                                                    src={image}
                                                />
                                            </div>
                                        </Carousel.Item>
                                        )
                                    })}

                                </Carousel>

                                <br />
                                
                                <div className="d-flex">
                                    {!this.state.bannerLinks?null:
                                    <div className="mx-auto d-flex">
                                        <div className="d-flex">
                                            <button
                                                className={"my-auto mx-3 btn btn" + ((this.state.bannerLinks[0]) ? "" : "-primary")}
                                                onClick={this.handleUpload1.bind(this)}
                                                type="button"
                                            >
                                                {this.bannerControl(this.state.bannerLinks, 0)}
                                            </button>
                                        </div>

                                        <div className="d-flex">
                                            <button
                                                className={"my-auto mx-3 btn btn" + ((this.state.bannerLinks[1]) ? "" : "-primary")}
                                                onClick={this.handleUpload2.bind(this)}
                                                type="button"
                                            >
                                                {this.bannerControl(this.state.bannerLinks, 1)}

                                            </button>
                                        </div>

                                        <div className="d-flex">
                                            <button
                                                className={"my-auto mx-3 btn btn" + ((this.state.bannerLinks[2]) ? "" : "-primary")}
                                                onClick={() => this.image3Ref.current.click()}
                                                type="button"
                                            >
                                                {this.bannerControl(this.state.bannerLinks, 2)}

                                            </button>
                                        </div>
                                    </div>}
                                </div>

                                <div>
                                    <input
                                        className="d-none"
                                        onChange={(e)=>{this.setState({image1: e.target.files[0]})}}
                                        ref={this.image1Ref}
                                        type="file"
                                    />
                                    
                                    <input
                                        className="d-none"
                                        onChange={(e)=>{this.setState({image2: e.target.files[0]})}}
                                        ref={this.image2Ref}
                                        type="file"
                                    />
                                    
                                    <input
                                        className="d-none"
                                        onChange={(e)=>this.handleUpload3(e.target.files[0])}
                                        ref={this.image3Ref}
                                        type="file"
                                    />
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

                                    <div className={styles.coordinators}>
                                        Coordinators:
                                        {' '}

                                        {this.state.basicInformation.admins.join(", ")}
                                    </div>

                                    <div className={styles.memberSize}>
                                        Member Size:
                                        {' '}

                                        {this.state.basicInformation.memberSize}
                                    </div>
                                </div>

                                <hr />


                                <div className="d-flex">
                                    <div className={styles.descriptionBox + " col-md-5 col-lg-5 col-sm-6"}>
                                        <div className={styles.descriptionHeading}>
                                            Description

                                            {" "}

                                            {" "}
                                            
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

                                        <p className={styles.description}>
                                            {this.state.basicInformation.description}
                                        </p>

                                    </div>

                                    <div className=" offset-1 col-md-5 col-lg-5 col-sm-9">
                                        <div className={styles.announcementsHeading}>
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

                                        <div className="overflow-auto">
                                            <ul
                                                className="list"
                                                style={{ height: '250px'}}
                                            >
                                                {this.state.announcements.map(item => (
                                                    <ul
                                                        className="pe-2"
                                                        key={item}
                                                    >
                                                        <ListGroup
                                                            as="ol"
                                                        >
                                                            <ListGroup.Item
                                                                as="li"
                                                                className="d-flex justify-content-between align-items-start my-2"
                                                            >
                                                                <div className={styles.notifications}>
                                                                    <div className={styles.notificationHeading}>
                                                                        {item["content"]}
                                                                    </div>

                                                                    <div>
                                                                        {this.getDate(this.state.currentDateTime, item["timestamp"])}
                                                                    </div>

                                                                </div>

                                                                {this.getNotification(this.state.currentDateTime, item["timestamp"])}

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

                    <Card className={styles.leftCard2}>
                        <Card.Body className="mt-3">
                            <Card.Title className="card-title fs-2 header-color text-left">
                                Events

                                {" "}

                            </Card.Title>

                            <Link
                                className="reset-a"
                                to={"/manage/" + this.props.router.query.clubName + "/create-event"}
                            >
                                <button
                                    className="align-self-end  btn btn-outline-success material-icons"
                                    type="button"
                                >
                                    add_circle
                                </button>

                            </Link>


                            <br />

                            <Card.Text className="card-text h5 col-12">
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

//TODO: need to give attributions to icons8