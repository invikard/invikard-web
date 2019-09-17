import Layout from '../components/MyLayout';
import Home from '../components/home/home'
import Link from 'next/link';

const PostLink = props => (
  <li>
    <Link href="/e/[id]" as={`/e/${props.id}`}>
      <a>{props.id}</a>
    </Link>
  </li>
);

export default function Blog() {
  return (
    <Home />
  );
}