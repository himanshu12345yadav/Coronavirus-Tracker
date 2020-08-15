import React, { useEffect, useState, useRef } from "react";
import coronavirus_white from "../assets/coronavirus_white.png";
import coronavirus from "../assets/coronavirus.png";
import CountryCases from "./country_cases";

var country_names = [];
var apiData = [];
var error_name = null;

const Cases = () => {
  var [newConfirmed, setNewConfirmed] = useState(0);
  var [totalConfirmed, setTotalConfirmed] = useState(0);
  var [totalRecovered, setTotalRecovered] = useState(0);
  var [deaths, setDeaths] = useState(0);

  const observer = useRef(null);

  useEffect(() => {
    const fetchData = () => {
      //  https://api.covid19api.com/summary
      fetch("https://api.covid19api.com/summary", {"Content-Type": 'text/json'})
        .then((res) => {
          if (res.status === 429) {
            const error = new Error(
              "Too many request's sent to the server Please try after some time."
            );
            error.name = "Bad Response";
            throw error;
          } else if (res.status === 502) {
            const error = new Error(
              "Server is facing some issues, Please try after some time..."
            );
            error.name = "Bad Gateway";
            throw error;
          } else {
            return res.json();
          }
        })
        .then((data) => {
          apiData = data;
          globalData();
          countries_data();
        })
        .catch((error) => {
          error_name = error.name;
          console.log(error);
        });
    };
    fetchData();
    const countries_data = () => {
      try {
        apiData.Countries.forEach((item, index) => {
          country_names.push({ index: index, name: item.Country });
        });
      } catch (error) {
        console.log("Error caused due to : " + error.message);
      }
    };

    const globalData = () => {
      const global_data = [
        apiData.Global.NewConfirmed,
        apiData.Global.TotalConfirmed,
        apiData.Global.TotalRecovered,
        apiData.Global.TotalDeaths,
      ];
      applyObserver(global_data);
    };
    const applyObserver = (global_data) => {
      const io = new IntersectionObserver(
        (entries, io) => {
          entries.forEach((entry) => {
            if(entry.isIntersecting){
                print(global_data);
                io.disconnect();
            }
            else{
                return;
            }
          });
        },
        { root: null, rootMargin: "0px", threshold: 0.5}
      );
      io.observe(observer.current);
    };

    // printing the data
    const print = (target, speed = 1.2) => {
      var counter = 1;
      // for newConfirmed
      const count = (callback, index) => {
        if (counter < target[index]) {
          counter *= speed;
          callback(Math.ceil(counter));
          setTimeout(() => count(callback, index), 10);
        } else {
          callback(target[index]);
        }
      };
      for (var index = 0; index < 4; index++) {
        switch (index) {
          case 0:
            count(setNewConfirmed, index);
            break;
          case 1:
            count(setTotalConfirmed, index);
            break;
          case 2:
            count(setTotalRecovered, index);
            break;
          default:
            count(setDeaths, index);
            break;
        }
      }
    };

    // counting on scroll
    // var status = true;
    // window.addEventListener('scroll', () => {
    //     const world_data = document.querySelector('#world_data');
    //     if (
    //         window.scrollY + window.screen.height >
    //             world_data.offsetTop + world_data.clientHeight &&
    //         status
    //     ) {
    //         status = false;
    // fetchData();
    //     }
    // });
  }, [observer]);
  return (
    <>
      <div
        className="container d-flex flex-column align-items-between mb-5"
        id="world_data"
        ref={observer}
      >
        <div data-aos="fade-up">
          <h2 className="text-center p-3 heading">
            Covid-19 Outbreak Worldwide
          </h2>
        </div>
        <div className="container" id="floating_img_1">
          <img
            src={coronavirus_white}
            alt="white_image"
            className="img-fluid"
          />
        </div>
        <div className="container" id="floating_img_2">
          <img
            src={coronavirus_white}
            alt="white_image"
            className="img-fluid"
          />
        </div>
        <div className="row shadow-lg bg-light d-flex justify-content-center align-items-start">
          <div className=" col-6 mx-auto col-md-3 m-0 p-0 col-sm-5">
            <div
              className="jumbotron m-0 d-flex flex-column align-items-center bg-light justify-content-center"
              style={{ height: "200px" }}
            >
              <span>
                <img
                  src={coronavirus}
                  alt="red_corona_icon"
                  className="img-fluid my-3"
                  style={{ width: "50px" }}
                />
              </span>
              <h3
                className="count_global"
                style={{ color: "#eb4559", fontWeight: "bold" }}
              >
                {newConfirmed.toLocaleString()}
              </h3>
              <h5
                className="title text-center"
                style={{ color: "var(--russian-violet)" }}
              >
                New Confirmed
              </h5>
            </div>
          </div>
          <div className=" col-6 mx-auto col-md-3 m-0 p-0 col-sm-5">
            <div
              className="jumbotron m-0 d-flex bg-light flex-column align-items-center justify-content-center"
              style={{ height: "200px" }}
            >
              <span className="justify-self-start hoverable">
                <img
                  src={coronavirus}
                  alt="red_corona_icon"
                  className="img-fluid my-3"
                  style={{ width: "50px" }}
                />
              </span>
              <h3
                className="count_global"
                style={{ color: "#eb4559", fontWeight: "bold" }}
              >
                {totalConfirmed.toLocaleString()}
              </h3>
              <h5
                className="title text-center"
                style={{ color: "var(--russian-violet)" }}
              >
                Total Confirmed
              </h5>
            </div>
          </div>
          <div className=" col-6 mx-auto col-md-3 m-0 p-0 col-sm-5">
            <div
              className="jumbotron m-0 d-flex bg-light flex-column align-items-center justify-content-center"
              style={{ height: "200px" }}
            >
              <span>
                <img
                  src={coronavirus}
                  alt="red_corona_icon"
                  className="img-fluid my-3"
                  style={{ width: "50px" }}
                />
              </span>
              <h3
                className="count_global"
                style={{ color: "#55c882", fontWeight: "bold" }}
              >
                {totalRecovered.toLocaleString()}
              </h3>
              <h5
                className="title text-center"
                style={{ color: "var(--russian-violet)" }}
              >
                Total Recovered
              </h5>
            </div>
          </div>
          <div className=" col-6 mx-auto col-md-3 m-0 p-0 col-sm-5">
            <div
              className="jumbotron m-0 d-flex bg-light flex-column align-items-center justify-content-center"
              style={{ height: "200px" }}
            >
              <span>
                <img
                  src={coronavirus}
                  alt="red_corona_icon"
                  className="img-fluid my-3"
                  style={{ width: "50px" }}
                />
              </span>
              <h3
                className="count_global"
                style={{ color: "#eb4559", fontWeight: "bold" }}
              >
                {deaths.toLocaleString()}
              </h3>
              <h5
                className="title text-center"
                style={{ color: "var(--russian-violet)" }}
              >
                Deaths
              </h5>
            </div>
          </div>
        </div>
      </div>
      <CountryCases
        apiData={apiData}
        error={error_name}
        countries={country_names}
      />
    </>
  );
};

export default Cases;
