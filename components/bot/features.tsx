"use client";
import { cn } from "@/utils/cn";
import React from "react";
import {
  IconBoxAlignRightFilled,
  IconChartArrows,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconSlash,
  IconSparkles,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { BentoGrid, BentoGridItem } from "@/components/landing/bento-gride";
import { Ban, BarChart4, Search } from "lucide-react";

export function BentoGridThirdDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl   dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-2  items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-white/30 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-md dark:bg-neutral-900" />
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-fit ml-auto bg-white dark:bg-black"
      >
        <div className="w-full h-4 bg-gray-100 rounded-md dark:bg-neutral-900 flex items-center p-2">
        <p className="text-[8px] font-mono">Sanction applied to anthonydiazjorges.</p>
        </div>
        <div className="h-6 w-6 rounded-full bg-green-500 flex-shrink-0" />
      </motion.div>
      <motion.div
        variants={variants}
        className="flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 bg-white dark:bg-black"
      >
        <div className="h-6 w-6 rounded-full bg-white/30 flex-shrink-0" />
        <div className="w-full bg-gray-100 h-4 rounded-md dark:bg-neutral-900" />
      </motion.div>
    </motion.div>
  );
};
const SkeletonTwo = () => {
  const variants = {
    initial: {
      width: 0,
    },
    animate: {
      width: "100%",
      transition: {
        duration: 0.2,
      },
    },
    hover: {
      width: ["0%", "100%"],
      transition: {
        duration: 2,
      },
    },
  };
  const arr = new Array(6).fill(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 relative" 
    >
      <motion.div
        initial={{rotate: 0}}
        whileHover={{rotate: 6}}
        className="flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-full ml-auto bg-white dark:bg-black flex relative" 
      >
        <div className="w-full h-36 bg-gray-100  rounded-lg dark:bg-neutral-900 flex items-center p-1 relative"> 
          <div className="h-6 w-6 rounded-full bg-green-500 flex-shrink-0 absolute top-0 right-0 mt-2 mr-2" id="avatar"/> 
          <div className="p-2 absolute top-0 left-0 flex-col text-left">
            <p className="text-md font-mono">Messi</p>
            <p className="text-xs font-mono mt-3">150 Epochs</p>
            <p className="text-xs font-mono">RVC V2</p>
            <p className="text-xs font-mono">3 Likes</p>
            <p className="text-xs font-mono">Uploaded at 1 hour ago</p>
            <p className="text-xs font-mono">Created by starboyz_z</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2 flex items-center justify-center hover:scale-90 gtransition"
    >
      <BarChart4 className="w-44 h-44 text-center text-white"/>
    </motion.div>
  );
};
const SkeletonFour = () => {
  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
    <motion.div
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
      style={{
        background:
        "radial-gradient(ellipse 100% 100% at 50% 100%, #00AA68, transparent)",
        backgroundSize: "400% 400%",
      }}
    >
      <motion.div initial={{opacity: 0}} whileHover={{opacity: 1}} transition={{duration: 1}} className="h-full w-full rounded-lg text-white z-50 text-8xl flex justify-center items-center"><IconSparkles className="h-44 w-44 text-white" /></motion.div>
    </motion.div>
    </motion.div>
  );
};
const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
      >
        <div
          className="rounded-full h-10 w-10 bg-white/30 flex-shrink-0"
        />
        <p className="text-xs text-neutral-500 bg-neutral-900 rounded-md">
          <span className="p-2">Translates &quot;hello&quot; into Chinese.</span>
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-lg border border-neutral-100 dark:border-white/[0.2] p-2 items-center space-x-2 w-full ml-auto bg-white dark:bg-black flex relative" 
      >
        <div className="w-full h-16 bg-gray-100  rounded-lg dark:bg-neutral-900 flex items-center p-1 relative"> 
          <div className="h-6 w-6 rounded-full bg-green-500 flex-shrink-0 absolute top-0 right-0 mt-2 mr-2" id="avatar"/> 
          <div className="p-2 absolute top-0 left-0 flex-col text-left">
            <p className="text-xs text-white">
                Translated to zh-cn:
                &quot;hello&quot;
            </p>
            <p className="mt-4 text-xs text-white">
                Translated message:
                <span className="font-bold ml-1">你好</span>
              </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
const items = [
  {
    title: "Moderation",
    description: (
      <span className="text-sm">
        We provide you with tools to moderate easily and quickly!
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <Ban className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Search engine",
    description: (
      <span className="text-sm">
        Let AI handle the proofreading of your documents.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <Search className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Statistics",
    description: (
      <span className="text-sm">
        Stay informed about the statistics of your server or users.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-1",
    icon: <IconChartArrows className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Artificial Inteligence",
    description: (
      <span className="text-sm">
        In the decade of artificial intelligence, our bot was not going to be left behind.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-2",
    icon: <IconSparkles className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "Utility",
    description: (
      <span className="text-sm">
        Because a bot must be useful, it uses commands such as translator, afk, eval or user info among others. 
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconSlash className="h-4 w-4 text-neutral-500" />,
  },
];
