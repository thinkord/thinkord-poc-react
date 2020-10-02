import React, { useContext, useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "react-router-dom"
import { StoreContext } from '../context'
import Collection from '../components/Collection/Collection'


const useStyle = makeStyles((theme) => ({
    root: {
        display: 'flex',
        minHeight: '100vh',
        background: 'grey'
    }
}))
const Work = ({ match }) => {
    console.log(match)
    const classes = useStyle()
    const [collectionId] = useState(match.params.id)
    const context = useContext(StoreContext)
    const { getCollection } = context

    const collection = getCollection(collectionId)

    return (
        <div className={classes.root}>
            <Link className="App-link" to="/">Link to Home</Link>
            <Collection collection={collection} key={collectionId} />
        </div>
    )
}

export default Work