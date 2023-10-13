export default function GradientCard({ children }) {
  return (
      <div className="group shadow hover:shadow-lg cursor-pointer relative mx-auto w-full h-full overflow-hidden rounded-[16px] bg-gray-300 p-[1px] transition-all duration-300 ease-in-out bg-gradient-to-r from-indigo-800 via-purple-900 to-indigo-700 hover:from-indigo-600 hover:via-pink-400 hover:to-indigo-500">
        <div className="animate-spin-slow invisible absolute -top-40 -bottom-40 left-10 right-10 bg-gradient-to-r from-transparent via-white/90 to-transparent visible"></div>
        <div className="relative rounded-[15px] bg-white p-4 group-hover:bg-slate-50">{children}</div>
      </div>
  );
}
