import {compose, createStore , applyMiddleware} from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root-reducer';
// i used configure store instead of createStore becauase that last one is deprecated

const middlewares = [logger];

const composedEnhancers = compose(applyMiddleware(...middlewares))


export const store = createStore(rootReducer, undefined, composedEnhancers);