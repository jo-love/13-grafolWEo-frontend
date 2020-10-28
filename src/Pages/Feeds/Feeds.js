import React, { Component } from "react";
import CardWrap from "../../Components/CardList/CardWrap";
import { CARDDATA } from "../../../src/config";
import "./Feeds.scss";

const LIMIT = 12;

class Feeds extends Component {
  constructor() {
    super();
    this.state = {
      CardListsArr: [],
      timeSet: false,
      CardDataOrder: 0,
    };
  }

  infiniteScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight * 0.95 &&
      !this.state.timeSet
    ) {
      this.setState({ timeSet: true });
      this.getCardData();
    }
  };

  getCardData = () => {
    const { mainPageView, CardListsArr, CardDataOrder } = this.state;
    const token = localStorage.getItem("token");
    if (token) {
      fetch(
        `${CARDDATA}list?sort=${mainPageView}&limit=${LIMIT}&offset=${CardDataOrder}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            CardListsArr: [...CardListsArr, ...res.data],
            CardDataOrder: CardDataOrder + LIMIT,
            timeSet: false,
          });
        });
    }
  };

  componentDidMount() {
    this.getCardData();
    window.addEventListener("scroll", this.infiniteScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.infiniteScroll);
  }

  render() {
    const { CardListsArr } = this.state;

    return (
      <div className="Feeds">
        <CardWrap CardListsArr={CardListsArr} />
      </div>
    );
  }
}

export default Feeds;
