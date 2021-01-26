import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Note extends Component {
  dataChanger = () => {
    const { note } = this.props;
    let noteData = null;
    let i = 0;

    noteData = note.split('\n').map((line) => {
      let data = null;
      if (i < 3) {
        if (line === '') {
          data = <p key={i}>&nbsp;</p>;
        } else {
          data = <p key={i}>{line}</p>;
        }
        i += 1;
      } else if (i === 3) {
        data = <p key={i}>...</p>;
        i += 1;
      }

      return data;
    });

    return noteData;
  };

  render() {
    const { date, onClick } = this.props;
    return (
      <button
        type="button"
        className="bg-white p-9 border w-full border-solid border-gray-100 shadow-note mb-7 font-noto cursor-pointer focus:outline-none"
        onClick={onClick}
      >
        <div className="text-sm text-left text-blue mb-3">{date}</div>
        <div className="text-text text-base text-left">
          {this.dataChanger()}
        </div>
      </button>
    );
  }
}

Note.propTypes = {
  date: PropTypes.string.isRequired,
  note: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Note;
