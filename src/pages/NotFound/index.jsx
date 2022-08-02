import React from 'react';

import styles from './NotFound.module.scss';
import logoNotFound from '../../assets/img/smile-not_found.png';

export default function NotFound() {
  return (
    <div className={styles.root}>
      <img src={logoNotFound} />
      <h1>Not Found Page :(</h1>
      <p>К сожелению данной страци нет, в нашем интренет-магазине.</p>
    </div>
  );
}
