'use client';

import {usePathname, useRouter} from 'next/navigation';
import styles from '../styles/radio.module.scss';


const TypeTrainControl = () => {
  const inverted = {
    arrivals: 'departures',
    departures: 'arrivals'
  }
  const router = useRouter();
  const pathname = usePathname();
  const onChangeTypeTrains = (event) => {
    const path = pathname.replace(inverted[event.currentTarget.value], event.currentTarget.value)
    router.push(path);
  };

  const isArrivals = pathname.includes('/arrivals');
  return (
    <div className={styles.radio}>
      <div>
        <input
          id="arrivals"
          type="checkbox"
          value="arrivals"
          checked={isArrivals}
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
          checked={!isArrivals}
          name="station"
          onChange={onChangeTypeTrains}
        />
        <label htmlFor="departures">departures</label>
      </div>
    </div>
  );
};

export default TypeTrainControl;
