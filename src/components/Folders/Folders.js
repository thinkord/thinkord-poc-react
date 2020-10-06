import React from 'react'
import './Folders.scss'
import { Link } from "react-router-dom";
export default function Folders({ data }) {
    const folderRender = () => {
        if (data.folders !== undefined) {
            return Object.values(data.folders).map((folder) => {
                return (
                    <Link to={`/folder/${folder.id}`} key={folder.id}  className="folder-block">
                        <i className="fas fa-folder"></i>
                        <h5>{folder.name}</h5>
                    </Link>
                )
            })
        }
    }
    return (
        <div className='folders'>
            <h2>Folders</h2>
            <div className='card-deck' style={{ display: "flex" }}>
                {folderRender()}
            </div>
        </div>
    )
}
