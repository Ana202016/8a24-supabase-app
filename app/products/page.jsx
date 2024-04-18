import PageClient from './page.client'

export const metadata = {
    title:`Products - ${process.env.APP_NAME}`,
    description: "The fastest way to build apps with Next.js and Supabase",
  };

export default function Page() {

    return <PageClient/>
}