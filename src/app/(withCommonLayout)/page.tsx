import { Button } from "@mui/material";
import Image from "next/image";

export default function HomePage() {
  return (
    <main>
      <h1>Home Page</h1>

      {/* <Image src={ass}></Image> */}

      <Button color="primary">Contained</Button>
      <Button color="secondary">Secondary</Button>
      <Button variant="outlined">Contained</Button>
    </main>
  );
}
