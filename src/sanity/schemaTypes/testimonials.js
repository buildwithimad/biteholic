export default {
  name: "testimonial",
  type: "document",
  title: "Testimonial",
  fields: [
    {
      name: "name",
      title: "Reviewer Name",
      description: "e.g., 'Ahmed A.' or 'أحمد أ.'",
      type: "localeString",
      validation: Rule => Rule.required()
    },
    {
      name: "initials",
      title: "Reviewer Initials",
      description: "e.g., 'AA' or 'أ.أ'",
      type: "localeString",
      validation: Rule => Rule.required()
    },
    {
      name: "handle",
      title: "Social Handle",
      description: "e.g., '@ahmed_eats'",
      type: "string", // Social handles are usually universal, so no need for translation
    },
    {
      name: "rating",
      title: "Rating",
      type: "number",
      description: "Star rating from 1 to 5",
      validation: Rule => Rule.required().min(1).max(5).error("Rating must be between 1 and 5"),
      initialValue: 5
    },
    {
      name: "text",
      title: "Review Text",
      type: "localeText", // Using localeText for longer reviews
      validation: Rule => Rule.required()
    },
    {
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Use numbers (1, 2, 3) to sort the order they appear on the website."
    }
  ],
  preview: {
    select: {
      title: 'name.en', // Defaults preview title to English name
      subtitle: 'handle',
    }
  }
};