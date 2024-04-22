import type { Metadata } from 'next';
import Image from 'next/image';
import styles from './page.module.scss';
import tbwa from '../../public/images/agencies/tbwa.svg';
import maccann from '../../public/images/agencies/mccann.svg';
import mullenlowe from '../../public/images/agencies/mullenlowe.svg';
import twiga from '../../public/images/agencies/twiga.svg';
import publicis from '../../public/images/agencies/publicis.png';
import effie from '../../public/images/awards/effie-awards.svg';
import wowDone from '../../public/images/awards/wow-done-2018.svg';

export const metadata: Metadata = {
  title: 'About me',
};

export default async function About() {
  return (
    <div>
      <main className={styles.about_wrapper}>
        <div className={styles.about__bio}>
          <div className={styles.about__image_wrapper}>
            <Image
              className={styles.about__image}
              src='https://files.edgestore.dev/vh00l46smm3hlf5y/publicFiles/_public/admin/120a122e-e8b8-4ba6-93fb-bdefd085fa66.jpg'
              width={1821}
              height={1766}
              alt='Inna image'
              sizes='100%'
              priority
            />
          </div>

          <div className={styles.about__bio_text}>
            <h2 className={styles.about__bio_title}>Inna Dinova</h2>
            <p>21 years of experience in writing commercial texts.</p>
            <p>11 years of experience in international agencies.</p>
            <p>
              Working as an independent creator and helping brands in promo
              campaigns, HR educational campaigns, B2B, B2C advertising, digital
              campaigns, events etc.
            </p>
          </div>
        </div>
        <div className={styles.about__agencies}>
          <h3 className={styles.about__agencies_title}>AGENCIES:</h3>
          <ul className={styles.about__agencies_list}>
            <li className={styles.about__agencies_image_wrapper}>
              <Image
                className={styles.about__image}
                src={tbwa.src}
                alt='agency image'
                priority
                fill
                sizes='100%'
              />
            </li>
            <li className={styles.about__agencies_image_wrapper}>
              <Image
                className={styles.about__image}
                src={maccann.src}
                alt='agency image'
                priority
                fill
                sizes='100%'
              />
            </li>
            <li className={styles.about__agencies_image_wrapper}>
              <Image
                className={styles.about__image}
                src={mullenlowe.src}
                alt='agency image'
                priority
                fill
                sizes='100%'
              />
            </li>
            <li className={styles.about__agencies_image_wrapper}>
              <Image
                className={styles.about__image}
                src={twiga.src}
                alt='agency image'
                priority
                fill
                sizes='100%'
              />
            </li>
            <li className={styles.about__agencies_image_wrapper}>
              <Image
                className={styles.about__image}
                src={publicis.src}
                alt='agency image'
                priority
                fill
                sizes='100%'
              />
            </li>
          </ul>
        </div>
        <div className={styles.about__awards_wrapper}>
          <h3 className={styles.about__awards_title}>AWARDS:</h3>
          <div className={styles.about__awards}>
            <div
              className={`${styles.about__awards_item} ${styles.about__awards_item_underline}`}
            >
              <div className={styles.about__agencies_image_wrapper}>
                <Image
                  className={styles.about__image}
                  src={effie.src}
                  alt='award image'
                  priority
                  fill
                  sizes='100%'
                />
              </div>
              <div className={styles.about__awards_list}>
                <p className={styles.about__awards_list_item}>
                  Bronze 2009 - UkrSibbank
                </p>
                <p className={styles.about__awards_list_item}>
                  Gold,Silver 2017 - NashKyiv
                </p>
                <p className={styles.about__awards_list_item}>
                  Silver 2018 - PUMB
                </p>
                <p className={styles.about__awards_list_item}>
                  Bronze 2018 - Hansa
                </p>
              </div>
            </div>
            <div className={styles.about__awards_item}>
              <div className={styles.about__agencies_image_wrapper}>
                <Image
                  className={styles.about__image}
                  src={wowDone.src}
                  alt='award image'
                  priority
                  fill
                  sizes='100%'
                />
              </div>
              <div className={styles.about__awards_list}>
                <p>Wow Done Award 2018 - PUMB</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.about__brands}>
          <div className={styles.about__image_wrapper}>
            <Image
              className={styles.about__image}
              src='https://files.edgestore.dev/vh00l46smm3hlf5y/publicFiles/_public/admin/97dfceee-ac47-4557-a206-3a5e02a94cf8.png'
              alt='Inna image'
              priority
              width={5000}
              height={8647}
              sizes='100%'
            />
          </div>
          <div className={styles.about__image_wrapper}>
            <Image
              className={styles.about__image}
              src='https://files.edgestore.dev/vh00l46smm3hlf5y/publicFiles/_public/admin/9cc747f9-4d01-4e25-9e72-1255edf7da6e.png'
              alt='Inna image'
              width={5000}
              height={8647}
              sizes='100%'
              loading='lazy'
            />
          </div>
        </div>
      </main>
    </div>
  );
}
