import styles from './page.module.css';
import MainContainer from '@/components/main_container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { promises as fs } from 'fs';

export default async function Home() {
  // read the file server-side but async!
  const fileContent = await fs.readFile(process.cwd() + '/public/initial_list.txt', 'utf8');
  // const initialList: string = fileContent.split(',');
  // console.log('fileContent', fileContent, initialList);

  const results = await fs.readFile(process.cwd() + '/public/results.json', 'utf8');
  const jsonResult = JSON.parse(results);
  // it is print on the server, no in browser console
  // console.log('jsonResult', jsonResult);

  const currResult = null;

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        
      </div>

      <div className={styles.center}>
        <MainContainer initialList={fileContent} currResult={currResult} />
      </div>
     
    </main>
  );
}
