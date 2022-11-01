import Layout from "../../components/Layout";

interface UserProps {
    id: number;
    name: string;
    email: string;
    phone: string;
    website: string;
}

interface UserDetailProps {
    user: UserProps;
}

export default function UserDetail(props: UserDetailProps) {
    const { user } = props;

    return (
        <Layout pageTitle="User Detail">
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.website}</p>
        </Layout>
    )
}

export async function getStaticPaths() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();

    const paths = users.map((user: UserProps) => ({
        params: { id: user.id.toString() }
    }));

    return {
        paths,
        fallback: false
    }
}

interface GetStaticProps {
    params: {
        id: string;
    }
}

export async function getStaticProps(context: GetStaticProps) {
    const { id } = context.params;

    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const user = await res.json();

    return {
        props: {
            user
        }
    }
}
