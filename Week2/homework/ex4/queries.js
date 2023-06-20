module.exports = [
  {
    question:
      'All research papers and the number of authors that wrote that paper.',
    query: `SELECT rp.paper_title, COUNT(rp.author_id) AS num_authors
    FROM research_papers rp
    GROUP BY rp.paper_id, rp.paper_title;`,
  },
  {
    question: 'Sum of the research papers published by all female authors.',
    query: `SELECT COUNT(*) AS total_papers_by_female_authors
    FROM research_papers rp
    JOIN authors a ON rp.author_id = a.author_id
    WHERE a.gender = 'female'; `,
  },
  {
    question: 'Average of the h-index of all authors per university.',
    query: `SELECT university, AVG(h_index) AS average_h_index
    FROM authors
    GROUP BY university;`,
  },
  {
    question: 'Sum of the research papers of the authors per university',
    query: `SELECT authors.university, COUNT(*) AS paper_count
FROM authors
JOIN research_papers ON authors.author_id = research_papers.author_id
GROUP BY authors.university;`,
  },
  {
    question:
      'Minimum and maximum of the h-index of all authors per university',
    query: `SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
    FROM authors
    GROUP BY university;
    `,
  },
];
