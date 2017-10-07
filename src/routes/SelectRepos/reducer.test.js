import * as actions from './actions';
import reducer, { initialState } from './reducer';

describe('SelectRepos reducer', () => {
  it('should return same state when no action matches', () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  describe('watchedRepos', () => {
    const data = [
      {
        name: 'Atticus_Legal',
        id: 'MDEwOlJlcG9zaXRvcnk3MDk0NTE5Ng==',
      },
      {
        name: 'minesweeper',
        id: 'MDEwOlJlcG9zaXRvcnk3Mjc1NzkxNg==',
      },
      {
        name: 'test1',
        id: 'testid1==',
      },
      {
        name: 'test2',
        id: 'testid2==',
      },
    ];
    it('Saves watchedRepos data', () => {
      const baseState = {
        ...initialState,
        githubError: 'error',
      };

      const expectedState = {
        ...baseState,
        watchedRepos: data,
        githubError: null,
      };

      const newState = reducer(
        baseState,
        actions.requestWatchedReposSuccess(data),
      );
      expect(newState).toEqual(expectedState);
    });
    describe('when watched repos does not return a repo that is in selected repos', () => {
      it('removes the lost repo from the selectedRepos', () => {
        const baseState = {
          ...initialState,
          githubError: 'error',
          selectedRepos: ['MDEwOlJlcG9zaXRvcnk3MDk0NTE5Ng==', 'lostRepo'],
        };
        const expectedState = {
          ...baseState,
          watchedRepos: data,
          githubError: null,
          selectedRepos: ['MDEwOlJlcG9zaXRvcnk3MDk0NTE5Ng=='],
        };
        const newState = reducer(
          baseState,
          actions.requestWatchedReposSuccess(data),
        );
        expect(newState).toEqual(expectedState);
      });
    });
  });
  describe('Request watchedRepos failure', () => {
    it('Saves github failure error', () => {
      const error = 'error';
      const expectedState = {
        ...initialState,
        githubError: error,
      };

      const newState = reducer(
        initialState,
        actions.requestWatchedReposFail(error),
      );
      expect(newState).toEqual(expectedState);
    });
  });
  describe('selectedRepos', () => {
    describe('toggle repo selection', () => {
      describe('when repo is not selected', () => {
        it('adds repo to selectedRepos', () => {
          const id = 'testId';
          const expectedState = {
            ...initialState,
            selectedRepos: [id],
          };
          const newState = reducer(
            initialState,
            actions.toggleRepoSelection(id),
          );
          expect(newState).toEqual(expectedState);
        });
      });
      describe('when repo is already selected', () => {
        it('adds repo to selectedRepos', () => {
          const id = 'testId';
          const baseState = {
            ...initialState,
            selectedRepos: [id],
          };
          const expectedState = {
            ...baseState,
            selectedRepos: [],
          };
          const newState = reducer(baseState, actions.toggleRepoSelection(id));
          expect(newState).toEqual(expectedState);
        });
      });
    });
  });
  describe('repoFilterValue', () => {
    it('saves repo filter value to state', () => {
      const filterValue = 'value';
      const baseState = {
        ...initialState,
      };
      const expectedState = {
        ...initialState,
        repoFilterValue: filterValue,
      };
      const newState = reducer(
        baseState,
        actions.saveRepoFilterValue(filterValue),
      );
      expect(newState).toEqual(expectedState);
    });
  });
});
