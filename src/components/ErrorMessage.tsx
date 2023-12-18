export default function ErrorComponent(props: { error: string }) {
  return (
    <div className="fixed top-1/4 m-auto flex h-[10%] w-[25%] flex-col items-center justify-center rounded-lg bg-red-500">
      <h1 className="m-auto font-extrabold text-white xl:text-lg">
        {props.error}
      </h1>
    </div>
  );
}
