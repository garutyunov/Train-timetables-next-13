import Trains from './Trains';
import { api } from './api';
import { Stations, StationsEnum } from '../../../types/types';
import FilterRSC from './FilterRSC';
import { revalidatePath } from 'next/cache';

let filter = '';

async function getTrains(station: Stations) {
  let arrivalsRes;
  let departuresRes;

  if (station === StationsEnum.BASEL) {
    [arrivalsRes, departuresRes] = await Promise.all([
      fetch(api.arrivalBasel).then((res) => res.json()),
      fetch(api.departuresBasel).then((res) => res.json())
    ]);
  }
  if (station === StationsEnum.GENEVA) {
    [arrivalsRes, departuresRes] = await Promise.all([
      fetch(api.arrivalGeneva).then((res) => res.json()),
      fetch(api.departuresGeneva).then((res) => res.json())
    ]);
  }

  return {
    arrivals: arrivalsRes.stationboard
      .filter((train) => train.stop.prognosis.arrival)
      .map((train, index) => ({
        date: new Date(train.stop.prognosis.arrival).toLocaleString(),
        destination: train.to,
        id: index
      })),
    departures: departuresRes.stationboard
      .filter((train) => train.stop.prognosis.departure)
      .map((train) => ({
        date: new Date(train.stop.prognosis.departure).toLocaleString(),
        destination: train.to
      }))
  };
}

type Props = {
  params: {
    station: Stations | null;
  };
};

export default async function TrainsPage({ params }: Props) {
  if (
    params.station !== StationsEnum.BASEL &&
    params.station !== StationsEnum.GENEVA
  ) {
    return null;
  }

  // Server Actions
  async function applyFilter(data: FormData) {
    'use server';

    filter = data.get('filter') as string;
    revalidatePath('/');
  }

  let { arrivals, departures } = await getTrains(params.station);

  if (filter) {
    arrivals = arrivals.filter((train) => train.destination.includes(filter));
    departures = departures.filter((train) =>
      train.destination.includes(filter)
    );
  }

  return (
    <div>
      <h1>Station/{params.station}</h1>
      <Trains arrivals={arrivals} departures={departures}>
        <FilterRSC applyFilter={applyFilter} search={filter} />
      </Trains>
    </div>
  );
}
