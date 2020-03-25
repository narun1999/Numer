import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Router,Route,browserHistory} from 'react-router';
import Bisection from './Root_of_equation/Bisection';
import False_Position from './Root_of_equation/False_Position';
import One_Point from './Root_of_equation/One_Point';
import Newton_Raphson from './Root_of_equation/Newton_Raphson';
import Secant from './Root_of_equation/Secant';
import Cramer from './Linear_Algebra/Cramer';
import Gauss from './Linear_Algebra/Gauss';
import Jordan from './Linear_Algebra/Jordan';
import LU from './Linear_Algebra/LU';
import Cholesky from './Linear_Algebra/Cholesky';
import Newton from './Interpolation/Newton';
import Langrange from './Interpolation/Langrange';
import Trapezoidal from './Intergration/Trapezoidal';
import CompositeTrapezoidal from './Intergration/CompositeTrapezoidal';
import Simpson from './Intergration/Simspson';
import CompositeSimpson from './Intergration/CompositeSimpson';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/bisection" component={Bisection}/>
        <Route path="/false_position" component={False_Position}/>
        <Route path="/one_point" component={One_Point}/>
        <Route path="/newton_raphson" component={Newton_Raphson}/>
        <Route path="/secant" component={Secant}/>
        <Route path="/cramer" component={Cramer}/>
        <Route path="/gauss" component={Gauss}/>
        <Route path="/jordan" component={Jordan}/>
        <Route path="/lu" component={LU}/>
        <Route path="/cholesky" component={Cholesky}/>
        <Route path="/newton" component={Newton}/>
        <Route path="/langrange" component={Langrange}/>
        <Route path="/trape" component={Trapezoidal}/>
        <Route path="/comptrape" component={CompositeTrapezoidal}/>
        <Route path="/simpson" component={Simpson}/>
        <Route path="/compsimp" component={CompositeSimpson}/>
    </Router>,document.getElementById('root')
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
