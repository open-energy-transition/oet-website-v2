import { getLexicalFromMarkDown } from '@/utilities/convertToLexical'
import { CollectionBeforeChangeHook } from 'payload'

// const md='The new text editor to rule the handbook
// **dffrhbdfb**

// ***gulgu***

// *gukygulk*

// hujlhu

// *gkgkgjhk*'

export const loadLexical: CollectionBeforeChangeHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
  originalDoc, // original document
}) => {
  const t = await getLexicalFromMarkDown({
    markdownString:
      'The new text editor to rule the handbook\n\n> **dffrhbdfb**\n\n**gulgu**\n\n***gukygulk***\n\nhujlhu\n\n*gkgkgjhk*\n\n> blockquote\n\n[jgg](https://goole.com)\n\n![Curving abstract shapes with an orange and blue gradient](http://localhost:3000/api/media/file/image-post2.webp)\n\n~~sssss~~',
  })

  console.log('t', t.toJSON())

  console.log('data from hook', data)
  data.content = t.toJSON()
  return data // Return data to either create or update a document with
}
