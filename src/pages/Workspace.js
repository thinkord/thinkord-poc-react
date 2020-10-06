import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import WindowTitlebar from '../components/WindowTitlebar/WindowTitlebar';
import NoteCards from '../components/NoteCards/NoteCards';
import Modal from 'react-bootstrap/Modal';
import Folders from '../components/Folders/Folders'
// import SearchButton from '../components/SearchButton/SearchButton';
import { StoreContext } from '../context'
import Container from 'react-bootstrap/Container';
import appRuntime from '../appRuntime';

export default function Workspace({ match }) {
    const [modalShow, setModalShow] = useState(false);
    const [newTitle, setNewTitle] = useState("untitled");
    const context = useContext(StoreContext)
    const { data } = context
    const [folderId] = useState(match.params.id ? match.params.id : "home")
    const { getFolder, getCollections, addCollection } = context
    const folder = getFolder(folderId)
    const collections = getCollections(folder.collections)
    const handleModalToggle = () => {
        setModalShow(prevState => !prevState);
    }
    const handleNoteCreate = (title, folderId) => {
        console.log('send')
        addCollection(title, folderId)
        appRuntime.send('createFile',title)
    }
    const handleTitleChange = (event) => {
        setNewTitle(event.target.value);
        console.log(newTitle)
    }
    return (
        <React.Fragment>
            <WindowTitlebar docTitle="Home" />
            <header className="home-header">
                <h1 className="title">{folderId}</h1>
                <div className="controls">
                    {/* <SearchButton collections={data} onSearchChange={handleSearchClick} /> */}
                    <i onClick={handleModalToggle} className="fas fa-plus-circle fa-lg"></i>
                    <img className="user" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3f_mCLpkLWSbUPVBMkI1-ZUUFP-dqFeFGUCDOc1lzuWUQxROe&usqp=CAU" />
                </div>
            </header>
            <main>
                <Container>
                    <Link to="/">Back to home</Link>
                    <Folders data={data}/>
                    <NoteCards data={collections} folder={folderId}/>
                </Container>
            </main>
            
            <Modal show={modalShow} onHide={handleModalToggle} centered>
                <Modal.Header className="modal_header">
                    <Modal.Title>Name Your New Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" placeholder="untitled" onChange={handleTitleChange} autoFocus/>
                </Modal.Body>
                <Modal.Footer className="modal_footer">
                    <i className="modal_icon fas fa-check-circle" onClick={() => {
                        handleNoteCreate(newTitle, folderId);
                        handleModalToggle();
                    }}></i>
                    <i className="modal_icon fas fa-times-circle" onClick={handleModalToggle}></i>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}
