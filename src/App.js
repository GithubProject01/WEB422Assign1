import React, { useState } from 'react';
import NotFound from './NotFound';
import Sale from './Sale';
import Sales from './Sales';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { Link, Switch, Redirect, Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';


function App() {
  const[recentlyViewed, setRecentlyViewed]= useState([]);
  const[searchId, setSearchId]= useState("");

  function viewedSale(id){
    var allRecentlyViewed=recentlyViewed;
    if(recentlyViewed.indexOf(id) === -1) {
      allRecentlyViewed.push(id);
     }
     setRecentlyViewed(allRecentlyViewed);
  }

  function updateSearchId(e){
    setSearchId( e.target.value);
  }
  return (
    <>
    <div>
      <Navbar inverse collapseOnSelect staticTop>
      <Navbar.Header>
      <LinkContainer to="/">
      <Navbar.Brand>
      WEB422 - Sales
      </Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
      <Nav>
      <LinkContainer to="/Sales">
      <NavItem>All Sales</NavItem>
      </LinkContainer>
      <NavDropdown title="Previously Viewed" id="basic-nav-dropdown">
      {recentlyViewed.length > 0 ?
      recentlyViewed.map((id, index)=>(
      <LinkContainer to={`/Sale/${id}`} key={index}>
      <MenuItem >Sale: {id}</MenuItem>
      </LinkContainer> )) :
      <MenuItem>...</MenuItem>}
      </NavDropdown>
      </Nav>
      <Navbar.Form pullRight>
      <FormGroup>
      <FormControl type="text" onChange={updateSearchId} placeholder="Sale ID" />
      </FormGroup>{' '}
      <Link className="btn btn-default" to={"/Sale/" + searchId}>Search</Link>
      </Navbar.Form>
      </Navbar.Collapse>
      </Navbar>
      </div>
      <Grid>
        <Row>
          <Col md={12}>
            <Switch>
              <Route exact path="/" render={
                ()=>
                <Redirect push to={"/Sales"}/>
              }/>  
              <Route exact path ="/Sales" render={()=>
                <Sales />
              }/>
              <Route path="/Sale/:id" render={(props)=>(
                <Sale id={props.match.params.id} viewedSale = {viewedSale} />
              )} />
              <Route render={()=>(
                <NotFound />
              )} />
            </Switch>
          </Col>
        </Row>
        
        </Grid>
    </>
  );
              }
export default App