import { Head } from "$fresh/runtime.ts";
import Header from "../components/Header.tsx";
import Multiview from "../islands/Multiview.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Kami</title>
      </Head>
      <Header active="/" />
      <div class="p-4 mx-auto max-w-screen-md">
        <Multiview />
      </div>
    </>
  );
}
