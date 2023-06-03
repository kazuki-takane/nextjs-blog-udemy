import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Layout, { siteTitle } from '@/components/Layout'
import utilStyles from '../styles/utils.module.css';
import { getPostsData } from '../lib/post';

const inter = Inter({ subsets: ['latin'] })

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData();
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    }
  };
};

//SSRの場合
// export async function getServerSideProps(context) {

//   return {
//     props: {
//       //コンポーネントに渡すためのprops
//     }
//   };
// };

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>十種競技野郎です。</p>
      </section>
      <section>
        <h2>十種競技野郎BLOG</h2>
        <div className={styles.grid}>
          {allPostsData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img
                  src={thumbnail}
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${id}`} className={utilStyles.boldText}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  )
}
