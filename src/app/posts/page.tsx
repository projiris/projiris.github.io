import { Inter } from 'next/font/google'
import {PageContainer} from "@/components/layout/PageContainer";
import {PostsAndCategories} from "@/components/layout/PostsAndCategories";
// import {useAppState} from "@/hooks/useAppState";

//const inter = Inter({ subsets: ['latin'] })
import {DRIVE_DASHBOARD_ID} from "@/constants";
import {Drive} from "@/lib/drive";
import {ArticlesAndCategories} from "@/hooks/types";
import {Panels} from "@/types";
// import {useCategoriesAndArticles} from "@/hooks/useCategoriesAndArticles";
async function fetchCategories() {
    const [getCategoriesAndArticlesError, response] =
        await Drive.fetchCategories(DRIVE_DASHBOARD_ID)
    if (getCategoriesAndArticlesError) {
        throw getCategoriesAndArticlesError
    }
    return response as ArticlesAndCategories
    // setCategoriesAndArticles({ categories, articles })
}

export default async function Posts() {
  const { categories, articles } = await fetchCategories()
  return (
      <PageContainer
          title="Projiris"
          subtitle="Project management and risk analysis"
          description=""
          sidebarImage='/assets/default-sidebar.jpg'
          showLinks={true}
          articles={articles}
          categories={categories}
          isMenuVisible={false}
      >
        <PostsAndCategories articles={articles} categories={categories} activePanel={Panels.POSTS} />
      </PageContainer>
  )
}

/*
export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
*/