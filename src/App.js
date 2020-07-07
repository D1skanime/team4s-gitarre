import React from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import HomePage from './pages/homepage/homepage.components';
import ShopPage from './pages/shop/shop.components';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.components';
import Header from './components/header/header.componet';
import {auth, creatUserProfileDocument} from './firebase/firebase.utils';
import {setCurrentUser} from './redux/user/user.action';



class App extends React.Component {
  
// Methide um sich einzuloggen und mit unsubscribe um sich auszuloggen
// welches als funktion zum schliessen an umnount will zurück gegeben wird 
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await creatUserProfileDocument(userAuth);

        userRef.onSnapshot(onSnapshot => {
          this.props.setCurrentUser({
              id: onSnapshot.id,
              ...onSnapshot.data()
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  render () {
    return (
      <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignInAndSignUpPage} />
      </Switch>
    </div>
    );

  }
  
}


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))

})

export default connect(null, mapDispatchToProps)(App);
