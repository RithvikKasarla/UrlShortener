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
    if (!(splits[0] === "https:") && !(splits[0] === "http:")) {
      link = "https://" + link;
      starts = 0;
      console.log("added HTTPS://");
    }
    const index = splits.indexOf("");

    if (index > -1) {
      splits.splice(index, 1);
    }
    var validURL, validCode;
    fetch(`/search/${link}`)
      .then((data) => {
        return data.json();
      })
      .then((results) => {
        var validURL = !results.repeat;
        if (validURL) {
          if (!(splits[starts].split(".")[0] === "www")) {
            validURL = false;
          } else if (!(splits[starts].split(".")[2] === "com")) {
            validURL = false;
          }

          if (!validURL) {
            this.setState({ LinkErrorMessage: "Not a Valid URL" });
          }
        } else {
          this.setState({ LinkErrorMessage: "URL already exists" });
        }
      });
    fetch(`/searchCode/${this.state.code}`)
      .then((data) => {
        return data.json();
      })
      .then((results) => {
        var validCode = !results.repeat;
        if (validCode) {
          this.setState({ CodeErrorMessage: "Code Already in Use" });
        }
      });

    if (validURL && validCode) {
      document.getElementById("form").reset();
      return fetch(`/${code}/gen/${link}`).then(({ results }) =>
        this.setState({ backendData: results })
      );
    }
  }

  render() {
    return (
      <>
        <form id="form">
          <input
            type="text"
            placeholder="Place link here"
            class="border-2 border-black rounded-[5px]"
            onChange={(e) => {
              var link = e.target.value;
              this.setState({ link });
            }}
          />
          <input
            type="text"
            placeholder="Place code here"
            class="border-2 border-black rounded-[5px]"
            onChange={(e) => {
              var code = e.target.value;
              this.setState({ code });
            }}
          />
        </form>

        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
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
