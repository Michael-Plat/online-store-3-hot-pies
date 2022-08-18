import React from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import { setSearchValue } from '../../redux/slice/filterSlice';
import imgSearch from '../../assets/img/search_site.svg';
import imgClear from '../../assets/img/clear_text.svg';
import styles from './Search.module.scss';

export default function Search() {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();

  const updeteSearchValue = React.useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updeteSearchValue(event.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current.focus();
  };

  return (
    <div className={styles.root}>
      <img src={imgSearch} alt="Search" />
      <input ref={inputRef} value={value} onChange={onChangeInput} placeholder="Поиск пирогов..." />
      {value && (
        <img onClick={onClickClear} className={styles.clearImg} src={imgClear} alt="Clear text" />
      )}
    </div>
  );
}
