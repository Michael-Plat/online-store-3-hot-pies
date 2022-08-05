import React from 'react';

import imgSearch from '../../assets/img/search_site.svg';
import imgClear from '../../assets/img/clear_text.svg';
import styles from './Search.module.scss';

export default function Search({ searchValue, setSearchValue }) {
  return (
    <div className={styles.root}>
      <img src={imgSearch} alt="Search" />
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="Поиск пирогов..."
      />
      {searchValue && (
        <img
          onClick={() => setSearchValue('')}
          className={styles.clearImg}
          src={imgClear}
          alt="Clear text"
        />
      )}
    </div>
  );
}
