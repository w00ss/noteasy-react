import React, { Component } from 'react';
import Logo from './Logo';
import Nothing from './Components/Nothing';
import Note from './Components/Note';
import Tool from './Components/Tool';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'LIST',
      createdId: 0,
      selectedId: 0,
      notes: [],
    };
  }

  componentDidMount() {
    this.getNotes();
  }

  getNotes = () => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const createdId = JSON.parse(localStorage.getItem('createdId'));

    if (notes) {
      this.setState({ createdId, notes });
    }
  };

  addNote = (_date, _note) => {
    const { createdId, notes } = this.state;
    const copiedNotes = Array.from(notes);
    let id = createdId;
    id += 1;

    copiedNotes.push({
      id,
      date: _date,
      note: _note,
    });

    localStorage.setItem('createdId', id);
    localStorage.setItem('notes', JSON.stringify(copiedNotes));

    this.setState({
      createdId: id,
      notes: copiedNotes,
    });
  };

  editNote = (_date, _note) => {
    const { selectedId, notes } = this.state;
    const copiedNotes = Array.from(notes);
    const id = copiedNotes.findIndex((note) => note.id === selectedId);

    copiedNotes[id].date = _date;
    copiedNotes[id].note = _note;

    localStorage.setItem('notes', JSON.stringify(copiedNotes));

    this.setState({
      notes: copiedNotes,
    });
  };

  deleteNote = (_id) => {
    const { notes } = this.state;
    const copiedNotes = Array.from(notes);

    copiedNotes.splice(_id, 1);

    localStorage.setItem('notes', JSON.stringify(copiedNotes));

    this.setState({
      notes: copiedNotes,
    });
  };

  modeChecker = () => {
    const { mode, selectedId, notes } = this.state;
    let content = null;

    if (mode === 'ADD') {
      content = (
        <Tool
          mode={mode}
          onSubmit={(_date, _note) => {
            this.addNote(_date, _note);
          }}
          onClose={() => {
            this.setState({ mode: 'LIST' });
          }}
        />
      );
    } else if (mode === 'VIEW') {
      content = (
        <Tool
          mode={mode}
          select={selectedId}
          data={notes}
          onSubmit={(_date, _note) => {
            this.addNote(_date, _note);
          }}
          onEdit={(date, note) => {
            this.editNote(date, note);
          }}
          onDelete={(id) => {
            this.deleteNote(id);
          }}
          onClose={() => {
            this.setState({ mode: 'LIST' });
          }}
        />
      );
    }

    return content;
  };

  render() {
    const { notes } = this.state;
    return (
      <div className="flex h-screen">
        {this.modeChecker()}
        <div className="w-2/5">
          <div className="fixed top-48 left-48">
            <a href="/">
              <Logo />
            </a>
            <button
              type="button"
              className="mt-12 py-1 font-poppins text-blue text-2xl tracking-wider focus:outline-none cursor-pointer"
              onClick={() => {
                this.setState({
                  mode: 'ADD',
                });
              }}
            >
              <span className="mr-1">+</span>ADD NOTE
            </button>
          </div>
        </div>

        <main className="flex-col w-3/5 relative">
          {notes.length === 0 ? (
            <Nothing />
          ) : (
            <div className="mt-48 w-full px-6">
              {notes.map((note) => (
                <Note
                  key={note.id}
                  date={note.date}
                  note={note.note}
                  onClick={() => {
                    this.setState({
                      mode: 'VIEW',
                      selectedId: note.id,
                    });
                  }}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default App;

/*

onClick={() => {
                this.setState({
                  mode: 'ADD',
                });

{notes ? (
            <div className="mt-48 w-full px-6">
              {notes.map((note) => (
                <Note
                  key={note.id}
                  id={note.id}
                  date={note.date}
                  note={note.note}
                  onOpenView={(_id) => {
                    this.setState({ mode: 'VIEW', selected: _id });
                  }}
                />
              ))}


constructor(props) {
  
    super(props);

    this.state = {
      mode: 'LIST',
      selected: 0,
      notes: [],
    };
  }

  modeChecker = () => {
    const { mode, selected } = this.state;
    let content = null;

    if (mode === 'ADD') {
      content = (
        <Tool
          mode={mode}
          id={selected}
          onSubmit={(data) => {
            this.updateLs(data);
          }}
          onClose={() => {
            this.setState({ mode: 'LIST' });
          }}
        />
      );
    } else if (mode === 'VIEW') {
      content = (
        <Tool
          mode={mode}
          id={selected}
          onClose={() => {
            this.setState({ mode: 'LIST' });
          }}
        />
      );
    }

    return content;
  }; */
