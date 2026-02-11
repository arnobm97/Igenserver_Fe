import { client } from "../../../sanity/client";
import { PortableText } from "next-sanity";
import { portableTextComponents } from "../../components/PortableTextComponent";
import Image from "next/image";

export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(`*[_type == "post"]{ slug }`);
    return slugs?.map((s) => ({ slug: s.slug.current })) || [];
  } catch (error) {
    console.error("Error fetching slugs:", error);
    return [];
  }
}

export default async function BlogPage({ params }) {
  // FIX 1: Await the params Promise (Next.js 15+)
  const { slug } = await params;
  
  if (!slug) {
    return <div>Invalid slug</div>;
  }

  try {
    // FIX 2: Pass the slug parameter correctly
    const post = await client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        ...,
        featuredImage{asset->{url, metadata{dimensions{width, height}}}},
        sections[]{..., image{asset->{url, metadata{dimensions{width, height}}}}}
      }`,
      { slug } // ✅ Now properly passing the parameter
    );

    // FIX 3: Handle case when post is not found
    if (!post) {
      return (
        <div className="max-w-2xl mx-auto px-4 py-10">
          <h1 className="text-2xl font-bold">Post not found</h1>
          <p>The blog post with slug "{slug}" does not exist.</p>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <PortableText
          value={[{ _type: "title", value: post.title }]}
          components={portableTextComponents}
        />

        <div className="text-lg text-gray-500 mb-4">
          <PortableText
            value={[{ _type: "subtitle", value: post.subtitle }]}
            components={portableTextComponents}
          />
        </div>
        
        {post.featuredImage && (
          <div className="relative w-full h-96 mb-6">
            <Image
              src={post.featuredImage.asset.url}
              alt="Featured"
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Sections */}
        {post.sections?.map((section, i) => (
          <div key={i} className="mb-6">
            <PortableText
              value={[
                {
                  _type: "block",
                  children: [{ _type: "normal", text: section.title }],
                },
              ]}
              components={portableTextComponents}
            />

            <div className="mb-2">
              <PortableText
                value={[
                  {
                    _type: "block",
                    children: [{ _type: "normal", text: section.details }],
                  },
                ]}
                components={portableTextComponents}
              />
            </div>
            {section.image && (
              <div className="relative w-full h-64 my-4">
                <Image
                  src={section.image.asset.url}
                  alt={section.title}
                  fill
                  className="rounded object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
          </div>
        ))}

        {/* Quote */}
        {post.quote && (
          <PortableText
            value={[{ _type: "quote", value: post.quote }]}
            components={portableTextComponents}
          />
        )}

        {/* Tips */}
        {post.tips?.length > 0 && (
          <div className="bg-blue-50 p-4 mb-6 rounded text-[#242424]">
            <h3 className="font-semibold mb-2">Tips:</h3>
            <ul className="list-disc list-inside">
              {post.tips.map((tip, i) => (
                <li key={i}>
                  <PortableText
                    value={[
                      {
                        _type: "block",
                        children: [{ _type: "span", text: tip }],
                      },
                    ]}
                    components={portableTextComponents}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {post.notes?.length > 0 && (
          <div className="bg-yellow-50 p-4 mb-6 rounded text-[#242424]">
            <h3 className="font-semibold mb-2">Notes:</h3>
            <ul className="list-disc list-inside">
              {post.notes.map((note, i) => (
                <li key={i}>
                  <PortableText
                    value={[
                      {
                        _type: "block",
                        children: [{ _type: "span", text: note }],
                      },
                    ]}
                    components={portableTextComponents}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Conclusion */}
        {post.conclusion && (
          <div className="mt-6 border-t pt-4 text-gray-800">
            <h3 className="text-xl font-semibold mb-2">Conclusion</h3>
            <PortableText
              value={post.conclusion}
              components={portableTextComponents}
            />
          </div>
        )}

        {/* Disclaimer & Warning */}
        {post.disclaimer && (
          <div className="text-xs text-gray-500 mt-6 italic">
            <PortableText
              value={[{ _type: "disclaimer", value: post.disclaimer }]}
              components={portableTextComponents}
            />
          </div>
        )}
        {post.warning && (
          <div className="text-xs text-red-500 italic mt-2">
            <p className="text-red-500">Warning</p>
            <PortableText
              value={[{ _type: "warning", value: post.warning }]}
              components={portableTextComponents}
            />
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-red-600">Error loading post</h1>
        <p>There was an error loading this blog post. Please try again later.</p>
      </div>
    );
  }
}