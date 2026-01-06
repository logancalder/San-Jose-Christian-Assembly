export interface BibleVerse {
    number: number
    text: string
  }
  
  export interface BibleChapter {
    number: number
    verses: BibleVerse[]
  }
  
  export interface BibleBook {
    id: string
    name: string
    testament: "old" | "new"
    chapters: BibleChapter[]
  }
  
  // This is a simplified sample of Bible data
  // In a real application, you would have a complete dataset or API
  export const bibleData: BibleBook[] = [
    {
      id: "genesis",
      name: "Genesis",
      testament: "old",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "In the beginning God created the heavens and the earth." },
            {
              number: 2,
              text: "The earth was without form, and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters.",
            },
            { number: 3, text: 'Then God said, "Let there be light"; and there was light.' },
            { number: 4, text: "And God saw the light, that it was good; and God divided the light from the darkness." },
            {
              number: 5,
              text: "God called the light Day, and the darkness He called Night. So the evening and the morning were the first day.",
            },
            {
              number: 6,
              text: 'Then God said, "Let there be a firmament in the midst of the waters, and let it divide the waters from the waters."',
            },
            {
              number: 7,
              text: "Thus God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament; and it was so.",
            },
            {
              number: 8,
              text: "And God called the firmament Heaven. So the evening and the morning were the second day.",
            },
            {
              number: 9,
              text: 'Then God said, "Let the waters under the heavens be gathered together into one place, and let the dry land appear"; and it was so.',
            },
            {
              number: 10,
              text: "And God called the dry land Earth, and the gathering together of the waters He called Seas. And God saw that it was good.",
            },
            // More verses would be included here
          ],
        },
        {
          number: 2,
          verses: [
            { number: 1, text: "Thus the heavens and the earth, and all the host of them, were finished." },
            {
              number: 2,
              text: "And on the seventh day God ended His work which He had done, and He rested on the seventh day from all His work which He had done.",
            },
            {
              number: 3,
              text: "Then God blessed the seventh day and sanctified it, because in it He rested from all His work which God had created and made.",
            },
            {
              number: 4,
              text: "This is the history of the heavens and the earth when they were created, in the day that the LORD God made the earth and the heavens,",
            },
            {
              number: 5,
              text: "before any plant of the field was in the earth and before any herb of the field had grown. For the LORD God had not caused it to rain on the earth, and there was no man to till the ground;",
            },
            // More verses would be included here
          ],
        },
        // More chapters would be included here
      ],
    },
    {
      id: "exodus",
      name: "Exodus",
      testament: "old",
      chapters: [
        {
          number: 1,
          verses: [
            {
              number: 1,
              text: "Now these are the names of the children of Israel who came to Egypt; each man and his household came with Jacob:",
            },
            { number: 2, text: "Reuben, Simeon, Levi, and Judah;" },
            { number: 3, text: "Issachar, Zebulun, and Benjamin;" },
            { number: 4, text: "Dan, Naphtali, Gad, and Asher." },
            {
              number: 5,
              text: "All those who were descendants of Jacob were seventy persons (for Joseph was in Egypt already).",
            },
            // More verses would be included here
          ],
        },
        // More chapters would be included here
      ],
    },
    // More Old Testament books would be included here
    {
      id: "matthew",
      name: "Matthew",
      testament: "new",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "The book of the genealogy of Jesus Christ, the Son of David, the Son of Abraham:" },
            { number: 2, text: "Abraham begot Isaac, Isaac begot Jacob, and Jacob begot Judah and his brothers." },
            { number: 3, text: "Judah begot Perez and Zerah by Tamar, Perez begot Hezron, and Hezron begot Ram." },
            { number: 4, text: "Ram begot Amminadab, Amminadab begot Nahshon, and Nahshon begot Salmon." },
            { number: 5, text: "Salmon begot Boaz by Rahab, Boaz begot Obed by Ruth, Obed begot Jesse," },
            {
              number: 6,
              text: "and Jesse begot David the king. David the king begot Solomon by her who had been the wife of Uriah.",
            },
            // More verses would be included here
          ],
        },
        // More chapters would be included here
      ],
    },
    {
      id: "mark",
      name: "Mark",
      testament: "new",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "The beginning of the gospel of Jesus Christ, the Son of God." },
            {
              number: 2,
              text: 'As it is written in the Prophets: "Behold, I send My messenger before Your face, Who will prepare Your way before You."',
            },
            {
              number: 3,
              text: "\"The voice of one crying in the wilderness: 'Prepare the way of the LORD; Make His paths straight.'\"",
            },
            {
              number: 4,
              text: "John came baptizing in the wilderness and preaching a baptism of repentance for the remission of sins.",
            },
            {
              number: 5,
              text: "Then all the land of Judea, and those from Jerusalem, went out to him and were all baptized by him in the Jordan River, confessing their sins.",
            },
            // More verses would be included here
          ],
        },
        // More chapters would be included here
      ],
    },
    {
      id: "luke",
      name: "Luke",
      testament: "new",
      chapters: [
        {
          number: 1,
          verses: [
            {
              number: 1,
              text: "Inasmuch as many have taken in hand to set in order a narrative of those things which have been fulfilled among us,",
            },
            {
              number: 2,
              text: "just as those who from the beginning were eyewitnesses and ministers of the word delivered them to us,",
            },
            {
              number: 3,
              text: "it seemed good to me also, having had perfect understanding of all things from the very first, to write to you an orderly account, most excellent Theophilus,",
            },
            { number: 4, text: "that you may know the certainty of those things in which you were instructed." },
            // More verses would be included here
          ],
        },
        // More chapters would be included here
      ],
    },
    {
      id: "john",
      name: "John",
      testament: "new",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "In the beginning was the Word, and the Word was with God, and the Word was God." },
            { number: 2, text: "He was in the beginning with God." },
            { number: 3, text: "All things were made through Him, and without Him nothing was made that was made." },
            { number: 4, text: "In Him was life, and the life was the light of men." },
            { number: 5, text: "And the light shines in the darkness, and the darkness did not comprehend it." },
            // More verses would be included here
          ],
        },
        // More chapters would be included here
      ],
    },
    {
      id: "acts",
      name: "Acts",
      testament: "new",
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: "The former account I made, O Theophilus, of all that Jesus began both to do and teach," },
            {
              number: 2,
              text: "until the day in which He was taken up, after He through the Holy Spirit had given commandments to the apostles whom He had chosen,",
            },
            {
              number: 3,
              text: "to whom He also presented Himself alive after His suffering by many infallible proofs, being seen by them during forty days and speaking of the things pertaining to the kingdom of God.",
            },
            // More verses would be included here
          ],
        },
        // More chapters would be included here
      ],
    },
    {
      id: "romans",
      name: "Romans",
      testament: "new",
      chapters: [
        {
          number: 1,
          verses: [
            {
              number: 1,
              text: "Paul, a bondservant of Jesus Christ, called to be an apostle, separated to the gospel of God",
            },
            { number: 2, text: "which He promised before through His prophets in the Holy Scriptures," },
            {
              number: 3,
              text: "concerning His Son Jesus Christ our Lord, who was born of the seed of David according to the flesh,",
            },
            {
              number: 4,
              text: "and declared to be the Son of God with power according to the Spirit of holiness, by the resurrection from the dead.",
            },
            {
              number: 5,
              text: "Through Him we have received grace and apostleship for obedience to the faith among all nations for His name,",
            },
            // More verses would be included here
          ],
        },
        // More chapters would be included here
      ],
    },
    // More New Testament books would be included here
  ]
  
  