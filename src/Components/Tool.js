import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Empty from './Empty';

const closeBgStyle =
  'fixed bg-black bg-opacity-0 inset-0 z-40 transition-opacity duration-200 ease-in-out';
const openBgStyle =
  'fixed bg-black bg-opacity-40 inset-0 z-40 transition-opacity duration-200 ease-in-out';
const closeMainStyle =
  'fixed bg-white w-3/5 top-0 -right-full bottom-0 shadow-mode z-40 flex flex-col items-end px-6 pt-28 pb-14 transition-right duration-200 ease-in-out';
const openMainStyle =
  'fixed bg-white w-3/5 top-0 right-0 bottom-0 shadow-mode z-40 flex flex-col items-end px-6 pt-28 pb-14 transition-right duration-200 ease-in-out';

class Tool extends Component {
  constructor(props) {
    super(props);
    const { mode } = this.props;
    this.state = {
      currentMode: mode,
      popup: false,
      id: 0,
      date: '',
      inputData: '',
      bgStyle: closeBgStyle,
      mainStyle: closeMainStyle,
    };
  }

  componentDidMount() {
    this.getNoteData();

    setTimeout(() => {
      this.setState({
        bgStyle: openBgStyle,
        mainStyle: openMainStyle,
      });
    }, 100);

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeStyle();
      }
    });
  }

  componentWillUnmount() {
    document.body.removeAttribute('style');
    document.removeEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeStyle();
      }
    });
  }

  closeStyle = () => {
    const { onClose } = this.props;

    this.setState({
      bgStyle: closeBgStyle,
      mainStyle: closeMainStyle,
    });

    setTimeout(() => {
      onClose();
    }, 300);
  };

  getNoteData = () => {
    const { data, select } = this.props;

    if (data) {
      const copiedData = Array.from(data);
      const selectedId = copiedData.findIndex((i) => i.id === select);

      const thisNoteData = copiedData[selectedId];

      this.setState({
        id: selectedId,
        date: thisNoteData.date,
        inputData: thisNoteData.note,
      });
    }
  };

  modeChecker = () => {
    const { currentMode, date, inputData } = this.state;
    let content = null;

    if (currentMode === 'ADD') {
      content = (
        <textarea
          name="content"
          className="flex-1 font-noto px-6 py-9 text-text text-base w-full border border-solid border-gray-200 resize-none focus:outline-none"
          placeholder="Input your Note in here!"
          onChange={this.getInputData}
        />
      );
    } else if (currentMode === 'VIEW') {
      content = (
        <div className="flex-1 relative font-noto px-6 py-9 text-text text-base w-full border border-solid border-gray-200 resize-none focus:outline-none">
          {this.dataChanger()}
          <div className="text-blue text-sm absolute -top-5 left-1">{date}</div>
        </div>
      );
    } else if (currentMode === 'EDIT') {
      content = (
        <textarea
          name="content"
          className="flex-1 font-noto px-6 py-9 text-text text-base w-full border border-solid border-gray-200 resize-none focus:outline-none"
          placeholder="Input your Note in here!"
          value={inputData}
          onChange={this.getInputData}
        />
      );
    }

    return content;
  };

  btnChecker = () => {
    const { currentMode } = this.state;
    let tool = null;

    if (currentMode === 'ADD') {
      tool = (
        <div className="text-4xl mt-10">
          <button className="text-blue mr-6 focus:outline-none" type="submit">
            DONE
          </button>
          <button
            className="text-cancel focus:outline-none"
            type="button"
            onClick={this.closeStyle}
          >
            CANCEL
          </button>
        </div>
      );
    } else if (currentMode === 'VIEW') {
      tool = (
        <div className="text-4xl mt-10">
          <button
            className="text-blue mr-6 focus:outline-none"
            type="button"
            onClick={() => {
              this.setState({
                currentMode: 'EDIT',
              });
            }}
          >
            EDIT
          </button>
          <button
            className="text-red mr-6 focus:outline-none"
            type="button"
            onClick={() => {
              this.deleteNote();
              this.closeStyle();
            }}
          >
            DELETE
          </button>
          <button
            className="text-cancel focus:outline-none"
            type="button"
            onClick={this.closeStyle}
          >
            CANCEL
          </button>
        </div>
      );
    } else if (currentMode === 'EDIT') {
      tool = (
        <div className="text-4xl mt-10">
          <button
            className="text-blue mr-6 focus:outline-none"
            type="button"
            onClick={() => {
              const { inputData } = this.state;
              if (inputData) {
                this.editNote();
                this.setState({
                  currentMode: 'VIEW',
                });
              } else {
                this.setState({
                  popup: true,
                });
              }
            }}
          >
            DONE
          </button>
          <button
            className="text-cancel focus:outline-none"
            type="button"
            onClick={() => {
              this.setState({
                currentMode: 'VIEW',
              });
            }}
          >
            CANCEL
          </button>
        </div>
      );
    }

    return tool;
  };

  getInputData = (e) => {
    const data = e.target.value;
    this.setState({ inputData: data });
  };

  dataChanger = () => {
    const { inputData } = this.state;
    let noteData = null;
    let i = 0;

    noteData = inputData.split('\n').map((line) => {
      let data = null;

      if (line === '') {
        data = <p key={i}>&nbsp;</p>;
      } else {
        data = <p key={i}>{line}</p>;
      }
      i += 1;

      return data;
    });

    return noteData;
  };

  formatTime = (timeData) => {
    let time = null;

    if (timeData < 10) {
      time = `0${timeData}`;
    } else {
      time = timeData;
    }

    return time;
  };

  getNowDate = () => {
    const newDate = new Date();
    const year = newDate.getFullYear();
    const month = this.formatTime(newDate.getMonth() + 1);
    const day = this.formatTime(newDate.getDate());
    const hour = this.formatTime(newDate.getHours());
    const min = this.formatTime(newDate.getMinutes());

    return `${year}-${month}-${day} ${hour}:${min}`;
  };

  editNote = () => {
    const { onEdit } = this.props;
    const { inputData } = this.state;

    onEdit(this.getNowDate(), inputData);
  };

  deleteNote = () => {
    const { onDelete } = this.props;
    const { id } = this.state;

    onDelete(id);
  };

  emptyPopup = () => {
    const { popup } = this.state;

    let content = null;

    if (popup) {
      content = (
        <Empty
          onPopupClose={() => {
            this.setState({ popup: false });
          }}
        />
      );
    }

    return content;
  };

  render() {
    const { onSubmit } = this.props;
    const { currentMode, inputData, bgStyle, mainStyle } = this.state;
    return (
      <div className="font-poppins">
        {this.emptyPopup()}
        <div className={bgStyle} />

        <div className={mainStyle}>
          <div className="text-7xl text-lightGray">{currentMode} NOTE</div>
          <form
            className="relative flex flex-col flex-1 items-end w-full -mt-2"
            action="/noteasy"
            method="post"
            onSubmit={(e) => {
              e.preventDefault();
              if (inputData) {
                onSubmit(this.getNowDate(), inputData);
                this.closeStyle();
              } else {
                this.setState({
                  popup: true,
                });
              }
            }}
          >
            {this.modeChecker()}
            {this.btnChecker()}
          </form>
        </div>
      </div>
    );
  }
}

Tool.propTypes = {
  mode: PropTypes.string.isRequired,
  select: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Tool;
