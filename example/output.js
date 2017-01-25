import { createSelector } from 'reselect-change-memoize';

const mySelector = createSelector('mySelector', state => state.example);
