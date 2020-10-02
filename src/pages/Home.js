import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import WindowTitlebar from '../components/WindowTitlebar/WindowTitlebar';
import NoteCards from '../components/NoteCards/NoteCards';
import SearchButton from '../components/SearchButton/SearchButton';
import './Home.scss';
import Container from 'react-bootstrap/Container';
import { StoreContext } from '../context'
import { Folder, Home } from '@material-ui/icons';
// import InputContainer from '../components/Input/InputContainer'

function App() {
  const context = useContext(StoreContext)
  const { data } = context

  const handleSearchClick = (search_file) => {
    search_file = search_file.toLowerCase();
    var new_collections = [];
    for (var i = 0; i < this.state.collections.length; i++) {
      if (this.state.collections[i].path.split("\\").pop().toLowerCase().includes(search_file)) {
        new_collections.push(this.state.collections[i]);
      }
    }
  }


  const folderRender = () => {
    if (data.folders !== undefined) {
      return Object.values(data.folders).map(folder => {
        return <Link to="/">{folder.name}</Link>
      })
    }
  }

  return (
    <React.Fragment>
      <WindowTitlebar docTitle="Home" />
      <header className="home-header">
        <h1 className="title">Home</h1>
        <div className="controls">
          <SearchButton collections={data} onSearchChange={handleSearchClick} />
          <i className="fas fa-plus-circle fa-lg"></i>
          <img className="user" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3f_mCLpkLWSbUPVBMkI1-ZUUFP-dqFeFGUCDOc1lzuWUQxROe&usqp=CAU" />
        </div>
      </header>
      <main>
        <Container>
          <NoteCards data={data} />
        </Container>

        <div>
          <h2>Folders</h2>
          {folderRender()}
          <h3>hello</h3>
        </div>
      </main>
    </React.Fragment>
  );
}

export default App;
