import { client } from '../../../sanity/client';
import { PortableText } from "next-sanity";

export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "post"]{ slug }`);
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export default async function BlogPage({ params }) {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      ...,
      featuredImage{asset->{url}},
      sections[]{..., image{asset->{url}}}
    }`,
    { slug: params.slug }
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold">
        <PortableText value={} />
      </h1>
      <div className="text-lg text-gray-500 mb-4">
        <PortableText value={post.subtitle} />
      </div>
      {post.featuredImage && (
        <img
          src={post.featuredImage.asset.url}
          alt="Featured"
          className="rounded-lg mb-6"
        />
      )}

      {/* Sections */}
      {post.sections?.map((section, i) => (
        <div key={i} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            <PortableText value={section.title} />
          </h2>
          <div className="mb-2">
            <PortableText value={section.details} />
          </div>
          {section.image && (
            <img
              src={section.image.asset.url}
              alt={section.title}
              className="rounded"
            />
          )}
        </div>
      ))}

      {/* Quote */}
      {post.quote && (
        <blockquote className="italic border-l-4 pl-4 border-gray-400 text-gray-700 my-8">
          <PortableText value={post.quote} />
        </blockquote>
      )}

      {/* Tips */}
      {post.tips?.length > 0 && (
        <div className="bg-blue-50 p-4 mb-6 rounded text-[#242424]">
          <h3 className="font-semibold mb-2">Tips:</h3>
          <ul className="list-disc list-inside">
            {post.tips.map((tip, i) => (
              <li key={i}>
                <PortableText value={[{ _type: 'block', children: [{ _type: 'span', text: tip }] }]} />
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
                <PortableText value={[{ _type: 'block', children: [{ _type: 'span', text: note }] }]} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Conclusion */}
      {post.conclusion && (
        <div className="mt-6 border-t pt-4 text-gray-800">
          <h3 className="text-xl font-semibold mb-2">Conclusion</h3>
          <PortableText value={post.conclusion} />
        </div>
      )}

      {/* Disclaimer & Warning */}
      {post.disclaimer && (
        <div className="text-xs text-gray-500 mt-6 italic">
          <PortableText value={post.disclaimer} />
        </div>
      )}
      {post.warning && (
        <div className="text-xs text-red-500 italic mt-2">
          <PortableText value={post.warning} />
        </div>
      )}
    </div>
  );
}