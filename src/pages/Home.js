import React, { useContext, useState, useEffect } from 'react';
// import WindowTitlebar from '../components/WindowTitlebar/WindowTitlebar';
import NoteCard from '../components/NoteCard/NoteCard';
import classes from './Home.module.css';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom'
import { StoreContext } from '../context'
import InputContainer from '../components/Input/InputContainer'
import appRuntime from '../appRuntime'


function App() {
  const context = useContext(StoreContext)
  const { data } = context

  useEffect(() => {
    
  })

  return (
    <React.Fragment>
      <CssBaseline />
      {/* <WindowTitlebar docTitle="Home"/> */}
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            <div onClick={()=>{appRuntime.send('main','hello')}}>Thinkord</div>
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <InputContainer type="collection" />
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.collectionIds.map((collectionId) => (
                      {data.collections[collectionId].title}
                      <Link to={`/work/${collectionId}`} onClick={() => { appRuntime.send('controlbar','hello') }}>Keep recording</Link>
                      <Link to={`/work/${collectionId}`} className="App-link" onClick={() => { appRuntime.send('audio','hello') }}>Edit</Link>
                      <NoteCard
                          key={note.id}
                          index={this.state.collections.indexOf(note)}
                          file={note}
                      ></NoteCard>
            ))}
          </Grid>
        </Container>
      </main>

    </React.Fragment>
  );
}

export default App;
