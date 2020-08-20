import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

import UserProvider from '../../../contexts/UserContext';
// Components
import Header from './Header';
import Person_Friends from './Person_Friends';
import AddArticle from './AddArticle';
import ArticleWrapper from './ArticleWrapper';
import Article from './Article';
import Person from '../../person/components/Person';

export default function Main(props) {
    return (
        <UserProvider>
            <Header />
            {/* <Link to="/person">Person</Link> */}
            <Link className="d-none" to="/">Main</Link>
            <Switch>
                <Route exact path="/">
                    <Container className="py-3">
                        <Row>
                            <Col sm="12" lg="8">
                                <AddArticle />
                                <ArticleWrapper>
                                    {
                                        article => <Article article={article} />
                                    }
                                </ArticleWrapper>
                            </Col>

                            <Col className="d-none d-lg-block" lg="4">
                                <Person_Friends />
                            </Col>
                        </Row>
                    </Container>
                </Route>
                <Route path="/person/:_userId" component={Person} />
            </Switch>
        </UserProvider>
    );
}