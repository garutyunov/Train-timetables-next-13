import styles from './trains.module.scss';

type Props = {
  applyFilter: (data: FormData) => void;
  search: string;
};

const Filter = ({ applyFilter, search }: Props) => (
  <div className={styles.filter}>
    <form action={applyFilter}>
      <input type="text" name="filter" defaultValue={search} />
      <button type="submit">Filter</button>
    </form>
  </div>
);

export default Filter;
