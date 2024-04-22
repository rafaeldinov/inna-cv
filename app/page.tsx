import type { Metadata } from 'next';
import styles from './page.module.scss';
import dynamic from 'next/dynamic';
import Loader from './loading';

const Banner = dynamic(() => import('@/components/banner/banner'), {});
const Filters = dynamic(() => import('@/components/filters/filters'), {
  ssr: false,
});
const PaginationRounded = dynamic(
  () => import('@/components/pagination/pagination'),
  {
    ssr: false,
  }
);
const Cards = dynamic(() => import('@/components/cards/cards'), {
  loading: () => <Loader />,
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Work',
};

export default async function Work() {
  return (
    <div>
      <main className={styles.main}>
        <Banner />
        <div className={styles.main__pagination_filters}>
          <Filters />
          <PaginationRounded />
        </div>

        <div className={styles.cards}>
          <Cards />
        </div>
      </main>
    </div>
  );
}
