import Image from "next/image";
import styles from "./page.module.css";
import MainContainer from "@/components/main_container";
import 'bootstrap/dist/css/bootstrap.min.css';
import { promises as fs } from 'fs';

export default async function Home() {
  // read the file server-side but async!
  const fileContent = await fs.readFile(process.cwd() + '/public/initial_list.txt', 'utf8');
  const initialList = fileContent.split(',');
  console.log('fileContent', fileContent, initialList);

  const results = await fs.readFile(process.cwd() + '/public/results.json', 'utf8');
  const jsonResult = JSON.parse(results);
  console.log('jsonResult', jsonResult);

  const currResult = null;

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        
      </div>

      <div className={styles.center}>
        <MainContainer initialList={initialList} currResult={currResult} />
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
          <p>Explore starter templates for Next.js.</p>
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
  );
}
