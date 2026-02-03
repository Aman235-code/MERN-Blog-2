import React, { useRef } from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { input, setInput } = useAppContext();
  const inputRef = useRef(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value);
  };

  const onClear = () => {
    setInput("");
    inputRef.current.value = "";
  };

  return (
    <section className="relative mx-6 sm:mx-16 xl:mx-28">
      <div className="text-center pt-24 pb-14 relative z-10">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 
                        rounded-full border border-white/10 
                        bg-white/5 text-xs text-gray-300 backdrop-blur"
        >
          <span className="text-primary">New</span>
          <span>New posts added regularly</span>
          <img src={assets.star_icon} className="w-3 opacity-80" alt="" />
        </div>

        <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white">
          Thoughts worth sharing on <span className="text-primary">Postly</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-gray-400 text-sm sm:text-base leading-relaxed">
          A personal blog where I share thoughts, ideas, and things I am
          learning. Written slowly, published intentionally.
        </p>

        {/* Search */}
        <form
          onSubmit={onSubmitHandler}
          className="group mt-10 mx-auto max-w-xl flex items-center 
                     rounded-full border border-white/10 
                     bg-white/5 backdrop-blur overflow-hidden
                     focus-within:border-primary/60 transition"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search posts, topics, or ideas"
            className="flex-1 bg-transparent px-6 py-3 text-sm text-white 
                       placeholder-gray-400 outline-none"
          />

          <button
            type="submit"
            className="m-1.5 rounded-full bg-primary px-6 py-2.5 
                       text-sm text-white transition
                       hover:scale-105 active:scale-95"
          >
            Search
          </button>
        </form>

        {/* Clear */}
        {input && (
          <button
            onClick={onClear}
            className="mt-4 text-xs text-gray-400 hover:text-white transition"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Glow background */}
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-32 left-1/2 -translate-x-1/2 
                   w-225 opacity-40 blur-2xl pointer-events-none"
      />
    </section>
  );
};

export default Header;
