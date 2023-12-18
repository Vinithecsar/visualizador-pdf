export default function ErrorComponent(props: { error: string }) {
  return (
    <div className="fixed top-1/4 m-auto flex h-[6%] w-[15%] flex-col items-center justify-center rounded-lg bg-red-500">
      <h1 className="font-extrabold text-white">{props.error}</h1>
    </div>
  );
}
