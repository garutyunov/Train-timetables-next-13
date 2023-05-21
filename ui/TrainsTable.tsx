import {Train} from "../types/types";
import styles from "../styles/table.module.scss";

type Props = {
  trains: Train[]
}

const TrainsTable = ({ trains }: Props) => (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Destination</th>
        </tr>
      </thead>
      <tbody>
        {trains.map((train, index) => (
          <tr key={index}>
            <td>{train.date}</td>
            <td>{train.destination}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

export default TrainsTable;
