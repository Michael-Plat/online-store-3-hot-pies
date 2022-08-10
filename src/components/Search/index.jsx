import React from 'react';
import debounce from 'lodash.debounce';

import { SearchPie } from '../../App';
import imgSearch from '../../assets/img/search_site.svg';
import imgClear from '../../assets/img/clear_text.svg';
import styles from './Search.module.scss';

export default function Search() {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchPie);
  const inputRef = React.useRef();

  const updeteSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 350),
    [],
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updeteSearchValue(event.target.value);
  };

  const onClickClear = () => {
    setSearchValue('');
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
