import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Empty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      style:
        'fixed font-noto text-white p-3 left-2/3 bottom-44 -translate-x-1/2 bg-black bg-opacity-0 rounded-lg z-50 transition-opacity duration-200 ease-in-out',
    };
  }

  componentDidMount() {
    const { onPopupClose } = this.props;

    setTimeout(() => {
      this.setState({
        style:
          'fixed font-noto text-white p-3 left-2/3 bottom-44 -translate-x-1/2 bg-black bg-opacity-25 rounded-lg transition-opacity duration-200 ease-in-out z-50',
      });
    }, 100);

    setTimeout(() => {
      this.setState({
        style:
          'fixed font-noto text-white p-3 left-2/3 bottom-44 -translate-x-1/2 bg-black bg-opacity-0 rounded-lg transition-opacity duration-200 ease-in-out z-50',
      });
    }, 1800);
    setTimeout(() => {
      onPopupClose();
    }, 2000);
  }

  render() {
    const { style } = this.state;

    return <div className={style}>Empty Note.</div>;
  }
}

Empty.propTypes = {
  onPopupClose: PropTypes.func.isRequired,
};

export default Empty;
