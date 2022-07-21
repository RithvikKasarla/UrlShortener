import React from "react";
import "./Inputs.css";
class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      code: "",
      LinkErrorMessage: "",
      CodeErrorMessage: "",
    };
  }

  save(link, code) {
    var splits = link.split("/");
    var starts = 1;
    if (!(splits[0] === "https:")) {
      link = "https://" + link;
      starts = 0;
      console.log("added HTTPS://");
    }
    const index = splits.indexOf("");

    if (index > -1) {
      splits.splice(index, 1);
    }
    fetch(`/search/${link}`)
      .then((data) => {
        return data.json();
      })
      .then((results) => {
        var valid = !results.repeat;
        if (!(splits[starts].split(".")[0] === "www")) {
          valid = false;
        } else if (!(splits[starts].split(".")[2] === "com")) {
          valid = false;
        }

        if (valid) {
          document.getElementById("form").reset();
          return fetch(`/${code}/gen/${link}`).then(({ results }) =>
            this.setState({ backendData: results })
          );
        } else {
          this.setState({ LinkErrorMessage: "Not a Valid URL" });
        }
      });
  }

  render() {
    return (
      <>
        <form id="form">
          <input
            type="text"
            placeholder="Place link here"
            onChange={(e) => {
              var link = e.target.value;
              this.setState({ link });
            }}
          />
          <input
            type="text"
            placeholder="Place code here"
            onChange={(e) => {
              var code = e.target.value;
              this.setState({ code });
            }}
          />
        </form>

        <button
          type="submit"
          onClick={() => {
            this.save(this.state.link, this.state.code);
          }}
        >
          Shorten
        </button>
        <p className="message">{this.state.LinkErrorMessage}</p>
        <p className="message">{this.state.CodeErrorMessage}</p>
      </>
    );
  }
}

export default Inputs;
