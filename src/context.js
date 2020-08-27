import React, { Component } from 'react'
import { v4 as uuid } from 'uuid'
import appRuntime from './appRuntime'
const StoreContext = React.createContext(null)


/*
 * [Please notice]
 * update data without mutating state: "using spread operator"
 * if you don't follow this rule, TimLo will kill it!
 * if you don't know spread operator: check this out
 * https://codeburst.io/javascript-the-spread-operator-a867a71668ca
 */

class StoreProvider extends Component {
    state = {
        data: {
            collections: {
                'new-1': {
                    id: 'new-1',
                    title: 'create your note',
                    blocks: [
                        {
                            id: 'block-1',
                            title: 'create block',
                            content: 'please enter some content'
                        }
                    ]
                }
            },
            collectionIds: []
        }
    }

    // Load the user's content
    componentDidMount(){
        appRuntime.send('loadFile')
        appRuntime.subscribe('loadComplete',(data)=>{
            data = JSON.parse(data)
            this.setState({
                data
            })
        })
    }


    saveCollection = ()=>{
        appRuntime.send('saveFile',JSON.stringify(this.state.data))
    }

    /**
     * 
     * @param {string} id 
     */
    getCollection = (id) => {
        const {data} = this.state
        return data.collections[id];
    }

    /**
     * 
     * @param {string} title 
     * @param {string} content 
     * @param {number} collectionId 
     */
    addBlock = (title, content, collectionId) => {
        const { data } = this.state
        const newBlockId = uuid()
        const newBlock = {
            id: newBlockId,
            title,
            content
        }
        const collection = data.collections[collectionId]
        collection.blocks = [...collection.blocks, newBlock]
        const newState = {
            ...data,
            collections: {
                ...data.collections,
                [collectionId]: collection
            }
        }
        this.setState({
            data: newState
        })
    }

    /**
     * 
     * @param {string} title 
     */
    addCollection = (title) => {
        const { data } = this.state
        const newCollectionId = uuid()
        const newCollection = {
            id: newCollectionId,
            title,
            blocks: []
        }

        const newState = {
            collectionIds: [...data.collectionIds, newCollectionId],
            collections: {
                ...data.collections,
                [newCollectionId]: newCollection
            }
        }

        this.setState({
            data: newState
        })
    }

    /**
     * 
     * @param {number} collectionId 
     * @param {number} index 
     */
    deleteBlock = (collectionId, index) => {
        const { data } = this.state
        const collection = data.collections[collectionId]
        collection.blocks = [...collection.blocks.slice(0, index), ...collection.blocks.slice(index + 1)]
        const newState = {
            ...data,
            collections: {
                ...data.collections,
                [collectionId]: collection
            }
        }
        this.setState({
            data: newState
        })
    }

    /**
     * 
     * @param {string} title
     * @param {number} collectionId 
     */
    updateCollectionTitle = (title, collectionId) => {
        const { data } = this.state
        const collection = data.collections[collectionId]
        collection.title = title
        const newState = {
            ...data,
            collections: {
                ...data.collections,
                [collectionId]: collection
            }
        }

        this.setState({
            data: newState
        })
    }

    /**
     * 
     * @param {string} title 
     * @param {number} collectionId 
     * @param {number} index 
     */
    updateBlockTitle = (title, collectionId, index) => {
        const { data } = this.state
        const collection = data.collections[collectionId]
        const blocks = collection.blocks
        const block = blocks[index]
        block.title = title
        const newState = {
            ...data,
            collections: {
                ...data.collections,
                [collectionId]: {
                    ...collection,
                    blocks
                }
            }
        }
        this.setState({
            data: newState
        })
    }
    render() {
        return (
            <StoreContext.Provider value={{
                ...this.state,
                addBlock: this.addBlock,
                deleteBlock: this.deleteBlock,
                updateBlockTitle: this.updateBlockTitle,
                updateCollectionTitle: this.updateCollectionTitle,
                addCollection: this.addCollection,
                getCollection: this.getCollection,
                saveCollection: this.saveCollection
            }}> 

                {this.props.children}
            </StoreContext.Provider>
        )
    }
}

const StoreConsumer = StoreContext.Consumer




export { StoreProvider, StoreConsumer, StoreContext }