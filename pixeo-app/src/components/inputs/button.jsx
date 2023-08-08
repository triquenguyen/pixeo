export default function Button(props) {
  return (
    <button
      className="px-3 py-2 bg-black rounded-md text-white w-32 hover:bg-black/80 font-semibold active:scale-95 transition"
      {...props}
    />
  );
}
