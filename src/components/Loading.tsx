import Image from "next/image";

export default function Loading(props: { isLoading: boolean }) {
  const hidden = props.isLoading ? "" : "hidden";

  return (
    <div
      className={`fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center backdrop-blur-sm ${hidden}`}
    >
      <h1 className="font-extrabold text-black">Escaneando arquivo...</h1>
      <Image
        src={"/scanning-animation.gif"}
        height={75}
        width={75}
        alt="Scanning animation"
      />
    </div>
  );
}
