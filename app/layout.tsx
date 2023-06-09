import './globals.css';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import styles from './page.module.scss';
import routes from '../constants/routes';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin']
});

export const metadata = {
  title: 'Haaretz Frontend Assignment',
  description: 'Haaretz Frontend Assignment using next 13'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <main className={styles.main}>
          <nav>
            <Link href="/">Home</Link>
            <Link href={{ pathname: `${routes.arrivalBasel}` }}>Basel</Link>
            <Link href={{ pathname: `${routes.arrivalGeneva}` }}>Geneva</Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
