import React from "react";
import { Link } from "react-router-dom";

class NavbarLink extends React.Component {
  state = {
    isClicked: false,
    url: window.location.pathname,
  };

  handleClick = () => {
      this.setState({ url: this.props.path });
  };

//   componentDidMount = () => {
//     if (this.props.path === window.location.pathname) {
//       this.setState({ isClicked: true });
//     }
//   };

  componentDidUpdate = (prevProps, prevState) => {
    if(this.state.url !== prevState.url){
        console.log("change")
    }
  }

  render() {
    console.log("test", location.pathname);
    return (
      <div className="flex justify-center w-36 h-11 my-0 mx-2.5">
        <Link
          //   className={`bg-[#ededed] dark:bg-[#2c2f36] text-black dark:text-white flex justify-center items-center w-full h-full rounded-lg`}
          className={`${
            this.props.path === location.pathname ? "" : "bg-[#ededed] dark:bg-[#2c2f36]"
          }  text-black dark:text-white flex justify-center items-center w-full h-full rounded-lg`}
          to={this.props.path}
          onClick={this.handleClick}
        >
          {this.props.text}
        </Link>
      </div>
    );
  }
}

export default NavbarLink;
