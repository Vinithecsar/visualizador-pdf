interface BotaoProps {
  onClick?: (e: any) => void;
  children: React.ReactNode;
  className?: string;
}

export default function Button(props: BotaoProps) {
  return (
    <button
      className={`m-2 rounded-md border-none bg-[#2E8752] p-2 text-lg text-white transition-all duration-200 ease-in-out hover:scale-105 ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
