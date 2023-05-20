'use client';

import { useState } from 'react';
import TrainsTable from './TrainsTable';
import { TableType, Train } from '../../../types/types';
import TypeTrainControl from './TypeTrainControl';

type Props = {
  arrivals: Train[];
  departures: Train[];
};

const Trains = ({ arrivals, departures, children }: Props) => {
  const [type, setType] = useState<TableType.ARRIVALS | TableType.DEPARTURES>(
    TableType.ARRIVALS
  );

  const onChangeTypeTrains = (event) => {
    setType(event.currentTarget.value);
  };

  return (
    <div>
      <TypeTrainControl onChangeTypeTrains={onChangeTypeTrains} type={type} />
      {children}
      <TrainsTable
        trains={type === TableType.DEPARTURES ? departures : arrivals}
      />
    </div>
  );
};

export default Trains;
