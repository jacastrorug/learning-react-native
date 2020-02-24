import React from "react";

import Badge from "../components/Badge";
import BadgeForm from "../components/BadgeForm";
import api from "../api";
import header from "../images/platziconf-logo.svg";

import "./styles/BadgeEdit.css";
import PageLoading from "../components/PageLoading";

class BadgeEdit extends React.Component {
  state = {
    loading: false,
    error: null,
    form: {
      firstName: "",
      lastName: "",
      email: "",
      jobTitle: "",
      twitter: ""
    }
  };

  async fetchData(idBadge) {
    this.setState({ loading: true, error: null });

    try {
      const data = await api.badges.read(idBadge);
      this.setState({ loading: false, form: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  }

  componentDidMount() {
    const idBadge = this.props.match.params.idBadge;
    this.fetchData(idBadge);
  }

  handleChange = e => {
    /*
    const nextForm = this.state.form;
    nextForm[e.target.name] = e.target.value;

    this.setState({
      form: nextForm
    });
    */

    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    try {
      const idBadge = this.props.match.params.idBadge;
      await api.badges.update(idBadge, this.state.form);
      this.setState({ loading: false });

      this.props.history.push("/badges");
    } catch (error) {
      this.setState({ loading: false, error: error });
    }

    console.log(this.state);
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }

    return (
      <React.Fragment>
        <div className="BadgeEdit__hero">
          <img className="Badge_edit-image img-fluid" src={header} alt="logo" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName={this.state.form.firstName || "FIRST_NAME"}
                lastName={this.state.form.lastName || "LAST_NAME"}
                jobTitle={this.state.form.jobTitle || "JOB_TITLE"}
                twitter={this.state.form.twitter || "twitter"}
                email={this.state.form.email || "EMAIL"}
                avatar="https://www.gravatar.com/avatar?d=identicon"
              ></Badge>
            </div>
            <div className="col-6">
              <h1>Edit Attendant</h1>
              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeEdit;
