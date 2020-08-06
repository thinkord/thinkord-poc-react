import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { StoreContext } from '../context'
import Collection from '../components/Collection/Collection'
import "./App.css"

const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        background: 'grey'
    }
}))
const Work = () => {
    const classes = useStyle()
    const context = useContext(StoreContext)
    const { data } = context

    return (
        <div className={classes.root}>
        
            <Link className="App-link" to="/">Link to Home</Link>

            {data.collectionIds.map((collectionId) => {
                const collection = data.collections[collectionId]
                return <Collection collection={collection} key={collectionId} />
            })}
        </div>
    )
}

export default Work