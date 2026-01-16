// migrate-categories.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log("🔄 Starting migration...")

  // 1. Get all blogs using a raw query to access the hidden 'category' field
  // (Prisma hides fields not in schema, so we use findRaw)
  const allBlogs = await prisma.blog.findRaw({}) as unknown as any[]

  console.log(`Found ${allBlogs.length} blogs. Processing...`)

  for (const blog of allBlogs) {
    // Check if the old 'category' string exists and 'categories' is empty/missing
    const oldCategory = blog.category
    const newCategories = blog.categories

    if (oldCategory && (!newCategories || newCategories.length === 0)) {
      
      console.log(`🛠 Fixing blog: "${blog.title}" | Category: ${oldCategory}`)

      // Update the blog to put the string into the new array
      await prisma.blog.update({
        where: { id: blog._id.$oid }, // MongoDB raw ID format
        data: {
          categories: [oldCategory] // Wrap the string in an array
        }
      })
    }
  }

  console.log("✅ Migration complete! All blogs now have categories.")
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })