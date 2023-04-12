import {PageContainer} from "@/components/layout/PageContainer";
import styles from './page.module.css'
import Link from "next/link";

export default function Page () {
    return (
        <PageContainer title="About"
                       subtitle="We help your projects complete in time."
                       description="Since 2003."
                       sidebarImage='/assets/default-about.jpg'
                       showLinks={false}>
            <div className={styles.aboutContent}>
                <img
                    src='/assets/nigeria.jpg'
                    className={styles.image}
                />
                <div>
                    <h1 className={styles.infoTitle}>Technological projects consultancy</h1>
                    <p className={styles.para}>
                        We provide engineering excellence to enable high-complex technological projects to materialize while managing cost, quality, and schedule constraints.
                    </p>
                    <p className={styles.para}>
                        Over 10 years of experience with oil & gas, nuclear, and Information Technology projects.
                    </p>
                </div>
            </div>

            <footer className={styles.footer}>
                <Link
                    href="/contact"
                    className={styles.contact}
                >
                    Contact
                </Link>
            </footer>
        </PageContainer>
    )
}