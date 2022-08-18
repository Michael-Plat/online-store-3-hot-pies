import React from 'react';

import styles from './SignalError.module.scss';

export default function SignalError() {
  return (
    <div className={styles.root}>
      <h2>Произошла ошибка</h2>
      <p> К сожелению, НЕ удалось отоброзить страницу. Попробуйте повторить позже.</p>
    </div>
  );
}
