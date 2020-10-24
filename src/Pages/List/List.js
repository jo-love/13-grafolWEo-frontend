import React, { Component } from "react";
import { LISTBANNERBGSRC, API } from "../../config";
import { AiFillCaretDown } from "react-icons/ai";
import ListTag from "./Components/ListTag";
import ListCategory from "./Components/ListCategory";
import RecommendWork from "./Components/RecommendWork";
import LatestWork from "./Components/LatestWork";
import PopularCreator from "./Components/PopularCreator";
import "./List.scss";

// const menuTabObj = {
//   0: <RecommendWork />,
//   1: <LatestWork />,
//   2: <PopularCreator />,
// };

class List extends Component {
  constructor() {
    super();
    this.state = {
      listName: "사진",
      bannerBgSrc: [],
      categoryToggle: false,
      category: [],
      menuTabActiveId: 2,
      listBannerTags: [],
      popularCreator: [],
    };
  }

  handleClickMenuTab = (id) => {
    this.setState({ menuTabActiveId: id });
  };

  componentDidMount() {
    this.setState({ bannerBgSrc: LISTBANNERBGSRC });

    fetch(`${API}/Data/List/CATEGORY.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          category: res.category,
        });
      });

    fetch(`${API}/Data/List/LISTBANNERTAGS.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          listBannerTags: res.listBannerTags,
        });
      });

    fetch(`${API}/Data/List/POPULARLIST.json`)
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          popularCreator: res.popularCreator,
        });
      });
  }

  handleToggle = () => {
    this.setState({
      categoryToggle: !this.state.categoryToggle,
    });
  };

  render() {
    const {
      listBannerTags,
      listName,
      category,
      categoryToggle,
      bannerBgSrc,
      popularCreator,
    } = this.state;

    const tagList = listBannerTags.map(({ id, name }) => (
      <ListTag key={id} name={name} />
    ));

    const categoryList = category.map(({ id, name, src }) => (
      <ListCategory key={id} name={name} src={src} />
    ));

    // const popularCreatorList = popularCreator.map(
    //   ({
    //     id,
    //     profileImgSrc,
    //     name,
    //     desc,
    //     imgPreviewSrc,
    //     follower,
    //     like,
    //     illust,
    //   }) => (
    //     <PopularCreator
    //       key={id}
    //       profileImgSrc={profileImgSrc}
    //       name={name}
    //       desc={desc}
    //       imgPreviewSrc={imgPreviewSrc}
    //       follower={follower}
    //       like={like}
    //       illust={illust}
    //     />
    //   )
    // );

    return (
      <div className="List">
        <header
          className="listBanner"
          style={{ backgroundImage: `url(${bannerBgSrc})` }}
        >
          <div className="inner">
            <div className="listCategoryWrap">
              <button
                onClick={this.handleToggle}
                className={categoryToggle ? "active" : ""}
              >
                {listName}
                <span className="icon">
                  <AiFillCaretDown />
                </span>
              </button>
              <ul className="clearFix listCategory">{categoryList}</ul>
            </div>
            <ul className="tags">{tagList}</ul>
          </div>
        </header>
        <main>
          <nav className="listFilter">
            <ul>
              <li>
                <button>추천</button>
              </li>
              <li>
                <button>최신</button>
              </li>
              <li className="active">
                <button>인기크리에이터</button>
              </li>
            </ul>
          </nav>
          <section className="popular">
            <div className="container">
              {/* {menuTabObj[this.state.menuTabActiveId]} */}
              <PopularCreator popularCreator={popularCreator} />
            </div>
          </section>
          {/*
          <section className="recommend"></section>
          <section className="latest"></section>
          <section className="popular">
            <div className="container">
              <ul className="clearFix list">{popularCreatorList}</ul>
            </div>
          </section>
          */}
        </main>
      </div>
    );
  }
}

export default List;
