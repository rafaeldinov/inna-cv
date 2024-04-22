import Link from 'next/link';
import { AppRoute } from '../../const';
import { Item, PostType } from '../../../types/post-type';
import styles from './page.module.scss';
import RenderCaseItem from '../../../components/render-case-item/render-case-item';
import getPost from '@/api-actions/get-post';

export default async function Case({ params }: { params: { caseId: string } }) {
  const { caseId } = params;

  const post: PostType = await getPost(caseId);

  return (
    <div>
      <main className={styles.case_main}>
        <section className={styles.case}>
          <Link className={styles.link__back} href={AppRoute.Work}>
            All Cases
          </Link>

          {post && (
            <div className={styles.case__wrapper}>
              <div className={styles.case__header}>
                <h3 className={styles.case__title}>{post.title}</h3>
                <p className={styles.case__description}>{post.description}</p>
              </div>
              {post.items &&
                post.items.map((item: Item) => {
                  return (
                    <div className={styles.wrapper} key={item._id}>
                      <RenderCaseItem
                        type={item.type}
                        text={item.text}
                        src={item.src}
                      />
                    </div>
                  );
                })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
