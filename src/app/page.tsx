import HeaderColumn from "./header";
import LinksColumn from "./links";

export default function Home() {
  return (
    <div className="flex justify-center m-20">
      <HeaderColumn></HeaderColumn>
      <LinksColumn></LinksColumn>
    </div>
  );
}
