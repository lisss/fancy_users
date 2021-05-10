import styles from './styles.less';

export const Section = ({ children }: { children: React.ReactNode }) => (
    <section className={styles.section}>{children}</section>
);
