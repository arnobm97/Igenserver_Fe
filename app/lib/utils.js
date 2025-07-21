import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import imageUrlBuilder from '@sanity/image-url'
import { client } from "../../sanity/client";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const builder = imageUrlBuilder(client)

export function urlForImage(source) {
  return builder.image(source)
};

export function toBlock(text) {
  return [{ _type: 'block', children: [{ _type: 'span', text }] }];
}
