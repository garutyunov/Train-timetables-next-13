'use client';

import { ChangeEvent } from 'react';
import styles from './trains.module.scss';
import { TableType } from '../../../types/types';

type Props = {
  type: TableType.ARRIVALS | TableType.DEPARTURES;
  onChangeTypeTrains: (e: ChangeEvent<HTMLInputElement>) => void;
};
const TypeTrainControl = ({ type, onChangeTypeTrains }: Props) => (
    <div className={styles.radio}>
      <div>
        <input
          id="arrivals"
          type="checkbox"
          value="arrivals"
          checked={type === TableType.ARRIVALS}
          name="station"
          onChange={onChangeTypeTrains}
        />
        <label htmlFor="arrivals">arrivals</label>
      </div>
      <div>
        <input
          id="departures"
          type="checkbox"
          value="departures"
          checked={type === TableType.DEPARTURES}
          name="station"
          onChange={onChangeTypeTrains}
        />
        <label htmlFor="departures">departures</label>
      </div>
    </div>
  );

export default TypeTrainControl;
