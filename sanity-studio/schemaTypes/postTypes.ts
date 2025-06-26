import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'post',
    type: 'document',
    title: 'Blog Post',
    fields: [
        defineField({ name: 'title', type: 'string', title: 'Title', validation: rule => rule.required() }),
        defineField({ name: 'subtitle', type: 'string', title: 'Subtitle' }),
        defineField({
            name: 'slug',
            type: 'slug',
            title: 'Slug',
            options: { source: 'title', maxLength: 96 },
            validation: rule => rule.required(),
        }),
        defineField({ name: 'publishedDate', type: 'datetime', title: 'Published Date' }),
        defineField({
            name: 'featuredImage',
            type: 'image',
            title: 'Featured Image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'sections',
            title: 'Content Sections',
            type: 'array',
            of: [
                defineField({
                    name: 'section',
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', type: 'string', title: 'Section Title' }),
                        defineField({
                            name: 'details',
                            type: 'array',
                            title: 'Details',
                            of: [{ type: 'block' }],
                        }),
                        defineField({
                            name: 'image',
                            type: 'image',
                            title: 'Image',
                            options: { hotspot: true },
                        }),
                    ],
                }),
            ],
        }),
        defineField({ name: 'quote', type: 'text', title: 'Quote' }),
        defineField({ name: 'tweetContent', title: 'Tweet Content', type: 'text' }),
        defineField({
            name: 'tweetEmbeds',
            title: 'Tweet Embeds',
            type: 'array',
            of: [{ type: 'url' }],
        }),
        defineField({
            name: 'tips',
            title: 'Tips',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'notes',
            title: 'Notes',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'conclusion',
            title: 'Conclusion',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({ name: 'disclaimer', type: 'text', title: 'Disclaimer' }),
        defineField({ name: 'warning', type: 'text', title: 'Warning' }),
        defineField({
            name: 'layout',
            type: 'string',
            title: 'Layout',
            options: {
                list: [
                    { title: 'Standard', value: 'standard' },
                    { title: 'Sidebar', value: 'sidebar' },
                    { title: 'Full Width', value: 'fullWidth' },
                ],
                layout: 'radio',
            },
        }),
    ],
})