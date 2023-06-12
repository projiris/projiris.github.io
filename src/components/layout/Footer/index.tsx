import {FunctionComponent} from "react";
import cn from "classnames";
import Link from 'next/link'
import Image from 'next/image'
import {FooterProps} from "@/components/layout/Footer/types";
import styles from './footer.module.css'
import {SITE_AUTHOR} from "@/constants";

export const Footer: FunctionComponent<FooterProps> = ({
    article = {},
    category = {},
    articles,
    isMenuVisible,
                       }) => {
    return <footer className={styles.footer}>
        <div className={cn(styles.footerTop, isMenuVisible && styles.topNarrow)}>
            <Link href="/about" title="About" className={styles.profileLink}>
                <Image
                    src={'/assets/profile-1.jpg'}
                    className={styles.profile}
                    alt="user-image"
                    width={60}
                    height={60}
                />
            </Link>
                <div
                    className={cn(
                    styles.credits,
                        isMenuVisible && styles.creditsNarrow
                )}
                    >
                <p className={styles.p}>
                    Published on the{" "}
                    <span className={styles.underline}>
                        {article.date}
                    </span>
                    {" "}by{" "}
                    <Link
                      href="/about"
                      title="About"
                      className={styles.blueLink}
                    >
                        {SITE_AUTHOR}
                    </Link>
                            {" "}in{" "}
                    <Link
                        href={category.uri as string}
                        title={category.title}
                        className={styles.blueLink}
                    >
                      {category.title}
                    </Link>
                </p>
        </div>

        <div className={styles.social}>
            <p className={styles.p}>Share this article</p>
            <div className={styles.socialLinks}>
                <a
                    className={styles.socialIcon}
                    href="#"
                    data-platform="twitter"
                    data-message="Message about this post"
                >
                    <i className="icon-twitter" />
                </a>

                <a
                    className={styles.socialIcon}
                    href="#"
                    data-platform="facebook"
                    data-message="Message about this post"
                >
                    <i className="icon-facebook-official" />
                </a>

                <Link
                  className={styles.socialIcon}
                  data-platform="mail"
                  href="/contact"
                >
                    <i className="icon-mail-alt" />
                </Link>
            </div>
        </div>
    </div>
    <div className={styles.footerBottom}>
        {Object.values(articles).map((article, idx) =>
                <div
                    className={cn(
                        styles.otherArticle,
                        isMenuVisible && styles.otherArticleNarrow
                    )}
                    style={{ backgroundImage: `url(${article.image})` }}
                    key={'article-' + idx}
                >
                    <div className={styles.overlay} />
                    <Link
                        href={article.uri}
                        title={article.title}
                        className={styles.otherArticleTitle}
                    >
                        {article.title}
                    </Link>
                </div>
            )}
    </div>
</footer>
}