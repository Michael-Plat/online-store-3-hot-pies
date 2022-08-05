import React from 'react';

import styles from './NotFound.module.scss';
import logoNotFound from '../../assets/img/smile-not_found.png';

export default function NotFound() {
  return (
    <div className={styles.root}>
      <img src={logoNotFound} alt="Smile" />
      <h1>Not Found Page :(</h1>
      <p>К сожелению данной страцы нет, в нашем интренет-магазине.</p>
    </div>
  );
}
