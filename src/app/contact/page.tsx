import styles from './page.module.css'
import { PageContainer } from "@/components/layout/PageContainer"
import Link from "next/link";
import {fetchCategories} from "@/lib/categories";
import {ContactForm} from "@/components/form/Contact";

export default async function Contact () {
    const { categories, articles } = await fetchCategories()

    return <PageContainer
            title="Contact"
            subtitle="Get in touch with us"
            description=""
            sidebarImage={'/assets/default-Contact.jpg'}
            articles={articles}
            categories={categories}
        >
            <h3 className={styles.contactTitle}>Send us an email</h3>
            <ContactForm />
            <footer className={styles.footer}>
                <Link
                    href={('/about')}
                    className={styles.contact}
                >
                    About
                </Link>
            </footer>
        </PageContainer>
}
