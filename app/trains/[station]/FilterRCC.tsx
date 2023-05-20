'use client';

import styles from './trains.module.scss';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const FilterRCC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState<string>(
    searchParams.get('filter') || ''
  );

  const onFilerClick = () => {
    router.push(`${pathname}?filter=${filter}`);
  };

  return (
    <div className={styles.filter}>
      <input
        type="text"
        onChange={(event) => {
          setFilter(event.currentTarget.value);
        }}
        value={filter}
      />
      <button onClick={onFilerClick}>Filter</button>
    </div>
  );
};

export default FilterRCC;
