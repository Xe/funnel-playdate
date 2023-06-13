import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <div class="bg-gray-50">
        <div class="p-4 mx-auto max-w-screen-md">
          <Component />
        </div>
      </div>
    </>
  );
}