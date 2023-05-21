import { api } from '../../../../api/api';
import { Stations, StationsEnum, TableType } from '../../../../types/types';
import Filter from '../../../../ui/Filter';
import { redirect } from 'next/navigation';
import TrainsTable from '../../../../ui/TrainsTable';

async function getTrains(
  station: Stations,
  type: TableType.DEPARTURES | TableType.ARRIVALS
) {
  let res;

  if (station === StationsEnum.BASEL) {
    if (type === TableType.ARRIVALS) {
      res = await fetch(api.arrivalBasel).then((res) => res.json());
    } else {
      res = await fetch(api.departuresBasel).then((res) => res.json());
    }
  }
  if (station === StationsEnum.GENEVA) {
    if (type === TableType.ARRIVALS) {
      res = await fetch(api.arrivalGeneva).then((res) => res.json());
    } else {
      res = await fetch(api.departuresGeneva).then((res) => res.json());
    }
  }

  const field = type === TableType.ARRIVALS ? 'arrival' : 'departure';

  return res.stationboard
    .filter((train) => train.stop.prognosis[field])
    .map((train, index) => ({
      date: new Date(train.stop.prognosis[field]).toLocaleString(),
      destination: train.to,
      id: index
    }));
}

type Props = {
  params: {
    station: Stations | null;
    type: TableType.DEPARTURES | TableType.ARRIVALS | null;
  };
};

export default async function TrainsPage({ params, searchParams }: Props) {
  const { station, type } = params;
  if (
    (station !== StationsEnum.BASEL && station !== StationsEnum.GENEVA) ||
    (type !== TableType.ARRIVALS && type !== TableType.DEPARTURES)
  ) {
    return null;
  }

  // Server Actions
  async function applyFilter(data: FormData) {
    'use server';

    const newFilter = data.get('filter') as string;
    const newPath = `/trains/${station}/${type}?filter=${newFilter}`;
    redirect(newPath);
  }

  const { filter } = searchParams;

  let arrivals = await getTrains(station, type);

  if (filter) {
    arrivals = arrivals.filter((train) => train.destination.includes(filter));
  }

  return (
    <div>
      <Filter
        applyFilter={applyFilter}
        search={filter}
        type={type}
        station={station}
      />
      <TrainsTable trains={arrivals} />
    </div>
  );
}
