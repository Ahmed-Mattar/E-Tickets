import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  // axios.get('/api/users/currentuser').catch((err) => {
  //   console.log(err.message);
  // });

  return <h1>Landing Page</h1>;
};

// clinet ---> while inside the app already
// serve --- > Hard refresh - click on link form diff domain - typing url into address bar
LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    // we are on the server
    // request to http://ingress-nginx-controller.svc.cluster.local/api/users/currentuser
    // http://SERVICENAME.NAMESPACE.svc.cluster.local/
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );
    return data;
  } else {
    // we are on the browser
    // base url ''
    const { data } = await axios.get("/api/users/currentuser");
    // {currentUser: {}}
    return data;
  }
};

export default LandingPage;
