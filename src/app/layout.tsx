import type { Metadata } from 'next';
import '../styles/globals.scss';

export const metadata: Metadata = {
  title: 'NHOF',
  icons: { icon: '/nhof-favicon.png' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=0" />
        <link href="https://fonts.googleapis.com/css?family=Barlow:300|Forum" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
