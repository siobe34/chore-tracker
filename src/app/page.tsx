import { SITE_NAV_LINKS } from '@/lib/constants/navigation-links';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect(SITE_NAV_LINKS.chores.path);
}
