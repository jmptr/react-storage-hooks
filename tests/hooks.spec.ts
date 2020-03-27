import { renderHook } from '@testing-library/react-hooks';
import {
  useLocalStorageProp,
} from '../src/index';

describe('useLocalStorageProp', () => {
  beforeEach(() => {
    window.localStorage.setItem('foo', 'bar');
  });
  afterEach(() => {
    window.localStorage.removeItem('foo');
  });
  it('should render the value in local storage', () => {
    const { result } = renderHook(() => useLocalStorageProp('foo'));
    expect(result.current).toBe('bar');
  });
});
