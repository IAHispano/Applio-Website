function Button({ link, text }: { link: string, text: string }) {

  function handleClick() {
    window.open(link, '_blank');
  }

  return (
    <div>
      <button onClick={handleClick} className="hover:bg-black/10 dark:hover:bg-white/10 slow border-2 border-neutral-600 dark:border-white/10 dark:text-white text-slate-800 font-medium text-sm px-8 py-2 rounded-lg">
        {text}
      </button>
    </div>
  );
}

export default Button;
