'use client';

import styles from './filters.module.scss';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Area } from '@/app/const';
import { useRef, useState } from 'react';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { usePostsStore } from '@/store/posts-store';

export default function Filters() {
  const filtersRef = useRef<string[]>([]);
  const [isHide, setIsHide] = useState(true);

  const setFilters = usePostsStore((state) => state.setFilters);
  const setCurrentPage = usePostsStore((state) => state.setCurrentPage);
  const isLoading = usePostsStore((state) => state.isLoading);

  const handleOpenCloseFiltersClick = () => setIsHide(!isHide);

  const handleFilterChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = evt.target.checked;
    const filter = evt.target.value;

    if (isChecked) {
      filtersRef.current.push(filter);

      return setFilters(filtersRef.current);
    }
    const modifiedFilters = filtersRef.current.filter(
      (item) => item !== filter
    );
    filtersRef.current = modifiedFilters;
    setFilters(modifiedFilters);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filters__accordion}>
        <button
          onClick={handleOpenCloseFiltersClick}
          className={styles.filters__accordion_toggle}
          type='button'
        >
          <span>industries</span>
          {isHide ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </button>

        <div
          className={
            isHide
              ? `${styles.filters__list} ${styles.hide}`
              : styles.filters__list
          }
        >
          {Object.values(Area).map((area, index) => {
            return (
              <FormControlLabel
                className={styles.filter}
                key={area + index}
                control={
                  <Checkbox
                    onChange={handleFilterChange}
                    disabled={isLoading}
                  />
                }
                label={area}
                value={area}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
