export default function Button(props) {
  return (
    <button
      className="px-3 py-2 bg-black/80 rounded-md text-white w-32 hover:bg-black transition"
      {...props}
    />
  );
}
