type Colors = [from: string, via: string, to: string];

export default function GradientCard({
  children,
  className,
  colors = ["from-indigo-800", "via-purple-900", "to-indigo-700"],
  hoverColors = ["from-indigo-600", "via-pink-400", "to-indigo-500"],
}: {
  children: React.ReactNode;
  className?: string;
  colors?: Colors;
  hoverColors?: Colors;
}) {
  const [from, via, to] = colors;

  return (
    <div
      className={`${className} group shadow hover:shadow-lg border border-gray-300 hover: cursor-pointer relative mx-auto w-full h-full overflow-hidden rounded-[10px] bg-gray-100 p-[1px] transition-all duration-[20000ms] ease-in-out bg-gradient-to-r ${from} ${via} ${to} hover:${from} hover:${via} hover:${to}`}
    >
      <div className="animate-[spin_20s_ease-in-out_infinite] duration-1000 absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent visible"></div>
      <div className="relative rounded-[9px] bg-white p-4">{children}</div>
    </div>
  );
}
