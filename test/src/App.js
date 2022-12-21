import io from "socket.io-client";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import shareVideo from "./assets/newvideo.mp4"
import "./components/mainform.css"
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import axios from "axios"
const socket = io.connect('https://react-chat-app-mine.herokuapp.com/');


function App() {

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [datagriddata, setdatagriddata] = useState([]);
  const [longi,setlongitude] = useState("");
  const [lati,setlatitude] = useState("");



  const sendMessage = () => {
    socket.emit("send_message", { message });


  }

  const getData = async () => {
    await axios.get("http://localhost:5000/viewData")
      .then((res) => {
        setdatagriddata(res.data)

      });

  }


  useEffect(() => {
    getData();

    // socket.on("receive_message", (data) => {
    //   setMessageReceived(data.message)
    // })
  }, [])

  const loc_values = {
    longi,
    lati
  }
  const handleSubmitcheck = async (e) => {
    e.preventDefault()
    // console.log(values)
    const response = await axios.post("http://localhost:5000/location", loc_values)
    console.log(response)
  };

  console.log(datagriddata)


  const columns = [
    { field: "username", headerName: "UserName", width: 90 },
    { field: "email", headerName: "Email", width: 90 },
    { field: "paswword", headerName: "Paswword", width: 90 },
  ]

  const dummyData = [
    {
      username: 1,
      email: "eLearning Project",
      password: "Project for college",

    },
    {
      username: 2,
      email: "Project",
      password: "college",

    }
  ];

  const rows = datagriddata.map((row) => ({
    "username": row.username,
    "email": row.email,
    "password": row.password

  }))
  console.log("check this", datagriddata[0])
  // const [authenticated, setauthenticated] = useState(null);
  // var check = null;
  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem("authenticated");
  //   if (loggedInUser) {
  //     check=loggedInUser
  //     setauthenticated(loggedInUser);
  //   }
  // }, []);

  // console.log("checkk:" +check)
  if (1 == 0) {
    return <Navigate replace to="/" />;
  }
  else {

    return (
      <div className="App">
        <video className="backvideo"
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
        />

        <p className="P1">WELCOME TO THE DASHBOARD</p>
        <div className="form-group mt-3">
          <label>longitude</label>
          <input
            className="form-control mt-1"
            placeholder="Enter email"
            onChange={(e) => setlongitude(e.target.value)}
          />
        </div>
        <div className="form-group mt-3">
          <label>latitude</label>
          <input
          
            className="form-control mt-1"
            placeholder="Enter password"
            onChange={(e) => setlatitude(e.target.value)}
          />
        </div>
        <div className="d-grid gap-3 mt-4">
          <button type="submit" className="btn btn-primary"  onClick={handleSubmitcheck} >
            Submit 
          </button>
        </div>











        {/* <div className="gridClass">
          <ul>
             

          </ul>
          {datagriddata.map((user)=>{
            <p> {user.username} {user.email}</p>
          })}

          <DataGrid
            columns={columns}
            row={dummyData}
            pageSize={10}
            getRowId={id => id._id}
            rowsPerPageoptions={[10]}


          />

        </div> */}








      </div>
    );
  }

}
export default App