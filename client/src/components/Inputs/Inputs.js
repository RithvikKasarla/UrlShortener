import React, { Component } from "react";
import "./Inputs.css";

class Inputs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: "",
      code: "",
      LinkErrorMessage: "",
      CodeErrorMessage: "",
    };
  }

  handleInputChange = (e, field) => {
    this.setState({ [field]: e.target.value });
  };

  handleShortenClick = () => {
    console.log("SAVING");
    this.save(this.state.link, this.state.code);
  };

  save(link, code) {
    var splits;
    var starts;

    ({ splits, starts, link } = this.normalize(link));

    var validURL, uniqueCode, uniqueLink;

    validURL = this.validateformat(splits, starts, true);
    if (!validURL) {
      this.setState({ LinkErrorMessage: "Not a Valid URL" });
      return;
    }

    // fetch(`./checkunique/${this.state.code}/${link}`)
    //   .then((data) => {
    //     console.log("data retrieved");
    //     return data.json();
    //   })
    //   .then((results) => {
    //     console.log(results);
    //     var uniqueLink = !results.repeatLink;
    //     if (!uniqueLink) {
    //       this.setState({ LinkErrorMessage: "URL already exists" });
    //     }
    //     var uniqueCode = !results.repeatCode;
    //     if (!uniqueCode) {
    //       this.setState({ CodeErrorMessage: "Code Already in Use" });
    //     }
    //   });

    //   if (uniqueLink && uniqueCode) {
    //   this.setState({ LinkErrorMessage: "" });
    //   this.setState({ CodeErrorMessage: "" });
    //   document.getElementById("form").reset();
    //   return fetch(`./${code}/gen/${link}`).then(({ results }) =>
    //     this.setState({ backendData: results })
    //   );
    // }
    fetch(`./checkunique/${this.state.code}/${link}`)
      .then((data) => {
        console.log("data retrieved");
        return data.json();
      })
      .then((results) => {
        console.log(results);
        uniqueLink = !results.repeatLink;
        uniqueCode = !results.repeatCode;

        if (!uniqueLink) {
          this.setState({ LinkErrorMessage: "URL already exists" });
        } else if (!uniqueCode) {
          this.setState({ CodeErrorMessage: "Code Already in Use" });
        } else {
          this.setState({ LinkErrorMessage: "" });
          this.setState({ CodeErrorMessage: "" });
          document.getElementById("form").reset();
          console.log(":O");
          return fetch(`./${code}/gen/${link}`).then(({ results }) =>
            this.setState({ backendData: results })
          );
        }
      });
  }

  validateformat(splits, starts, validURL) {
    if (!(splits[starts].split(".")[0] === "www")) {
      validURL = false;
    } else if (!(splits[starts].split(".")[2] === "com")) {
      validURL = false;
    }
    return validURL;
  }

  normalize(link) {
    var splits = link.split("/");
    var starts = 1;
    if (!(splits[0] === "https:") && !(splits[0] === "http:")) {
      link = "https://" + link;
      starts = 0;
    }
    const index = splits.indexOf("");

    if (index > -1) {
      splits.splice(index, 1);
    }
    return { splits, starts, link };
  }

  render() {
    return (
      <div className="inputs-container">
        <form id="form">
          <input
            type="text"
            placeholder="Place link here"
            className="input-field"
            onChange={(e) => this.handleInputChange(e, "link")}
          />
          <input
            type="text"
            placeholder="Place code here"
            className="input-field"
            onChange={(e) => this.handleInputChange(e, "code")}
          />
        </form>

        <button
          type="submit"
          className="shorten-button"
          onClick={this.handleShortenClick}
        >
          Shorten
        </button>
        <p className="error-message">{this.state.LinkErrorMessage}</p>
        <p className="error-message">{this.state.CodeErrorMessage}</p>
      </div>
    );
  }
}

export default Inputs;
