import React from "react";

import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import BadgeDetails from "./BadgeDetails";

import api from "../api";
import "./styles/BadgeDetails.css";

class BadgeDetailsContainer extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
    modalIsOpen: false
  };

  async fetchData(idBadge) {
    this.setState({ loading: true, error: null });
    try {
      const data = await api.badges.read(idBadge);
      this.setState({ loading: false, data: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  }

  componentDidMount() {
    const idBadge = this.props.match.params.idBadge;
    this.fetchData(idBadge);
  }

  handleOpenModal = e => {
    console.log("abc");
    this.setState({ modalIsOpen: true });
  };

  handleCloseModal = e => {
    this.setState({ modalIsOpen: false });
  };

  handleDeleteBadge = async () => {
    console.log(this);
    this.setState({ loading: true, error: null });

    try {
      await api.badges.remove(this.props.match.params.idBadge);
      this.props.history.push("/badges");
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }

    const badge = this.state.data;

    return (
      <BadgeDetails
        onCloseModal={this.handleCloseModal}
        onOpenModal={this.handleOpenModal}
        onDeleteBadge={this.handleDeleteBadge}
        modalIsOpen={this.state.modalIsOpen}
        badge={badge}
      ></BadgeDetails>
    );
  }
}

export default BadgeDetailsContainer;
