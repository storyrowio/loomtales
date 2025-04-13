import "./globals.css";
import BaseLayout from "layouts/BaseLayout";

import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
    weight: ['400', '500', '600', '700', '800'],
    style: ['normal', 'italic'],
    subsets: ["latin"],
});

export const metadata = {
    title: "Loomtales",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
            <title>Loomtales</title>
        </head>
        <body className={plusJakarta.className}>
        <BaseLayout>
            {children}
        </BaseLayout>
        </body>
        </html>
    );
}
