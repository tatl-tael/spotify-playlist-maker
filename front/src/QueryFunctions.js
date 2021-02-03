// Does network work for getting user info. Sets state to be user info using the "context" variable
const getUserInfo = (context) => {
    const url = `http://localhost:5000/api/get-my-info`;
    fetch(url, { credentials: "include" })
    .then( res => res.json())
    .then( json => {
      console.log(json)
      context.setState({
        loggedIn: json.loggedIn,
        name: json.name,
      });
    })
    .catch( err => { console.log(err) })
}

export { getUserInfo, };