import Layout from "../components/Layout";
import styles from "../styles/Blog.module.css";

interface Post {
    id: number;
    title: string;
    body: string;
}

interface BlogProps {
    blog: Post[];
}

export default function Blog(props: BlogProps) {
    const { blog } = props;

    return (
        <Layout pageTitle="Blog Page">
            {
                blog.map((blog) => (
                    <div key={blog.id} className={styles.card}>
                        <h3>{blog.title}</h3>
                        <p>{blog.body}</p>
                    </div>
                ))
            }
        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts');
    const blog = await res.json();

    return {
        props: {
            blog
        }
    }
}