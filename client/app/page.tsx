import { redirect, RedirectType } from "next/navigation";

export default function Home() {
  return redirect("/status", RedirectType.replace); 
}
