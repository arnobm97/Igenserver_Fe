import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
// import TweetEmbed from 'react-tweet-embed';

export const portableTextComponents = {
    block: {
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 pl-4 italic text-gray-600 my-4">
                {children}
            </blockquote>
        ),
        h1: ({ children }) => (
            <h1 className="text-4xl font-bold my-4">{children}</h1>
        ),
        h2: ({ children }) => (
            <h2 className="text-2xl font-semibold my-3">{children}</h2>
        ),
        h3: ({ children }) => (
            <h3 className="text-xl font-semibold my-2">{children}</h3>
        ),
        normal: ({ children }) => (
            <p className="my-2">{children}</p>
        ),
    },
    types: {
        tip: ({ value }) => (
            <div className={`bg-[#2D2D2D] text-white p-6 rounded-lg shadow-2xl border border-gray-600 max-w-2xl mx-auto ${className}`}>
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                        <AlertTriangle className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-orange-500 font-semibold text-lg mb-3 flex items-center gap-2">
                            Tip
                        </h3>
                        <div className="text-gray-200 leading-relaxed space-y-2">
                            <p className="text-base text-orange-300 font-medium">
                                {value}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ),
        note: ({ value }) => (
            <div className={`bg-[#2D2D2D] text-white p-6 rounded-lg shadow-2xl border border-gray-600 max-w-2xl mx-auto ${className}`}>
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                        <AlertTriangle className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-orange-500 font-semibold text-lg mb-3 flex items-center gap-2">
                            Note
                        </h3>
                        <div className="text-gray-200 leading-relaxed space-y-2">
                            <p className="text-base text-orange-300 font-medium">
                                {value}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ),

        warning: ({ value }) => (
            <div className={`bg-[#2D2D2D] text-white p-6 rounded-lg shadow-2xl border border-gray-600 max-w-2xl mx-auto ${className}`}>
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                        <AlertTriangle className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-orange-500 font-semibold text-lg mb-3 flex items-center gap-2">
                            Note
                        </h3>
                        <div className="text-gray-200 leading-relaxed space-y-2">
                            <p className="text-base text-orange-300 font-medium">
                                {value}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ),
        // tweet: ({ value }) => (
        //     <div className="my-4">
        //         <TweetEmbed tweetId={value.tweetId} options={{ cards: 'hidden' }} />
        //     </div>
        // ),
        image: ({ value }) => (
            value?.asset?.url ? (
                <img
                    src={value.asset.url}
                    alt={value.alt || ''}
                    className="rounded my-4"
                />
            ) : null
        ),
    },
    list: {
        bullet: ({ children }) => (
            <ul className="list-disc list-inside my-2">{children}</ul>
        ),
        number: ({ children }) => (
            <ol className="list-decimal list-inside my-2">{children}</ol>
        ),
    },
    marks: {
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
        em: ({ children }) => <em className="italic">{children}</em>,
        link: ({ value, children }) => (
            <Link
                href={value?.href}
                className="text-cyan-400 underline bg-cyan-400/20 px-1 rounded"
                target="_blank"
                rel="noopener noreferrer"
            >
                {children}
            </Link>
        ),
    },
};