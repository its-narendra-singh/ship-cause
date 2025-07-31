import { Fragment } from "react";
import GetStarted from "../../features/home/GetStarted";
import Hero from "../../features/home/hero";

const Home = () => {
    return (
        <Fragment>
            <Hero />
            <GetStarted />
        </Fragment>
    );
};

export default Home;