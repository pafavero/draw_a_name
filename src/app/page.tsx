"use client"
import { useState} from 'react'
import Image from "next/image";
import styles from "./page.module.css";
import SelAName from "@/components/sel_a_name";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    
  
  
  const [selIndex, setSelIndex] = useState<number | null>(null);

  const selOnClickEvent = (index: number) =>{
    console.log("Halli hallo2!!!", index);
    setSelIndex(index);
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        
      </div>

      <div className={styles.center}>
        <p>Draw a name from a list. The draw takes into account the results of previous times. Thus, all names are drawn over time.</p>
        <p>Today the following name has been selected: {selIndex?selIndex + 1:'NO SELECTION'}</p>
        <h3>Drawn names</h3>
        <p>Select a name between the name drawn</p>
        <SelAName setSelIndex={selOnClickEvent} />
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
